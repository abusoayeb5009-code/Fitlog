"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  usePlan,
} from "@/context/PlanContext";

export default function MyPlanPage() {

  const {
    plan,
    saved,
    metrics,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [tab, setTab] =
    useState<"plan" | "saved">(
      "plan"
    );

  const [sortBy, setSortBy] =
    useState<
      "duration" |
      "calories" |
      "rating"
    >("duration");

  const list =
    tab === "plan"
      ? plan
      : saved;

  const sortedList =
    useMemo(() => {

      return [...list].sort(
        (a, b) => {

          if (
            sortBy === "duration"
          ) {
            return (
              a.duration -
              b.duration
            );
          }

          if (
            sortBy === "calories"
          ) {
            return (
              b.caloriesBurned -
              a.caloriesBurned
            );
          }

          return (
            b.rating -
            a.rating
          );
        }
      );

    }, [list, sortBy]);

  return (
    <div className="container-fit py-12">

      <h1 className="display-font text-6xl">
        MY PLAN
      </h1>

      {/* Metrics */}

      <div className="mt-10 grid grid-cols-3 border border-[#292d2d]">

        <Metric
          title="Exercises"
          value={metrics.exercises}
        />

        <Metric
          title="Minutes"
          value={metrics.minutes}
        />

        <Metric
          title="Calories"
          value={metrics.calories}
        />

      </div>

      {/* Tabs */}

      <div className="mt-10 flex items-center justify-between border-b border-[#292d2d]">

        <div className="flex gap-6">

          <button
            onClick={() =>
              setTab("plan")
            }
            className={
              tab === "plan"
                ? "border-b-2 border-[#ccff00] pb-4 text-[#ccff00]"
                : "pb-4 text-gray-500"
            }
          >
            TODAY&apos;S PLAN
          </button>

          <button
            onClick={() =>
              setTab("saved")
            }
            className={
              tab === "saved"
                ? "border-b-2 border-[#ccff00] pb-4 text-[#ccff00]"
                : "pb-4 text-gray-500"
            }
          >
            SAVED
          </button>

        </div>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as
                | "duration"
                | "calories"
                | "rating"
            )
          }
          className="mb-2 rounded border border-gray-700 bg-[#111313] p-2"
        >
          <option value="duration">
            Duration
          </option>

          <option value="calories">
            Calories
          </option>

          <option value="rating">
            Rating
          </option>

        </select>

      </div>

      {/* List */}

      <div className="mt-8 space-y-4">

        {sortedList.length === 0 ? (

          <div className="rounded-xl border border-dashed border-gray-700 p-12 text-center">

            <h2 className="font-bold">
              {tab === "plan"
                ? "Your plan is empty"
                : "Nothing saved yet"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Choose a workout from
              the library.
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-block rounded bg-[#ccff00] px-5 py-3 font-bold text-black"
            >
              BROWSE WORKOUTS
            </Link>

          </div>

        ) : (

          sortedList.map(
            (workout) => (

              <div
                key={workout.id}
                className="grid gap-5 rounded-xl border border-[#292d2d] bg-[#111313] p-4 sm:grid-cols-[150px_1fr_auto] sm:items-center"
              >

                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-28 w-full rounded-lg object-cover"
                />

                <div>

                  <Link
                    href={`/workout/${workout.id}`}
                    className="font-black uppercase hover:text-[#ccff00]"
                  >
                    {workout.name}
                  </Link>

                  <p className="mt-2 text-xs text-gray-500">
                    {workout.duration} min
                    {" · "}
                    {workout.caloriesBurned} kcal
                    {" · "}
                    ★ {workout.rating}
                  </p>

                </div>

                <div className="flex gap-2">

                  {tab === "plan" && (
                    <button
                      onClick={() =>
                        markAsDone(
                          workout.id
                        )
                      }
                      className="rounded bg-[#ccff00] px-4 py-2 text-xs font-black text-black"
                    >
                      MARK DONE
                    </button>
                  )}

                  <button
                    onClick={() =>
                      tab === "plan"
                        ? removeFromPlan(
                            workout.id
                          )
                        : removeFromSaved(
                            workout.id
                          )
                    }
                    className="rounded border border-gray-700 px-4 py-2 text-xs"
                  >
                    REMOVE
                  </button>

                </div>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="p-5">

      <p className="text-xs uppercase text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}