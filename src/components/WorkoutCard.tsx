
import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#252828] bg-[#101212] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#191c1c]">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image available
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {(workout.muscleGroups ?? []).map((muscle, index) => (
            <span
              key={`${muscle}-${index}`}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-black uppercase text-white transition group-hover:text-[#ccff00]">
          {workout.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {workout.equipment || "Equipment not specified"}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-gray-400">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>
            ☆ {typeof workout.rating === "number"
              ? workout.rating.toFixed(1)
              : "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}