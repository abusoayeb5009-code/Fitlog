
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isHydrated } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-[#292d2d] bg-[#080909]/95 backdrop-blur">
      <div className="container-fit flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-black text-white">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "font-bold text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }
          >
            My Plan
          </Link>
        </nav>

        <Link
          href="/my-plan"
          className="flex shrink-0 items-center gap-2 text-[10px] sm:text-xs"
        >
          <span className="rounded-full bg-[#ccff00] px-3 py-2 font-black text-black">
            Plan {isHydrated ? plan.length : "—"}
          </span>

          <span className="rounded-full border border-gray-700 px-3 py-2 text-gray-300">
            Saved {isHydrated ? saved.length : "—"}
          </span>
        </Link>
      </div>
    </header>
  );
}