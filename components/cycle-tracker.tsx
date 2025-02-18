'use client';

import { useState, useEffect } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { databases, DB_ID, COLLECTIONS } from '../lib/appwrite';
import { ID } from 'appwrite';

interface CycleTrackerProps {
  userId: string;
}

export default function CycleTracker({ userId }: CycleTrackerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [flow, setFlow] = useState('medium');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setLoading(true);
    try {
      await databases.createDocument(
        DB_ID,
        COLLECTIONS.CYCLES,
        ID.unique(),
        {
          user_id: userId,
          date: date.toISOString(),
          flow,
          symptoms,
        }
      );
      
      setSymptoms('');
      setFlow('medium');
    } catch (error) {
      console.error('Error saving cycle data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Track Your Cycle</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Flow Intensity</label>
          <Select value={flow} onValueChange={setFlow}>
            <SelectTrigger>
              <SelectValue placeholder="Select flow intensity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="heavy">Heavy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Symptoms</label>
          <Input
            placeholder="Enter any symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </Button>
      </form>
    </div>
  );
}