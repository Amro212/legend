import fs from 'fs'
import path from 'path'
import { Hero } from '@/components/Hero'
import { ProofStrip } from '@/components/ProofStrip'
import { TheMeme } from '@/components/TheMeme'
import { ContractSection } from '@/components/ContractSection'
import { Community } from '@/components/Community'
import { Gallery, type GalleryItem } from '@/components/Gallery'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'])
const VIDEO_EXTS = new Set(['.mp4', '.webm', '.mov'])

function getGalleryItems(): GalleryItem[] {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery')
    try {
        return fs
            .readdirSync(galleryDir)
            .filter((file) => {
                const ext = path.extname(file).toLowerCase()
                return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext)
            })
            .map((file) => ({
                src: `/gallery/${file}`,
                alt: path.basename(file, path.extname(file)).replace(/[-_]/g, ' '),
                type: VIDEO_EXTS.has(path.extname(file).toLowerCase()) ? 'video' : 'image',
            } as GalleryItem))
    } catch {
        return []
    }
}

export default function Home() {
    const galleryItems = getGalleryItems()
    return (
        <>
            <Hero />
            <ProofStrip />
            <TheMeme />
            <ContractSection />
            <Gallery items={galleryItems} />
            <Community />
        </>
    )
}
