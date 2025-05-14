import { Metadata } from 'next';
import { GeneratorForm } from '@/components/dashboard/generator-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Dashboard - BharatBrainrot',
  description: 'Generate your next viral tech tweet',
};

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generate Content</h1>
        <p className="text-stone-600">
          Adjust the settings below to generate your next viral tech tweet
        </p>
      </div>
      <GeneratorForm />
    </div>
  );
} 