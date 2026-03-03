import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import Script from 'next/script'
import { CustomCursor, AnimatedLiquidBackground } from '@/components/DynamicComponents'

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'LEGEND | $LEGEND — Built for the ones who don\'t beg',
    description: 'LEGEND is the calm flex. A gentleman frog in a space full of noise. Join the community.',
    keywords: ['LEGEND', '$LEGEND', 'memecoin', 'Solana', 'community'],
    openGraph: {
        title: 'LEGEND | $LEGEND',
        description: 'Built for the ones who don\'t beg. They become.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <head>
                <Script
                    src="https://cdn.lordicon.com/lordicon.js"
                    strategy="lazyOnload"
                />
            </head>
            <body suppressHydrationWarning>
                {/* Background Layer */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <AnimatedLiquidBackground />
                </div>
                <SmoothScroll>
                    <div className="relative z-10 flex flex-col min-h-screen">
                        <CustomCursor />
                        <main className="relative z-[2] grow">
                            {children}
                        </main>
                    </div>
                </SmoothScroll>
            </body>
        </html>
    )
}
