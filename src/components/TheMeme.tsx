'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'

export function TheMeme() {
    return (
        <section className="relative py-24 lg:py-36" style={{ padding: 'clamp(4rem, 10vw, 9rem) clamp(1.5rem, 5vw, 6rem)' }}>
            {/* Subtle separator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-dim)] to-transparent opacity-40" />

            <div className="max-w-3xl mx-auto text-center">
                <ScrollReveal>
                    <p
                        className="font-[family-name:var(--font-sans)] text-[var(--color-text-secondary)] leading-relaxed"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
                    >
                        LEGEND is the calm flex. A gentleman frog in a space full of noise.
                        No screaming, no begging, no &quot;next 100x&quot; promises.
                        Just a tux, a vibe, and a community that gets it.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <motion.blockquote
                        className="mt-12 lg:mt-16 relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        {/* Decorative quote marks */}
                        <span
                            className="absolute -top-8 -left-4 font-[family-name:var(--font-display)] text-[var(--color-accent)] opacity-20"
                            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                            aria-hidden="true"
                        >
                            &ldquo;
                        </span>

                        <p
                            className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-text-primary)] italic leading-snug"
                            style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
                        >
                            Legends are not born from hype.
                            <br />
                            <span className="text-[var(--color-accent)]">They emerge from conviction.</span>
                        </p>

                        <span
                            className="absolute -bottom-6 -right-2 font-[family-name:var(--font-display)] text-[var(--color-accent)] opacity-20"
                            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                            aria-hidden="true"
                        >
                            &rdquo;
                        </span>
                    </motion.blockquote>
                </ScrollReveal>
            </div>
        </section>
    )
}
