import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login - BharatBrainrot',
  description: 'Login to your BharatBrainrot account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-stone-600">Login to continue generating peak content</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 