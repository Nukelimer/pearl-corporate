import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4">
      <Image
        src="/homepage/error.png"
        alt="Page not found"
        width={420}
        height={420}
        priority
        className=" top-0 -z- 10 "
      />
      <div className="flex flex-col items-center text-center w-full ">
        <p className="text-black/60 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2 text-white text-sm font-medium transition hover:bg-black/90">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
