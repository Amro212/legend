'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const pos = useRef({ x: 0, y: 0 })
    const [isTouch, setIsTouch] = useState(false)
    const [label, setLabel] = useState('')
    const rafRef = useRef<number | null>(null)
    const dotPos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouch(isTouchDevice)
        if (isTouchDevice) return

        document.body.classList.add('cursor-hidden')

        if (!dotRef.current || !ringRef.current) return

        const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power2.out" })
        const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power2.out" })
        const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power2.out" })
        const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power2.out" })

        const onMove = (e: MouseEvent) => {
            dotX(e.clientX - 4)
            dotY(e.clientY - 4)
            ringX(e.clientX - 20)
            ringY(e.clientY - 20)
        }

        window.addEventListener('mousemove', onMove, { passive: true })

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.body.classList.remove('cursor-hidden')
        }
    }, [])

    // Hover detection
    useEffect(() => {
        if (isTouch) return

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactiveEl = target.closest('a, button, [data-cursor]')

            if (interactiveEl) {
                const cursorLabel = interactiveEl.getAttribute('data-cursor') || ''
                setLabel(cursorLabel)

                if (ringRef.current) {
                    gsap.to(ringRef.current, {
                        width: cursorLabel ? 80 : 50,
                        height: cursorLabel ? 80 : 50,
                        borderColor: 'rgba(201, 169, 110, 0.6)',
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                }
                if (dotRef.current) {
                    gsap.to(dotRef.current, {
                        scale: 0,
                        duration: 0.2,
                    })
                }
            }
        }

        const handleOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactiveEl = target.closest('a, button, [data-cursor]')

            if (interactiveEl) {
                setLabel('')
                if (ringRef.current) {
                    gsap.to(ringRef.current, {
                        width: 40,
                        height: 40,
                        borderColor: 'rgba(232, 228, 221, 0.3)',
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                }
                if (dotRef.current) {
                    gsap.to(dotRef.current, {
                        scale: 1,
                        duration: 0.2,
                    })
                }
            }
        }

        document.addEventListener('mouseover', handleOver, { passive: true })
        document.addEventListener('mouseout', handleOut, { passive: true })

        return () => {
            document.removeEventListener('mouseover', handleOver)
            document.removeEventListener('mouseout', handleOut)
        }
    }, [isTouch])

    if (isTouch) return null

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{ willChange: 'transform' }}
            >
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]" />
            </div>

            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
                style={{
                    width: 40,
                    height: 40,
                    border: '1px solid rgba(232, 228, 221, 0.3)',
                    borderRadius: '50%',
                    willChange: 'transform',
                    transition: 'width 0.3s, height 0.3s',
                }}
            >
                <span
                    ref={labelRef}
                    className="text-[10px] font-mono font-medium tracking-widest text-[var(--color-accent)] uppercase"
                    style={{
                        opacity: label ? 1 : 0,
                        transition: 'opacity 0.2s',
                    }}
                >
                    {label}
                </span>
            </div>
        </>
    )
}
