'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { chatWithGemini } from '../lib/gemini';
import { Package, Loader2 } from 'lucide-react';

export default function ProductRecommender() {
  const [answers, setAnswers] = useState({
    flow: '',
    activity: '',
    comfort: '',
    environmental: '',
  });
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Based on the following preferences, recommend the most suitable menstrual product (pad, tampon, or menstrual cup):
    Flow: ${answers.flow}
    Activity Level: ${answers.activity}
    Comfort Priority: ${answers.comfort}
    Environmental Concern: ${answers.environmental}
    
    Please provide a detailed explanation of why this product would be the best choice.`;

    try {
      const response = await chatWithGemini(prompt);
      setRecommendation(response);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setRecommendation('Sorry, I encountered an error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-6 w-6 text-pink-500" />
        <h2 className="text-2xl font-semibold">Product Recommender</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">What is your typical flow?</h3>
          <RadioGroup
            value={answers.flow}
            onValueChange={(value) => setAnswers({ ...answers, flow: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="flow-light" />
              <Label htmlFor="flow-light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="flow-medium" />
              <Label htmlFor="flow-medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="heavy" id="flow-heavy" />
              <Label htmlFor="flow-heavy">Heavy</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">How active are you during your period?</h3>
          <RadioGroup
            value={answers.activity}
            onValueChange={(value) => setAnswers({ ...answers, activity: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="activity-low" />
              <Label htmlFor="activity-low">Low Activity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="activity-moderate" />
              <Label htmlFor="activity-moderate">Moderate Activity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="activity-high" />
              <Label htmlFor="activity-high">High Activity</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendation...
            </>
          ) : (
            'Get Product Recommendation'
          )}
        </Button>
      </form>

      {recommendation && (
        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-medium mb-4">Your Personalized Recommendation:</h3>
          <p className="whitespace-pre-wrap">{recommendation}</p>
        </div>
      )}
    </div>
  );
}