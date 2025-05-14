import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-stone-900 to-stone-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Generate Peak Indian Tech Twitter Content
          </h1>
          <p className="text-xl text-stone-300 mb-8">
            Create viral tech posts with the perfect mix of buzzwords, hot takes, and brainrot. 
            Built for the Indian tech Twitter ecosystem.
          </p>
          <Button asChild size="lg" className="bg-stone-100 text-stone-900 hover:bg-stone-200">
            <Link href="/dashboard">Start Generating</Link>
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <Card>
              <CardHeader>
                <CardTitle>Free Tier</CardTitle>
                <CardDescription>Perfect for casual shitposting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">₹0/month</div>
                <ul className="space-y-3">
                  <li>• 3 generations per day</li>
                  <li>• Basic tones</li>
                  <li>• Standard support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Tier */}
            <Card className="border-2 border-stone-900">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For professional brainrot creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">₹299/month</div>
                <ul className="space-y-3">
                  <li>• Unlimited generations</li>
                  <li>• All tones & features</li>
                  <li>• Priority support</li>
                  <li>• Early access to new features</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-stone-900 hover:bg-stone-800">
                  <Link href="/dashboard">Upgrade Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Toxicity Control</CardTitle>
                <CardDescription>Fine-tune your post's spiciness</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tone Selection</CardTitle>
                <CardDescription>From VC Bro to Coding Guru</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Topic Focus</CardTitle>
                <CardDescription>AI, Web Dev, Startups & more</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
