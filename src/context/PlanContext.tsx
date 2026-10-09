
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import type { Workout, PlanWorkout } from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
  isHydrated: boolean;
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
const [saved, setSaved] = useState<Workout[]>([]);
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  try {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      const parsed = JSON.parse(storedPlan);

      if (Array.isArray(parsed)) {
        setPlan (parsed.slice(0, 5));
      }
    }

    if (storedSaved) {
      const parsed = JSON.parse(storedSaved);

      if (Array.isArray(parsed)) {
        setSaved(parsed);
      }
    }
  } catch (error) {
    console.error("Failed to load FitLog data:", error);
  } finally {
    setIsHydrated(true);
  }
}, []);

  // Save changes only after the initial load finishes.
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    } catch (error) {
      console.error("Failed to save plan:", error);
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    } catch (error) {
      console.error("Failed to save workouts:", error);
    }
  }, [saved, isHydrated]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast("This workout is already in your plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Your plan is full. Maximum 5 workouts.");
      return;
    }

    setPlan((current) => [
      ...current,
      { ...workout, isDone: false },
    ]);

    toast.success("Workout added to today's plan!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Workout removed from your plan.");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast("This workout is already saved.");
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success("Workout saved for later!");
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.success("Saved workout removed.");
  };

  const markAsDone = (id: number) => {
    const workout = plan.find((item) => item.id === id);

    if (!workout) return;

    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );

    toast.success(
      workout.isDone ? "Workout marked as not done." : "Workout completed!"
    );
  };

  const metrics = {
    exercises: plan.length,
    minutes: plan.reduce(
      (total, workout) => total + Number(workout.duration || 0),
      0
    ),
    calories: plan.reduce(
      (total, workout) => total + Number(workout.caloriesBurned || 0),
      0
    ),
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        metrics,
        isHydrated,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
