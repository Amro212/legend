import { Hero } from '@/components/Hero'
import { ProofStrip } from '@/components/ProofStrip'
import { TheMeme } from '@/components/TheMeme'
import { ContractSection } from '@/components/ContractSection'
import { Community } from '@/components/Community'

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
