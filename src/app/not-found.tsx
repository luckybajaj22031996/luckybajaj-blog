import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p
          className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          INT. THE INTERNET - LOST
        </p>

        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SCENE MISSING
        </h1>

        <p className="text-sm text-[var(--color-text-muted)] mb-2 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-10 leading-relaxed">
          Maybe it was never written. Maybe it was cut in post.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:gap-3 transition-all duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to the script
        </Link>
      </div>
    </div>
  );
}
