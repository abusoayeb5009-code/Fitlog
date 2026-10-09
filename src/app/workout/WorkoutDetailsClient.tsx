
"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types";

interface WorkoutDetailsClientProps {
  workout: Workout;
}

export default function WorkoutDetailsClient({
  workout,
}: WorkoutDetailsClientProps) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const alreadyAdded = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  const isFull = plan.length >= 5;

  return (
    <main className="min-h-screen bg-[#0b0d0d] text-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Link
          href="/#library"
          className="mb-8 inline-block text-sm text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to Workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Workout Image */}
          <div className="h-fit overflow-hidden rounded-2xl border border-[#292d2d] bg-[#111313]">
            {workout.image ? (
              <img
                src={workout.image}
                alt={workout.name}
                className="max-h-[650px] min-h-72 w-full object-cover"
              />
            ) : (
              <div className="flex min-h-72 items-center justify-center text-gray-500">
                No image available
              </div>
            )}
          </div>

          {/* Workout Information */}
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
              WORKOUT DETAILS
            </p>

            <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {(workout.muscleGroups ?? []).map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Workout Stats */}
            <div className="mt-8 space-y-4 border-y border-[#292d2d] py-5">
              <Detail label="Equipment" value={workout.equipment} />
              <Detail label="Difficulty" value={workout.difficulty} />
              <Detail label="Sets" value={String(workout.sets)} />
              <Detail label="Reps" value={workout.reps} />
              <Detail
                label="Duration"
                value={`${workout.duration} min`}
              />
              <Detail
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />
              <Detail
                label="Rating"
                value={`★ ${workout.rating}`}
              />
            </div>

            {/* Instructions */}
            <h2 className="mt-8 text-xl font-black">
              INSTRUCTIONS
            </h2>

            <ol className="mt-4 space-y-4 text-gray-400">
              {(workout.instructions ?? []).map(
                (instruction, index) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="flex gap-3"
                  >
                    <span className="font-bold text-[#ccff00]">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                )
              )}
            </ol>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={alreadyAdded || isFull}
                className="rounded-lg bg-[#ccff00] px-5 py-4 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {alreadyAdded
                  ? "ALREADY IN PLAN"
                  : isFull
                    ? "PLAN FULL (5/5)"
                    : "ADD TO TODAY'S PLAN"}
              </button>

              <button
                type="button"
                onClick={() => addToSaved(workout)}
                disabled={alreadySaved}
                className="rounded-lg border border-gray-600 px-5 py-4 font-black transition hover:border-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {alreadySaved
                  ? "ALREADY SAVED"
                  : "SAVE FOR LATER"}
              </button>
            </div>

            <Link
              href="/my-plan"
              className="mt-5 inline-block text-sm text-gray-400 underline transition hover:text-[#ccff00]"
            >
              View My Plan →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <b className="text-right text-white">
        {value || "N/A"}
      </b>
    </div>
  );
}