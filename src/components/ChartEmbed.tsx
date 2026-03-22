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

                <div className="relative p-[1px] md:p-[2px] rounded-2xl mx-auto w-full z-10 bg-[var(--color-border)]">
                    {/* Base ambient static glow */}
                    <div className="absolute -inset-1 rounded-2xl bg-[var(--color-accent)] opacity-20 blur-xl z-0" />

                    {/* Sweeping rays container (clipped to rounded border) */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                        {/* Right Half */}
                        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
                            <div className="absolute top-[-50%] left-[-100%] w-[200%] h-[200%] ray-right" />
                        </div>
                        {/* Left Half */}
                        <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                            <div className="absolute top-[-50%] left-0 w-[200%] h-[200%] ray-left" />
                        </div>
                    </div>

                    <style>{`
                        @keyframes sweep-right-fill {
                            0%, 10% { transform: rotate(0deg); }
                            60%, 100% { transform: rotate(180deg); }
                        }
                        @keyframes sweep-left-fill {
                            0%, 10% { transform: rotate(0deg); }
                            60%, 100% { transform: rotate(-180deg); }
                        }
                        @keyframes ray-opacity-fill {
                            0%, 9% { opacity: 0; }
                            10%, 80% { opacity: 1; }
                            90%, 100% { opacity: 0; }
                        }
                        .ray-right {
                            background: conic-gradient(
                                from 0deg at 50% 50%,
                                transparent 0deg,
                                transparent 180deg,
                                rgba(201, 169, 110, 0.15) 180deg,
                                var(--color-accent) 340deg,
                                #ffe0a3 360deg
                            );
                            animation: sweep-right-fill 4s ease-in-out infinite, ray-opacity-fill 4s linear infinite;
                        }
                        .ray-left {
                            background: conic-gradient(
                                from 0deg at 50% 50%,
                                #ffe0a3 0deg,
                                var(--color-accent) 20deg,
                                rgba(201, 169, 110, 0.15) 180deg,
                                transparent 180deg,
                                transparent 360deg
                            );
                            animation: sweep-left-fill 4s ease-in-out infinite, ray-opacity-fill 4s linear infinite;
                        }
                    `}</style>
                    
                    {/* Inner content wrapper */}
                    <div className="relative z-10 bg-[var(--color-bg)] rounded-xl overflow-hidden w-full">
                        <div id="dexscreener-embed" style={{ position: 'relative', width: '100%', paddingBottom: '78%' }}>
                            <style>{`@media(min-width:1200px){#dexscreener-embed{padding-bottom:42%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:90%;top:0;left:0;border:0;}`}</style>
                            <iframe
                                src="https://dexscreener.com/solana/8Ria12cUpYXAR42Lx4eGPrPFw9VRJ62y2pUpbdMkkWvP?embed=1&loadChartSettings=0&trades=0&tabs=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                                title="DexScreener chart embed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}