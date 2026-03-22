export function ChartEmbed() {
    return (
        <section className="relative py-12 lg:py-16" style={{ padding: '0 clamp(1.5rem, 5vw, 6rem) clamp(3rem, 8vw, 8rem)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 lg:mb-10">
                    <p className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
                        Live Chart
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                        Price <span className="text-[var(--color-accent)]">Action</span>
                    </h2>
                </div>

                <div id="dexscreener-embed" style={{ position: 'relative', width: '100%', paddingBottom: '78%' }}>
                    <style>{`@media(min-width:1200px){#dexscreener-embed{padding-bottom:42%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:90%;top:0;left:0;border:0;}`}</style>
                    <iframe
                        src="https://dexscreener.com/solana/8Ria12cUpYXAR42Lx4eGPrPFw9VRJ62y2pUpbdMkkWvP?embed=1&loadChartSettings=0&trades=0&tabs=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                        title="DexScreener chart embed"
                    />
                </div>
            </div>
        </section>
    )
}