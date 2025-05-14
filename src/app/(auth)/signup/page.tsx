import { Metadata } from 'next';
import { SignUpForm } from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Sign Up - BharatBrainrot',
  description: 'Create your BharatBrainrot account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-stone-600">Sign up to start generating peak content</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
} 