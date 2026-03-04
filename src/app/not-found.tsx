export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <h1
                className="font-[family-name:var(--font-display)] font-bold text-[var(--color-text-primary)]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
                404
            </h1>
            <p className="mt-4 text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)]">
                This page doesn&apos;t exist yet, Legend.
            </p>
            <a
                href="/"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 min-h-[44px] bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
            >
                Go Home
            </a>
        </section>
    )
}
