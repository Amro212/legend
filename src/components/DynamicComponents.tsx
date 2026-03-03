'use client'

import dynamic from 'next/dynamic'

export const CustomCursor = dynamic(
    () => import('./CustomCursor').then((mod) => mod.CustomCursor),
    { ssr: false }
)

export const AnimatedLiquidBackground = dynamic(
    () => import('./AnimatedLiquidBackground').then((mod) => mod.AnimatedLiquidBackground),
    { ssr: false }
)
