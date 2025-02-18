'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function CTA() {
  const router = useRouter();

  return (
    <div className="py-20 bg-pink-50 dark:bg-pink-950/20 rounded-3xl my-20 text-center">
      <div className="container mx-auto px-4">
        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already tracking their cycles and improving their health with MyFlowMate.
        </p>
        <Button
          size="lg"
          onClick={() => router.push('/signup')}
          className="bg-pink-500 hover:bg-pink-600"
        >
          Start Your Journey Today
        </Button>
      </div>
    </div>
  );
}