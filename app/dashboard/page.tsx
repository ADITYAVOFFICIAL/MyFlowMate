'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../lib/auth';
import CycleTracker from '../../components/cycle-tracker';
import AIAssistant from '../../components/ai-assistant';
import ProductRecommender from '../../components/product-recommender';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
    };
    checkAuth();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user.name}!
      </h1>
      
      <Tabs defaultValue="cycle" className="space-y-8">
        <TabsList className="grid grid-cols-3 max-w-[600px]">
          <TabsTrigger value="cycle">Cycle Tracking</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="cycle" className="space-y-4">
          <CycleTracker userId={user.$id} />
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ProductRecommender />
        </TabsContent>
      </Tabs>
    </div>
  );
}