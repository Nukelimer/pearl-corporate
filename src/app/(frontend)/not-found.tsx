import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    // The dark: classes only take effect on a missing /blog page: the dark
    // class is never on <html> anywhere else.
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 dark:bg-background">
      {/* The image is opaque white. In dark, invert flips it to black with
          white lines, hue-rotate brings the blues back, and the screen blend
          lets the page background show through the black. */}
      <Image
        src="/homepage/error.png"
        alt="Page not found"
        width={420}
        height={420}
        priority
        className=" top-0 -z- 10 dark:invert dark:hue-rotate-180 dark:mix-blend-screen"
      />
      <div className="flex flex-col items-center text-center w-full ">
        <p className="text-black/60 mb-8 dark:text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2 text-white text-sm font-medium transition hover:bg-black/90 dark:hover:bg-accent/90">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
