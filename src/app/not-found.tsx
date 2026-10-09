import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-fit grid min-h-[70vh] place-items-center">

      <div className="text-center">

        <p className="text-7xl font-black text-[#ccff00]">
          404
        </p>

        <h1 className="display-font mt-4 text-5xl">
          WORKOUT NOT FOUND
        </h1>

        <p className="mt-3 text-gray-500">
          The workout you requested
          does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-[#ccff00] px-6 py-3 font-black text-black"
        >
          BACK TO LIBRARY
        </Link>

      </div>

    </div>
  );
}