"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { databases, DATABASE_ID, COLLECTIONS, checkAuth } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";

interface CycleData {
  date: string;
  flow: number;
}

export default function DashboardPage() {
  const [cycleData, setCycleData] = useState<CycleData[]>([]);
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const session = await checkAuth();
      if (!session) {
        router.push('/auth/login');
        return;
      }

      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.CYCLE_LOGS,
          [
            Query.orderDesc("date"),
            Query.limit(30)
          ]
        );
        
        const formattedData: CycleData[] = response.documents.map((log: any) => ({
          date: format(new Date(log.date), "MMM dd"),
          flow: log.flow === "heavy" ? 3 : log.flow === "medium" ? 2 : 1
        })).reverse();

        setCycleData(formattedData);

        // Calculate next period
        if (response.documents.length > 0) {
          const lastPeriod = new Date(response.documents[0].date);
          const nextDate = format(subDays(lastPeriod, -28), "MMMM dd, yyyy");
          setNextPeriod(nextDate);
        }
      } catch (error) {
        console.error("Error fetching cycle data:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Next Period</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{nextPeriod || "Not enough data"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cycle Length</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">28 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">5 days</p>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Flow Intensity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="flow"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}