"use client";

import {
  useEffect,
  useState,
} from "react";

import { getAllWorkouts } from "@/utils/api";

import WorkoutCard from "./WorkoutCard";

import type { Workout } from "@/types";

export default function LibrarySection() {

  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadWorkouts() {

      try {

        const data =
          await getAllWorkouts();

        setWorkouts(data.slice(0, 12));

    } catch (error) {
  console.error("Workout loading failed:", error);
} finally {
  setLoading(false);
}

    }

    loadWorkouts();

  }, []);

  return (
    <section
      id="library"
      className="container-fit pt-24"
    >

      <div className="mb-8">
        <h2 className="display-font mt-2 text-5xl">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-gray-500">
          Twelve lifts covering every major
          muscle group.
        </p>

      </div>

      {loading ? (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
  <div
    key={item}
    className="h-80 animate-pulse rounded-xl bg-[#111313]"
  />
))}

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {workouts.map(
            (workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            )
          )}

        </div>

      )}

    </section>
  );
}