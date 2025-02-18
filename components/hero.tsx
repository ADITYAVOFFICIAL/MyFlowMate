'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Hero() {
  const router = useRouter();

  return (
    <div className="py-20 text-center">
      <div className="flex justify-center mb-8">
        <Heart className="h-16 w-16 text-pink-500" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to <span className="text-pink-500">MyFlowMate</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your personal menstrual care companion. Track your cycle, understand your body, and take control of your health.
      </p>
      <div className="flex gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => router.push('/signup')}
          className="bg-pink-500 hover:bg-pink-600"
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push('/learn')}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}