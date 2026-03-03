'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const OFFICIAL_TWITTER = 'https://x.com/legendreplyguy?s=21'
const TELEGRAM_STICKERS = 'https://t.me/addstickers/Legend273'

export function FloatingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        // Track the hero section (first section in the DOM)
        const heroEl = document.querySelector('section')
        if (!heroEl) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the hero section is less than 10% visible, morph the navbar
                setIsScrolled(entry.intersectionRatio < 0.1)
            },
            {
                root: null,
                threshold: [0.1],
            }
        )

        observer.observe(heroEl)
        return () => observer.disconnect()
    }, [])

    const handleScroll = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.div
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-3xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
        >
            <div
                className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${isScrolled
                        ? 'bg-[var(--color-bg)]/60 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-transparent border border-transparent'
                    }`}
            >
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-[family-name:var(--font-display)] font-bold text-lg tracking-widest text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                    data-cursor="OPEN"
                >
                    LEGEND
                </button>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Archetype', 'Contract', 'Community'].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleScroll(item.toLowerCase())}
                            data-cursor="CLICK"
                            className={`text-sm font-[family-name:var(--font-sans)] transition-colors duration-300 hover:text-[var(--color-accent)] ${isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                    <a
                        href={TELEGRAM_STICKERS}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="OPEN"
                        className={`text-sm font-[family-name:var(--font-sans)] transition-colors duration-300 hover:text-[var(--color-accent)] ${isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
                            }`}
                    >
                        Stickers
                    </a>
                </div>

                {/* CTA */}
                <a
                    href={OFFICIAL_TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className={`px-5 py-2.5 rounded-full font-[family-name:var(--font-display)] font-semibold text-xs tracking-wide transition-all duration-300 ${isScrolled
                            ? 'bg-[var(--color-accent)] text-[var(--color-bg)] hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:scale-105'
                            : 'bg-white/10 text-[var(--color-text-primary)] backdrop-blur-md border border-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                >
                    Follow
                </a>
            </div>
        </motion.div>
    )
}
