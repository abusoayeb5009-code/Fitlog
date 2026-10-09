import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#292d2d]">

      <div className="container-fit flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="font-black">
          FITLOG
        </h2>

        <p className="text-sm text-gray-500">
          Curated tools, technologies,
          and resources for developers
          building modern software.
        </p>

        <p className="text-xs text-gray-600">
          © 2026 FitLog
        </p>

      </div>

    </footer>
  );
}