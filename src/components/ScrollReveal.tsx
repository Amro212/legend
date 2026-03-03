'use client'

import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    y?: number
    duration?: number
}

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    y = 40,
    duration = 0.8,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!ref.current) return

        gsap.from(ref.current, {
            y,
            opacity: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                once: true,
            },
        })
    }, { scope: ref })

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
