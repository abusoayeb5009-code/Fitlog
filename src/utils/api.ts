
import type { Workout } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// Get all workouts
export async function getAllWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch workouts: ${response.status}`
    );
  }

  const result: unknown = await response.json();

  let workouts: unknown;

  if (Array.isArray(result)) {
    workouts = result;
  } else if (
    result !== null &&
    typeof result === "object" &&
    "data" in result
  ) {
    workouts = result.data;
  }

  if (!Array.isArray(workouts)) {
    throw new Error("API did not return a workout array");
  }

  return workouts as Workout[];
}

// Get one workout by ID
export async function getWorkoutById(
  id: string
): Promise<Workout> {
  const workouts = await getAllWorkouts();

  console.log("Requested workout ID:", id);
  console.log(
    "Available workout IDs:",
    workouts.map((item) => item.id)
  );

  const workout = workouts.find(
    (item) => String(item.id) === String(id)
  );

  if (!workout) {
    throw new Error(
      `Workout with ID ${id} was not found`
    );
  }

  return workout;
}