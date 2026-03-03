'use client'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenis = useLenis()

    useEffect(() => {
        if (!lenis) return
        const onTick = (time: number) => lenis.raf(time * 1000)

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(onTick)
        gsap.ticker.lagSmoothing(500, 33)

        return () => {
            lenis.off('scroll', ScrollTrigger.update)
            gsap.ticker.remove(onTick)
        }
    }, [lenis])

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    )
}
