import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = await request.json();

    // Verify signature
    const body = razorpay_payment_id + '|' + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Update subscription in database
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .upsert({
        userId: session.user.id,
        razorpayId: razorpay_subscription_id,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        plan: 'premium',
      });

    if (subscriptionError) throw subscriptionError;

    // Update user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        plan: 'premium',
        dailyQuota: 999999, // Unlimited for premium users
      })
      .eq('id', session.user.id);

    if (profileError) throw profileError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verify subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to verify subscription' },
      { status: 500 }
    );
  }
} 