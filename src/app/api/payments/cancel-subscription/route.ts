import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
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

    // Get user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('razorpayId')
      .eq('userId', session.user.id)
      .single();

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Cancel subscription in Razorpay
    await razorpay.subscriptions.cancel(subscription.razorpayId);

    // Update subscription status in database
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
      })
      .eq('userId', session.user.id);

    if (subscriptionError) throw subscriptionError;

    // Update user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        plan: 'free',
        dailyQuota: 3,
      })
      .eq('id', session.user.id);

    if (profileError) throw profileError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
} 