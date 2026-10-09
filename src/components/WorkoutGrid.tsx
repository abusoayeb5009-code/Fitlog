
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "@/types";

interface WorkoutGridProps {
  workouts: Workout[];
}

export default function WorkoutGrid({
  workouts,
}: WorkoutGridProps) {
  if (workouts.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400">
        No workouts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}