export type UserProfile = {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  dailyQuota: number;
  usedToday: number;
  preferences: {
    defaultTone: string;
    defaultToxicity: number;
    defaultTopics: string[];
  }
}

export type Generation = {
  id: string;
  userId: string;
  content: string;
  settings: {
    toxicity: number;
    tone: string;
    topics: string[];
    buzzwordDensity: number;
  }
  createdAt: Date;
}

export type Subscription = {
  id: string;
  userId: string;
  razorpayId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: Date;
  plan: 'free' | 'premium';
  createdAt: Date;
} 