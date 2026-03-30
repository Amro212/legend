import { Hero } from '@/components/Hero'
import { ProofStrip } from '@/components/ProofStrip'
import dynamic from 'next/dynamic'

const TheMeme = dynamic(() => import('@/components/TheMeme').then((mod) => mod.TheMeme))
const ContractSection = dynamic(() => import('@/components/ContractSection').then((mod) => mod.ContractSection))
const Community = dynamic(() => import('@/components/Community').then((mod) => mod.Community))

export default function Home() {
    return (
        <>
            <Hero />
            <ProofStrip />
            <TheMeme />
            <ContractSection />
            <Community />
        </>
    )
}
