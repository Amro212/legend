'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'

const CA = 'J4ixzSEG99FWNoHRYfoaE3y2e7T7e7KX8NKNPy96pump'

export function ContractSection() {
    const [copied, setCopied] = useState(false)

    const copyCA = async () => {
        try {
            await navigator.clipboard.writeText(CA)
        } catch {
            const textArea = document.createElement('textarea')
            textArea.value = CA
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <section id="contract" className="relative py-20 lg:py-32" style={{ padding: 'clamp(3rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem)' }}>
            <div className="max-w-3xl mx-auto text-center">
                <ScrollReveal>
                    <p className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] tracking-widest uppercase mb-6">
                        Contract Address
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    {/* Microcopy */}
                    <p className="font-[family-name:var(--font-sans)] text-[var(--color-accent)] font-medium text-sm mb-3">
                        Certified Reply Guy.
                    </p>

                    {/* CA Pill */}
                    <div className="relative inline-flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                            <code className="font-[family-name:var(--font-mono)] text-[var(--color-text-primary)] text-xs sm:text-sm break-all select-all">
                                {CA}
                            </code>
                        </div>

                        {/* Copy button with haptic animation */}
                        <motion.button
                            onClick={copyCA}
                            data-cursor="COPY"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.88 }}
                            className="relative inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] font-[family-name:var(--font-mono)] text-sm transition-all hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-bg-card-hover)]"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy Contract
                        </motion.button>

                        {/* Tooltip */}
                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="absolute -bottom-12 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-mono)] text-xs font-semibold"
                                >
                                    Copied ✓
                                    {/* Arrow */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-accent)] rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollReveal>

                {/* Explorer link */}
                <ScrollReveal delay={0.2}>
                    <div className="mt-8">
                        <a
                            href={`https://solscan.io/token/${CA}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)] transition-colors"
                        >
                            View on Solscan
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
