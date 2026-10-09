
import { getWorkoutById } from "@/utils/api";
import WorkoutDetailsClient from "../WorkoutDetailsClient";
import type { Workout } from "@/types";

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let workout: Workout;

  try {
    workout = await getWorkoutById(id);
  } catch (error) {
    console.error("WORKOUT DETAILS ERROR:", error);

    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <h1 className="text-2xl font-bold text-red-500">
          Workout Loading Failed
        </h1>
        <p className="mt-4">
          {error instanceof Error
            ? error.message
            : "Unknown error"}
        </p>
      </main>
    );
  }

  return <WorkoutDetailsClient workout={workout} />;
}