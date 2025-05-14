import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Card } from '@/components/ui/card';
import { SubscriptionManager } from '@/components/dashboard/subscription-manager';
import { PreferencesForm } from '@/components/dashboard/preferences-form';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Settings - BharatBrainrot',
  description: 'Manage your account settings and preferences',
};

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('userId', session.user.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-stone-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p>
              <span className="text-stone-600">Email:</span>{' '}
              {session.user.email}
            </p>
            <p>
              <span className="text-stone-600">Plan:</span>{' '}
              {profile?.plan === 'premium' ? 'Premium' : 'Free'}
            </p>
            <p>
              <span className="text-stone-600">Daily Generations:</span>{' '}
              {profile?.usedToday} / {profile?.dailyQuota}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <SubscriptionManager
            currentPlan={profile?.plan}
            subscription={subscription}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Default Preferences</h2>
          <PreferencesForm
            initialPreferences={profile?.preferences}
            userId={session.user.id}
          />
        </Card>
      </div>
    </div>
  );
} 