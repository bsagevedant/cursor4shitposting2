'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Subscription } from '@/lib/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionManagerProps {
  currentPlan: 'free' | 'premium';
  subscription: Subscription | null;
}

export function SubscriptionManager({
  currentPlan,
  subscription,
}: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Create order
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Initialize Razorpay
      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.id,
        name: 'BharatBrainrot',
        description: 'Premium Subscription',
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch('/api/payments/verify-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          toast.success('Successfully subscribed to Premium!');
          window.location.reload();
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#1c1917',
        },
      });

      razorpay.open();
    } catch (error) {
      toast.error('Failed to process subscription');
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payments/cancel-subscription', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      toast.success('Subscription cancelled successfully');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to cancel subscription');
      console.error('Cancellation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPlan === 'premium' && subscription) {
    return (
      <div>
        <p className="mb-4">
          You are currently on the Premium plan. Your subscription will renew on{' '}
          {new Date(subscription.currentPeriodEnd).toLocaleDateString()}.
        </p>
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Cancel Subscription'}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4">
        Upgrade to Premium for unlimited generations and access to all features.
      </p>
      <Button
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Upgrade to Premium - ₹299/month'}
      </Button>
    </div>
  );
} 