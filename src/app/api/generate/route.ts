import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    // Get user session
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check user's quota
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('plan, dailyQuota, usedToday')
      .eq('id', session.user.id)
      .single();

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    if (userProfile.usedToday >= userProfile.dailyQuota) {
      return NextResponse.json(
        { error: 'Daily quota exceeded' },
        { status: 429 }
      );
    }

    // Get generation parameters
    const { toxicity, tone, topic, buzzwordDensity } = await request.json();

    // Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a satirical tech Twitter post with the following parameters:
    - Toxicity Level (0-4): ${toxicity}
    - Tone: ${tone}
    - Topic: ${topic}
    - Buzzword Density (0-1): ${buzzwordDensity}

    The post should be written in the style of Indian Tech Twitter, incorporating relevant buzzwords, trends, and cultural references.
    Keep it under 280 characters.
    Make it sound authentic to the specified tone.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Store generation in history
    await supabase.from('generations').insert({
      userId: session.user.id,
      content,
      settings: {
        toxicity,
        tone,
        topic,
        buzzwordDensity,
      },
    });

    // Update user's daily usage
    await supabase
      .from('user_profiles')
      .update({ usedToday: userProfile.usedToday + 1 })
      .eq('id', session.user.id);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 