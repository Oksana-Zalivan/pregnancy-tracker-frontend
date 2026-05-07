"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "@/components/shared/Loader/Loader"; 

export default function JourneyBasePage() {
  const router = useRouter();
  
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (isAuthLoading) return;

    const dueDate = (user as { dueDate?: string })?.dueDate || "2026-10-30";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [year, month, day] = dueDate.split("-").map(Number);
    const deliveryDate = new Date(year, month - 1, day);
    deliveryDate.setHours(0, 0, 0, 0);

    const diffMs = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.floor(diffDays / 7);
    
    const currentWeek = Math.min(Math.max(40 - weeksLeft, 1), 40);

    router.replace(`/journey/${currentWeek}`);
    
  }, [user, isAuthLoading, router]);

  return <Loader />;
}