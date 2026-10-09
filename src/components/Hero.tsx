export default function Hero() {
  return (
    <section className="container-fit pt-12">

      <div className="grid min-h-[500px] items-center gap-10 overflow-hidden rounded-2xl border border-[#292d2d] bg-[#0e1010] p-8 lg:grid-cols-2 lg:p-14">

        {/* Left */}

        <div>

          <span className="rounded bg-[#ccff00] px-3 py-1 text-xs font-black text-black">
            WORKOUT LIBRARY
          </span>

          <h1 className="display-font mt-6 text-5xl leading-none sm:text-7xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl leading-7 text-gray-400">
            FitLog is a dark, no-nonsense gym
            companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s
            work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-block rounded-lg bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1"
          >
            BROWSE WORKOUTS
          </a>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-[#151818] p-6">

            <div className="text-center">

              <img
  src="/assets/banner.png"
  alt="FitLog Workout"
  className="w-full max-w-md object-contain"
/>


            </div>

          </div>

        </div>

      </div>

    </section>
  );
}