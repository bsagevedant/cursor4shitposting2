import { Suspense } from 'react';
import { GeneratorForm } from "@/components/dashboard/generator-form"

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GeneratePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Generate Content</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <GeneratorForm />
      </Suspense>
    </div>
  )
} 