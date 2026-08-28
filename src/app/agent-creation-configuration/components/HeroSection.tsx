import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 pt-20 pb-12 text-center relative">
      {/* Ambient glow orbs */}
      <div
        className="hero-glow-orb w-[500px] h-[500px] opacity-[0.07] -top-32 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #00c805 0%, transparent 70%)' }}
      />
      <div
        className="hero-glow-orb w-72 h-72 opacity-[0.05] top-10 left-10"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', animationDelay: '3s' }}
      />
      <div
        className="hero-glow-orb w-64 h-64 opacity-[0.05] top-10 right-10"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animationDelay: '5s' }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7 animate-fade-in-scale"
        style={{ background: 'rgba(0,200,5,0.08)', borderColor: 'rgba(0,200,5,0.25)', boxShadow: '0 0 20px rgba(0,200,5,0.1)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Robinhood Chain · AI-Native Layer 2 · Now Live
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] mb-6 max-w-5xl mx-auto animate-fade-in-up delay-100">
        Create Your{' '}
        <span className="text-gradient-green relative">
          Robinhood Chain
        </span>
        <br />
        <span className="text-gradient-ai">AI Agent</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
        Deploy autonomous AI agents that trade, swap, lend, and transact with tokenized real-world assets — NVIDIA, Apple, Google, and more — directly onchain with zero intermediaries.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
        <a
          href="#agent-builder"
          className="btn-primary flex items-center gap-2.5 px-9 py-4 text-base font-bold glow-green rounded-xl"
        >
          <Icon name="BoltIcon" size={19} className="text-black" />
          Build Your Agent
          <Icon name="ArrowRightIcon" size={16} className="text-black" />
        </a>
        <Link
          href="#"
          className="btn-secondary flex items-center gap-2.5 px-9 py-4 text-base font-medium rounded-xl"
        >
          <Icon name="PlayCircleIcon" size={19} className="text-primary" />
          Watch Demo
        </Link>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-12 animate-fade-in-up delay-400">
        {[
          { icon: 'ShieldCheckIcon', label: 'Permissionless & Open' },
          { icon: 'BoltIcon', label: '100ms Block Times' },
          { icon: 'CpuChipIcon', label: 'AI-Native Architecture' },
          { icon: 'GlobeAltIcon', label: 'EVM Compatible' },
          { icon: 'LockClosedIcon', label: 'Non-Custodial' },
        ].map((item) => (
          <div
            key={`trust-${item.label}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-muted transition-all duration-200 hover:text-foreground"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Icon name={item.icon as 'ShieldCheckIcon'} size={13} className="text-primary" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-2 mt-14 animate-fade-in-up delay-500">
        <span className="text-xs text-muted uppercase tracking-widest">Scroll to build</span>
        <div className="w-5 h-8 rounded-full border border-border-bright flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary float-anim" />
        </div>
      </div>
    </section>
  );
}