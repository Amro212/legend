'use client'

import { useRef, useState, useEffect, Fragment } from 'react'
import { motion } from 'motion/react'
import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import { LordIcon } from './LordIcon'

const CA = 'J4ixzSEG99FWNoHRYfoaE3y2e7T7e7KX8NKNPy96pump'
const OFFICIAL_TWITTER = 'https://x.com/legendreplyguy?s=21'

const charVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { type: 'spring' as const, damping: 14, stiffness: 100 },
    },
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
}

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!imageRef.current) return
        // Skip parallax mouse-move effect on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) return

        const xTo = gsap.quickTo(imageRef.current, 'x', { duration: 1, ease: 'power2.out' })
        const yTo = gsap.quickTo(imageRef.current, 'y', { duration: 1, ease: 'power2.out' })

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window
            xTo((e.clientX / innerWidth - 0.5) * 20)
            yTo((e.clientY / innerHeight - 0.5) * 15)
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Floating animation for hero image
    useGSAP(() => {
        if (!imageRef.current) return
        gsap.to(imageRef.current, {
            y: '+=12',
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        })
    }, { scope: heroRef })

    const copyCA = async () => {
        try {
            await navigator.clipboard.writeText(CA)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Fallback
            const textArea = document.createElement('textarea')
            textArea.value = CA
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ padding: 'clamp(1.5rem, 5vw, 6rem)' }}
        >
            {/* Subtle gradient orb — clamped for mobile */}
            <div
                className="absolute top-1/4 left-1/4 w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full opacity-10 blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Text Stack */}
                <div className="flex flex-col gap-6 lg:gap-8">
                    {/* Lordicon accent */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="w-8 h-8"
                    >
                        {/* Coins Icon */}
                        <LordIcon
                            src="/wired-outline-298-coins-hover-spending.json"
                            trigger="loop"
                            delay="3000"
                            colors="primary:#c9a96e"
                            size={32}
                        />
                    </motion.div>

                    {/* H1 - Character reveal */}
                    <motion.h1
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-none max-w-2xl"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                    >
                        {'Legend, any paid tasks?'.split(' ').map((word, wordIdx, wordsArr) => {
                            let prevCharsCount = 0;
                            for (let i = 0; i < wordIdx; i++) {
                                prevCharsCount += wordsArr[i].length + 1;
                            }
                            return (
                                <Fragment key={wordIdx}>
                                    <span className="inline-block whitespace-nowrap">
                                        {word.split('').map((char, charIdx) => {
                                            const globalIdx = prevCharsCount + charIdx;
                                            return (
                                                <motion.span
                                                    key={charIdx}
                                                    variants={charVariants}
                                                    className="inline-block"
                                                    style={{ color: globalIdx < 6 ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
                                                >
                                                    {char}
                                                </motion.span>
                                            );
                                        })}
                                    </span>
                                    {wordIdx < wordsArr.length - 1 && ' '}
                                </Fragment>
                            );
                        })}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)] max-w-md"
                        style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 1.7 }}
                    >
                        The most polite reply guy on Solana.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex flex-wrap gap-4 mt-2"
                    >
                        {/* Primary CTA */}
                        <motion.a
                            href={OFFICIAL_TWITTER}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
                        >
                            Follow Legend
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.a>

                        {/* Secondary CTA - Copy CA */}
                        <motion.button
                            onClick={copyCA}
                            data-cursor="COPY"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.92 }}
                            className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] border border-[var(--color-border)] text-[var(--color-text-primary)] font-[family-name:var(--font-mono)] text-sm rounded-full transition-colors hover:border-[var(--color-accent-dim)] hover:text-[var(--color-accent)]"
                        >
                            {copied ? (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-[var(--color-accent)]"
                                >
                                    ✓ Copied
                                </motion.span>
                            ) : (
                                'Copy CA'
                            )}
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex justify-center lg:justify-end"
                    data-cursor=""
                >
                    {/* Glow behind image */}
                    <div
                        className="absolute inset-0 opacity-20 blur-[80px] pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 60%)',
                        }}
                    />

                    <div ref={imageRef} className="relative" style={{ willChange: 'transform' }}>
                        <Image
                            src="/hero-frog.png"
                            alt="LEGEND - Distinguished gentleman frog in tuxedo"
                            width={500}
                            height={600}
                            priority
                            className="relative z-10 w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-[0_0_60px_rgba(201,169,110,0.15)]"
                        />

                        {/* Lordicon accents around image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="absolute -top-4 -right-4 pointer-events-none"
                        >
                            {/* Diamond Icon */}
                            <LordIcon
                                src="https://cdn.lordicon.com/qhguztuy.json"
                                trigger="loop"
                                delay="4000"
                                colors="primary:#c9a96e"
                                size={28}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            className="absolute bottom-8 -left-6 pointer-events-none"
                        >
                            {/* Coin/Token Icon */}
                            <LordIcon
                                src="https://cdn.lordicon.com/zlwdfkof.json"
                                trigger="loop"
                                delay="5000"
                                colors="primary:#c9a96e"
                                size={24}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
