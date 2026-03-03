'use client'

import { useRef, useEffect } from 'react'

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

    useEffect(() => {
        if (!containerRef.current) return

        // Create the lord-icon custom element imperatively to avoid React/TS JSX issues
        const el = document.createElement('lord-icon') as HTMLElement
        el.setAttribute('src', src)
        el.setAttribute('trigger', trigger)
        if (delay) el.setAttribute('delay', delay)
        if (colors) el.setAttribute('colors', colors)
        if (loading) el.setAttribute('loading', loading)
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.display = 'inline-block'

        containerRef.current.appendChild(el)

        return () => {
            if (containerRef.current && el.parentNode === containerRef.current) {
                containerRef.current.removeChild(el)
            }
        }
    }, [src, trigger, delay, colors, size, loading])

    return <div ref={containerRef} className={className} style={style} />
}
