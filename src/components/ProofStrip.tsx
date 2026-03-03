'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'
import { LordIcon } from './LordIcon'

const cards = [
    {
        title: 'Community First',
        description: 'No insiders, no backroom deals. Just conviction.',
        icon: 'https://cdn.lordicon.com/mjmrmyzg.json', // People/Network
    },
    {
        title: 'Transparent CA',
        description: 'On-chain, verifiable, nothing hidden.',
        icon: 'https://cdn.lordicon.com/tqywkdcz.json', // Code/Contract
    },
    {
        title: 'Built to Last',
        description: 'In spirit, in culture, in legend.',
        icon: 'https://cdn.lordicon.com/yyxobqnx.json', // Diamond/Gem
    },
]

export function ProofStrip() {
    return (
        <section className="relative py-16 lg:py-24" style={{ padding: '0 clamp(1.5rem, 5vw, 6rem)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {cards.map((card, i) => (
                        <ScrollReveal key={card.title} delay={i * 0.15}>
                            <motion.div
                                whileHover={{
                                    y: -6,
                                    boxShadow: '0 20px 60px -15px rgba(201, 169, 110, 0.1)',
                                    borderColor: 'rgba(201, 169, 110, 0.15)',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="group relative p-6 lg:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(circle at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%)',
                                    }}
                                />

                                <div className="relative z-10 flex flex-col gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity">
                                        <LordIcon
                                            src={card.icon}
                                            trigger="hover"
                                            colors="primary:#c9a96e"
                                            size={36}
                                        />
                                    </div>

                                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-base text-[var(--color-text-primary)]">
                                        {card.title}
                                    </h3>

                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
