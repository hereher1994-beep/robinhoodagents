import React from 'react';
import Icon from '@/components/ui/AppIcon';

const FEATURES = [
  {
    id: 'feature-ai-trading',
    icon: 'CpuChipIcon',
    title: 'AI-Native Trading',
    description: 'Agents leverage on-chain AI models trained on Robinhood Chain market data to execute optimal trades with sub-second latency.',
    highlights: ['100ms block times', 'On-chain AI inference', 'MEV-resistant execution'],
    color: 'text-accent-blue',
    bgColor: 'rgba(59,130,246,0.1)',
    borderColor: 'rgba(59,130,246,0.2)',
    glowColor: 'rgba(59,130,246,0.15)',
    gradient: 'from-accent-blue/5 to-transparent',
  },
  {
    id: 'feature-rwa',
    icon: 'BuildingLibraryIcon',
    title: 'Real-World Assets',
    description: 'Trade tokenized equities, ETFs, and private credit directly onchain. NVDA, AAPL, GOOG, and 44+ more stock tokens available.',
    highlights: ['47 RWA tokens', 'Chainlink price feeds', 'Instant settlement'],
    color: 'text-primary',
    bgColor: 'rgba(0,200,5,0.1)',
    borderColor: 'rgba(0,200,5,0.2)',
    glowColor: 'rgba(0,200,5,0.15)',
    gradient: 'from-primary/5 to-transparent',
  },
  {
    id: 'feature-permissionless',
    icon: 'ShieldCheckIcon',
    title: 'Permissionless & Open',
    description: 'Deploy agents without intermediaries or platform lock-in. Your agent, your keys, your strategy — fully non-custodial.',
    highlights: ['Non-custodial', 'ERC-4337 AA', 'Open source'],
    color: 'text-accent',
    bgColor: 'rgba(124,58,237,0.1)',
    borderColor: 'rgba(124,58,237,0.2)',
    glowColor: 'rgba(124,58,237,0.15)',
    gradient: 'from-accent/5 to-transparent',
  },
] as const;

export default function FeaturesSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-4"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <Icon name="SparklesIcon" size={12} className="text-accent" />
          Platform Features
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Built for{' '}
          <span className="text-gradient-ai">Onchain Finance</span>
        </h2>
        <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
          Robinhood Chain is purpose-built for AI agents — every layer of the stack is optimized for autonomous onchain financial operations.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURES.map((feature, idx) => (
          <div
            key={feature.id}
            className="relative rounded-2xl p-6 agent-card-hover overflow-hidden animate-fade-in-up group"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${feature.borderColor}`,
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
              style={{ background: `radial-gradient(circle, ${feature.glowColor} 0%, transparent 70%)` }}
            />

            <div
              className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ background: feature.bgColor, border: `1px solid ${feature.borderColor}`, width: '52px', height: '52px' }}
            >
              <Icon name={feature.icon as 'CpuChipIcon'} size={24} className={feature.color} />
            </div>

            <h3 className="text-base font-extrabold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">{feature.description}</p>

            <div className="space-y-2">
              {feature.highlights.map((highlight) => (
                <div key={`highlight-${feature.id}-${highlight}`} className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={13} className={feature.color} />
                  <span className="text-xs text-muted">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ecosystem section */}
      <div className="mt-14 p-7 rounded-2xl text-center relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {/* Background shimmer */}
        <div className="absolute inset-0 shimmer pointer-events-none" />

        <p className="text-xs text-muted uppercase tracking-widest mb-5 font-semibold relative z-10">
          Powered by the Robinhood Chain Ecosystem
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
          {[
            { name: 'Arbitrum', role: 'L2 Infrastructure' },
            { name: 'Chainlink', role: 'Oracles' },
            { name: 'Uniswap', role: 'DEX' },
            { name: 'Morpho', role: 'Lending' },
            { name: 'LayerZero', role: 'Bridge' },
            { name: 'Alchemy', role: 'RPC' },
            { name: 'Paxos USDG', role: 'Stablecoin' },
            { name: 'Fireblocks', role: 'Custody' },
          ].map((partner) => (
            <div
              key={`partner-${partner.name}`}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-default"
            >
              <span className="text-sm font-bold text-foreground">{partner.name}</span>
              <span className="text-[10px] text-muted">{partner.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}