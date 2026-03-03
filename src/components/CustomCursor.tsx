'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const LERP_FACTOR = 0.15; // Smoothness factor for interpolation

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const visualRingRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)

    const [isMounted, setIsMounted] = useState(false)
    const [isTouch, setIsTouch] = useState(true)
    const [label, setLabel] = useState('')

    // Target values tracking mouse position
    const target = useRef({ x: -100, y: -100, dotScale: 1, ringScale: 1 })
    // Current interpolated values for smooth following
    const current = useRef({ dotX: -100, dotY: -100, ringX: -100, ringY: -100, dotScale: 1, ringScale: 1 })

    const rafRef = useRef<number>(0)

    useEffect(() => {
        setIsMounted(true)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouch(isTouchDevice)

        if (isTouchDevice) return

        document.body.classList.add('cursor-hidden')

        const onMove = (e: MouseEvent) => {
            if (current.current.dotX === -100) {
                // Initial jump to mouse position to avoid sweeping across the screen
                current.current.dotX = e.clientX
                current.current.dotY = e.clientY
                current.current.ringX = e.clientX
                current.current.ringY = e.clientY
            }
            target.current.x = e.clientX
            target.current.y = e.clientY
        }

        window.addEventListener('mousemove', onMove, { passive: true })

        const updateCursor = () => {
            // Lerp positional values
            current.current.dotX += (target.current.x - current.current.dotX) * 0.4
            current.current.dotY += (target.current.y - current.current.dotY) * 0.4
            current.current.ringX += (target.current.x - current.current.ringX) * LERP_FACTOR
            current.current.ringY += (target.current.y - current.current.ringY) * LERP_FACTOR

            // Lerp scale values
            current.current.dotScale += (target.current.dotScale - current.current.dotScale) * 0.2
            current.current.ringScale += (target.current.ringScale - current.current.ringScale) * 0.2

            // Apply transforms (no layout thrashing from top/left)
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${current.current.dotX - 4}px, ${current.current.dotY - 4}px, 0) scale(${current.current.dotScale})`
            }

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${current.current.ringX - 20}px, ${current.current.ringY - 20}px, 0)`
            }

            if (visualRingRef.current) {
                visualRingRef.current.style.transform = `scale(${current.current.ringScale})`
            }

            rafRef.current = requestAnimationFrame(updateCursor)
        }

        rafRef.current = requestAnimationFrame(updateCursor)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafRef.current)
            document.body.classList.remove('cursor-hidden')
        }
    }, [])

    useEffect(() => {
        if (isTouch) return

        const handleOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement
            const interactiveEl = el.closest('a, button, [data-cursor]')

            if (interactiveEl) {
                const cursorLabel = interactiveEl.getAttribute('data-cursor') || ''
                setLabel(cursorLabel)

                // Scale up ring to 2x (80px), scale down dot to 0
                target.current.ringScale = cursorLabel ? 2 : 1.25 // small scale up if no label, larger if label exists
                target.current.dotScale = 0
                if (visualRingRef.current) {
                    visualRingRef.current.style.borderColor = 'rgba(201, 169, 110, 0.6)'
                }
            }
        }

        const handleOut = (e: MouseEvent) => {
            const el = e.target as HTMLElement
            const interactiveEl = el.closest('a, button, [data-cursor]')

            if (interactiveEl) {
                setLabel('')
                target.current.ringScale = 1
                target.current.dotScale = 1
                if (visualRingRef.current) {
                    visualRingRef.current.style.borderColor = 'rgba(232, 228, 221, 0.3)'
                }
            }
        }

        // Event delegation on document so we catch dynamic elements seamlessly
        document.addEventListener('mouseover', handleOver, { passive: true })
        document.addEventListener('mouseout', handleOut, { passive: true })

        return () => {
            document.removeEventListener('mouseover', handleOver)
            document.removeEventListener('mouseout', handleOut)
        }
    }, [isTouch])

    if (!isMounted || isTouch) return null

    // We keep the elements simple and free from state toggles wherever possible.
    const cursorContent = (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[999999] pointer-events-none mix-blend-difference"
                style={{ willChange: 'transform' }}
            >
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]" />
            </div>

            {/* Ring Container (translates only) */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[999998] pointer-events-none flex items-center justify-center"
                style={{
                    width: 40,
                    height: 40,
                    willChange: 'transform',
                }}
            >
                {/* Visual Ring (scales and changes color) */}
                <div
                    ref={visualRingRef}
                    className="absolute inset-0 rounded-full transition-colors duration-300"
                    style={{
                        border: '1px solid rgba(232, 228, 221, 0.3)',
                        willChange: 'transform',
                    }}
                />

                {/* Label (fades in) */}
                <span
                    ref={labelRef}
                    className="text-[10px] font-mono font-medium tracking-widest text-[var(--color-accent)] uppercase relative z-10"
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

    // Ensure it correctly portals to document boundary, bypassing any layout contexts (e.g. from framer-motion)
    return createPortal(cursorContent, document.body)
}
