'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'

const CA = 'J4ixzSEG99FWNoHRYfoaE3y2e7T7e7KX8NKNPy96pump'
const X_COMMUNITY = 'https://x.com/i/communities/2003523155730616378'
const OFFICIAL_TWITTER = 'https://x.com/legendreplyguy?s=21'
const TELEGRAM_STICKERS = 'https://t.me/addstickers/Legend273'

export function Community() {
    return (
        <>
            {/* CTA Section */}
            <section id="community" className="relative py-24 lg:py-36" style={{ padding: 'clamp(4rem, 10vw, 9rem) clamp(1.5rem, 5vw, 6rem)' }}>
                {/* Subtle separator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-dim)] to-transparent opacity-40" />

                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <h2
                            className="font-[family-name:var(--font-display)] font-bold text-[var(--color-text-primary)] leading-tight"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                        >
                            Become a <span className="text-[var(--color-accent)]">Legend</span>.
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <p
                            className="mt-6 text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)] max-w-md mx-auto"
                            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.7 }}
                        >
                            The door is open. The vibe is right.
                            No gatekeepers, just gentlemen.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <motion.a
                                href={X_COMMUNITY}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="OPEN"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide rounded-full transition-shadow hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
                            >
                                X Community
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.a>

                            <motion.a
                                href={OFFICIAL_TWITTER}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="OPEN"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide rounded-full transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                            >
                                Official Twitter
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.a>

                            <motion.a
                                href={TELEGRAM_STICKERS}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="OPEN"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide rounded-full transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                            >
                                Telegram Stickers
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[var(--color-border)]" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 6rem)' }}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <span className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--color-text-primary)]">
                            LEGEND
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                            {CA.slice(0, 6)}...{CA.slice(-4)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <a
                            href={X_COMMUNITY}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm font-[family-name:var(--font-sans)]"
                        >
                            X Community
                        </a>
                        <a
                            href={OFFICIAL_TWITTER}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm font-[family-name:var(--font-sans)]"
                        >
                            Official Twitter
                        </a>
                        <a
                            href={TELEGRAM_STICKERS}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm font-[family-name:var(--font-sans)]"
                        >
                            Telegram Stickers
                        </a>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[var(--color-border)]">
                    <p className="text-center text-[var(--color-text-muted)] text-xs font-[family-name:var(--font-sans)]">
                        $LEGEND is a memecoin with no intrinsic value or expectation of financial return.
                    </p>
                </div>
            </footer>
        </>
    )
}
