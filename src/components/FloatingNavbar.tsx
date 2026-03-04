'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'

const OFFICIAL_TWITTER = 'https://x.com/legendreplyguy?s=21'
const TELEGRAM_STICKERS = 'https://t.me/addstickers/Legend273'

const NAV_ITEMS = ['Archetype', 'Contract', 'Gallery', 'Community'] as const

export function FloatingNavbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const scrollTimeout = useRef<number>(0)
    const lastScrollTime = useRef(0)

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', onResize, { passive: true })
        return () => window.removeEventListener('resize', onResize)
    }, [mobileMenuOpen])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileMenuOpen])

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled)
        }

        if (scrolled) {
            lastScrollTime.current = Date.now()

            if (!isScrolling) {
                setIsScrolling(true)
            }

            if (!scrollTimeout.current) {
                const checkScroll = () => {
                    // Check if 150ms has passed since the last scroll event
                    if (Date.now() - lastScrollTime.current >= 150) {
                        setIsScrolling(false)
                        scrollTimeout.current = 0
                    } else {
                        // Re-check frequently
                        scrollTimeout.current = window.setTimeout(checkScroll, 50)
                    }
                }
                scrollTimeout.current = window.setTimeout(checkScroll, 150)
            }
        } else if (isScrolling) {
            setIsScrolling(false)
            if (scrollTimeout.current) {
                window.clearTimeout(scrollTimeout.current)
                scrollTimeout.current = 0
            }
        }
    })

    const handleScroll = (id: string) => {
        setMobileMenuOpen(false)
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Dynamic classes based on scrolling and scrolled state to reduce compositor load
    const navBackgroundClass = isScrolled
        ? `border border-[var(--color-border)] ${isScrolling
            ? 'bg-[var(--color-bg)]/85 shadow-[0_2px_15px_rgba(0,0,0,0.3)]'
            : 'bg-[var(--color-bg)]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        }`
        : 'bg-transparent border border-transparent shadow-none'

    return (
        <motion.div
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-3xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
        >
            <div
                className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${navBackgroundClass}`}
            >
                {/* Logo */}
                <button
                    onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="font-[family-name:var(--font-display)] font-bold text-lg tracking-widest text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                    data-cursor="OPEN"
                >
                    LEGEND
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
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

                <div className="flex items-center gap-3">
                    {/* CTA */}
                    <a
                        href={OFFICIAL_TWITTER}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="OPEN"
                        className={`hidden sm:inline-flex px-5 py-2.5 rounded-full font-[family-name:var(--font-display)] font-semibold text-xs tracking-wide transition-all duration-300 ${isScrolled
                            ? 'bg-[var(--color-accent)] text-[var(--color-bg)] hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:scale-105'
                            : 'bg-white/10 text-[var(--color-text-primary)] backdrop-blur-md border border-white/10 hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        Follow
                    </a>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <div className="relative w-5 h-4 flex flex-col justify-between">
                            <span
                                className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                            />
                            <span
                                className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}
                            />
                            <span
                                className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="md:hidden mt-3 mx-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-1">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleScroll(item.toLowerCase())}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)] text-base transition-colors hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-accent)] active:scale-[0.98]"
                                >
                                    {item}
                                </motion.button>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                                href={TELEGRAM_STICKERS}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)] text-base transition-colors hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-accent)] active:scale-[0.98]"
                            >
                                Stickers
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </motion.a>

                            {/* Mobile-only Follow + CTA buttons */}
                            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-[var(--color-border)]">
                                <motion.a
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    href={OFFICIAL_TWITTER}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide active:scale-[0.97]"
                                >
                                    Follow Legend
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </motion.a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
