'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollReveal } from './ScrollReveal'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🖼️  HOW TO ADD IMAGES / VIDEOS TO THE GALLERY:
//
// Simply drop your files into:  public/gallery/
//   Images: .jpg .jpeg .png .gif .webp .svg .avif
//   Videos: .mp4 .webm .mov
//
// They are picked up automatically — no code changes needed.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface GalleryItem {
    src: string
    alt: string
    type: 'image' | 'video'
}

interface GalleryProps {
    items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

    return (
        <section
            id="gallery"
            className="relative py-24 lg:py-36"
            style={{ padding: 'clamp(4rem, 10vw, 9rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
            {/* Subtle separator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-dim)] to-transparent opacity-40" />

            <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                    <h2
                        className="font-[family-name:var(--font-display)] font-bold text-[var(--color-text-primary)] text-center leading-tight"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                        The <span className="text-[var(--color-accent)]">Gallery</span>
                    </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <p
                        className="mt-4 text-center text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)] max-w-md mx-auto"
                        style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.7 }}
                    >
                        Moments of legend, captured forever.
                    </p>
                </ScrollReveal>

                {/* Gallery Grid */}
                {items.length > 0 ? (
                    <ScrollReveal delay={0.3}>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {items.map((item, index) => (
                                <motion.button
                                    key={item.src}
                                    onClick={() => setSelectedImage(item)}
                                    className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    data-cursor="OPEN"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.src}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            muted
                                            loop
                                            playsInline
                                            autoPlay
                                        />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {item.type === 'video' && (
                                        <span className="absolute top-2 right-2 text-white/70 text-xs bg-black/50 px-1.5 py-0.5 rounded">
                                            ▶
                                        </span>
                                    )}
                                    <span className="absolute bottom-3 left-3 right-3 text-xs text-white/80 font-[family-name:var(--font-sans)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.alt}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal delay={0.3}>
                        <div className="mt-12 flex flex-col items-center justify-center py-16 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-card)]/30">
                            <span className="text-4xl mb-4">🖼️</span>
                            <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-sans)] text-sm">
                                Gallery coming soon
                            </p>
                        </div>
                    </ScrollReveal>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl max-h-[85vh] w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedImage.type === 'video' ? (
                                <video
                                    src={selectedImage.src}
                                    className="w-full h-auto max-h-[85vh] rounded-xl"
                                    controls
                                    autoPlay
                                    loop
                                    playsInline
                                />
                            ) : (
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                                />
                            )}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] flex items-center justify-center text-sm transition-colors"
                                data-cursor="CLICK"
                            >
                                ✕
                            </button>
                            <p className="mt-3 text-center text-sm text-[var(--color-text-secondary)] font-[family-name:var(--font-sans)]">
                                {selectedImage.alt}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
