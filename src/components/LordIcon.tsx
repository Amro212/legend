'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'

interface LordIconProps {
    /**
     * CDN URL for the Lordicon JSON (e.g. "https://cdn.lordicon.com/xhebrhsj.json").
     * The global lordicon.js CDN script (loaded in layout.tsx) handles rendering.
     */
    src: string
    trigger?: string
    delay?: string
    colors?: string
    size?: number
    className?: string
    style?: React.CSSProperties
    /** Loading strategy: "lazy" (viewport), "interaction" (user action) */
    loading?: 'lazy' | 'interaction'
}

export function LordIcon({
    src,
    trigger = 'loop',
    delay = '3000',
    colors = 'primary:#c9a96e',
    size = 32,
    className = '',
    style,
    loading,
}: LordIconProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<any>(null)
    const scrollTimeout = useRef<number>(0)
    const { scrollY } = useScroll()

    // Pause looping animations during active scroll for consistent 60fps
    useMotionValueEvent(scrollY, "change", () => {
        if (trigger !== 'loop') return

        if (playerRef.current) {
            try {
                // Safely attempt to pause
                playerRef.current.pause()
            } catch (e) { }
        }

        if (scrollTimeout.current) {
            window.clearTimeout(scrollTimeout.current)
        }

        // Resume after scrolling stops
        scrollTimeout.current = window.setTimeout(() => {
            if (playerRef.current) {
                try {
                    playerRef.current.play()
                } catch (e) { }
            }
        }, 150)
    })

    useEffect(() => {
        if (!containerRef.current) return

        // Create the lord-icon custom element imperatively to avoid React/TS JSX issues
        const el = document.createElement('lord-icon') as any
        el.setAttribute('src', src)
        el.setAttribute('trigger', trigger)
        if (delay) el.setAttribute('delay', delay)
        if (colors) el.setAttribute('colors', colors)
        if (loading) el.setAttribute('loading', loading)
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.display = 'inline-block'

        el.addEventListener('ready', () => {
            if (el.player) {
                playerRef.current = el.player
            }
        })

        containerRef.current.appendChild(el)

        return () => {
            if (scrollTimeout.current) {
                window.clearTimeout(scrollTimeout.current)
            }
            if (containerRef.current && el.parentNode === containerRef.current) {
                containerRef.current.removeChild(el)
            }
        }
    }, [src, trigger, delay, colors, size, loading])

    return <div ref={containerRef} className={className} style={style} />
}
