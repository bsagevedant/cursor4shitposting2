import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'History - BharatBrainrot',
  description: 'View your generated content history',
};

export default async function HistoryPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: generations } = await supabase
    .from('generations')
    .select('*')
    .order('createdAt', { ascending: false });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generation History</h1>
        <p className="text-stone-600">
          View all your previously generated content
        </p>
      </div>

      <div className="space-y-4">
        {generations?.map((generation) => (
          <Card key={generation.id} className="p-6">
            <p className="text-lg mb-4">{generation.content}</p>
            <div className="flex justify-between items-center text-sm text-stone-500">
              <div className="flex space-x-4">
                <span>Tone: {generation.settings.tone}</span>
                <span>Topic: {generation.settings.topic}</span>
                <span>Toxicity: {generation.settings.toxicity}</span>
              </div>
              <time>
                {formatDistanceToNow(new Date(generation.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
          </Card>
        ))}

        {generations?.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            No generations yet. Start creating some content!
          </div>
        )}
      </div>
    </div>
  );
} 