"use client";

import { useState } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const symptoms = [
  "Cramps",
  "Headache",
  "Bloating",
  "Fatigue",
  "Mood Swings",
  "Back Pain",
];

const moods = [
  "Happy",
  "Calm",
  "Irritable",
  "Anxious",
  "Sad",
  "Energetic",
];

export default function CycleTrackingPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [flow, setFlow] = useState<string>("light");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CYCLE_LOGS,
        ID.unique(),
        {
          date: date.toISOString(),
          flow,
          symptoms: selectedSymptoms,
          notes,
        }
      );

      if (mood) {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.MOODS,
          ID.unique(),
          {
            date: date.toISOString(),
            mood,
            notes,
          }
        );
      }

      // Reset form
      setFlow("light");
      setSelectedSymptoms([]);
      setMood("");
      setNotes("");
    } catch (error) {
      console.error("Error saving cycle data:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cycle Tracking</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Flow</label>
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
                <label className="text-sm font-medium">Mood</label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="How are you feeling?" />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((m) => (
                      <SelectItem key={m} value={m.toLowerCase()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <Button
                      key={symptom}
                      type="button"
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedSymptoms(
                          selectedSymptoms.includes(symptom)
                            ? selectedSymptoms.filter((s) => s !== symptom)
                            : [...selectedSymptoms, symptom]
                        );
                      }}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes..."
                />
              </div>
              <Button type="submit" className="w-full">
                Save Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}