"use client";

import { CalendarDays, MessageCircle, LineChart, User, Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LineChart },
  { name: 'Cycle Tracking', href: '/dashboard/cycle', icon: CalendarDays },
  { name: 'Community', href: '/dashboard/community', icon: MessageCircle },
  { name: 'AI Assistant', href: '/dashboard/assistant', icon: Brain },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}