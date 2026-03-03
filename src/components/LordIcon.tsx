'use client'

import { useRef, useEffect } from 'react'

interface LordIconProps {
    src: string
    trigger?: string
    delay?: string
    colors?: string
    size?: number
    className?: string
    style?: React.CSSProperties
}

export function LordIcon({
    src,
    trigger = 'loop',
    delay = '3000',
    colors = 'primary:#c9a96e',
    size = 32,
    className = '',
    style,
}: LordIconProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const el = document.createElement('lord-icon') as HTMLElement
        el.setAttribute('src', src)
        el.setAttribute('trigger', trigger)
        el.setAttribute('delay', delay)
        el.setAttribute('colors', colors)
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.display = 'inline-block'

        containerRef.current.appendChild(el)

        return () => {
            if (containerRef.current && el.parentNode === containerRef.current) {
                containerRef.current.removeChild(el)
            }
        }
    }, [src, trigger, delay, colors, size])

    return <div ref={containerRef} className={className} style={style} />
}
