'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const TONES = [
  { value: 'vc-bro', label: 'VC Bro' },
  { value: 'coding-guru', label: 'Coding Guru' },
  { value: 'influencer', label: 'Wannabe Influencer' },
  { value: 'founder', label: 'Startup Founder' },
];

const TOPICS = [
  { value: 'ai', label: 'AI/ML' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'startup', label: 'Startups' },
  { value: 'crypto', label: 'Crypto' },
];

export function GeneratorForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [toxicity, setToxicity] = useState([2]); // 0-4 scale
  const [tone, setTone] = useState('vc-bro');
  const [topic, setTopic] = useState('ai');
  const [buzzwordDensity, setBuzzwordDensity] = useState([0.5]); // 0-1 scale
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toxicity: toxicity[0],
          tone,
          topic,
          buzzwordDensity: buzzwordDensity[0],
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setGeneratedContent(data.content);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium">Toxicity Level</h3>
            <Slider
              value={toxicity}
              onValueChange={setToxicity}
              max={4}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-stone-600">
              <span>Mild</span>
              <span>Nuclear</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Tone</h3>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Topic</h3>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Buzzword Density</h3>
            <Slider
              value={buzzwordDensity}
              onValueChange={setBuzzwordDensity}
              max={1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-stone-600">
              <span>Conservative</span>
              <span>Maximum Cringe</span>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Tweet'}
          </Button>
        </div>
      </Card>

      {generatedContent && (
        <Card className="p-6">
          <h3 className="font-medium mb-4">Generated Content</h3>
          <p className="text-lg">{generatedContent}</p>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(generatedContent);
                toast.success('Copied to clipboard!');
              }}
            >
              Copy to Clipboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
} 