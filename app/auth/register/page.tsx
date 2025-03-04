"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import { account, databases, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Ensure this uses next/navigation

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Create a new account
      const response = await account.create(ID.unique(), email, password, name);

      // Create an email session for the new account
      await account.createEmailSession(email, password);

      // Ensure the session is established by fetching the current account
      const currentUser = await account.get();

      // Create user profile in the database
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        currentUser.$id,
        {
          name,
          email,
          cycleLength: 28,
          preferences: {},
        }
      );

      // Redirect to the dashboard upon successful registration
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Join MyFlowMate to start tracking your health</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <motion.div whileFocus={{ scale: 1.05 }}>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.div whileFocus={{ scale: 1.05 }}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.div whileFocus={{ scale: 1.05 }}>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </motion.div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                as={motion.button}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                ) : (
                  "Create Account"
                )}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
