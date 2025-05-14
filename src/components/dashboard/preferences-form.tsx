'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { UserProfile } from '@/lib/types';

interface PreferencesFormProps {
  initialPreferences: UserProfile['preferences'];
  userId: string;
}

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

export function PreferencesForm({
  initialPreferences,
  userId,
}: PreferencesFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
        }),
      });

      if (!response.ok) throw new Error('Failed to update preferences');

      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Default Toxicity Level</h3>
        <Slider
          value={[preferences.defaultToxicity]}
          onValueChange={(value) =>
            setPreferences({ ...preferences, defaultToxicity: value[0] })
          }
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
        <h3 className="font-medium">Default Tone</h3>
        <Select
          value={preferences.defaultTone}
          onValueChange={(value) =>
            setPreferences({ ...preferences, defaultTone: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TONES.map((tone) => (
              <SelectItem key={tone.value} value={tone.value}>
                {tone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Default Topics</h3>
        <div className="grid grid-cols-2 gap-2">
          {TOPICS.map((topic) => (
            <Button
              key={topic.value}
              variant={
                preferences.defaultTopics.includes(topic.value)
                  ? 'default'
                  : 'outline'
              }
              onClick={() => {
                const newTopics = preferences.defaultTopics.includes(topic.value)
                  ? preferences.defaultTopics.filter((t) => t !== topic.value)
                  : [...preferences.defaultTopics, topic.value];
                setPreferences({ ...preferences, defaultTopics: newTopics });
              }}
            >
              {topic.label}
            </Button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Preferences'}
      </Button>
    </div>
  );
} 