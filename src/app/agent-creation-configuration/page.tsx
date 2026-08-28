import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from './components/HeroSection';
import AgentBuilderWizard from './components/AgentBuilderWizard';
import MyAgentsSection from './components/MyAgentsSection';
import PlatformStatsBar from './components/PlatformStatsBar';
import FeaturesSection from './components/FeaturesSection';

export default function AgentCreationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar walletAddress="0x1a2b...3c4d" userName="Robin Hood" />

      {/* Page content starts below fixed navbar */}
      <main className="pt-16">
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, #00c805 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 opacity-6 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
          <div className="grid-bg-fine absolute inset-0 opacity-60" />
        </div>

        <div className="relative z-10">
          <HeroSection />
          <PlatformStatsBar />
          <AgentBuilderWizard />
          <MyAgentsSection />
          <FeaturesSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-20 py-8">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary pulse-green" />
            <span className="text-sm text-muted">Robinhood Chain · Mainnet · Block #4,892,341</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 RobinhoodAgents. Powered by Robinhood Chain L2.
          </p>
          <div className="flex items-center gap-4">
            {['Docs', 'Terms', 'Privacy', 'Discord']?.map((item) => (
              <span key={`footer-${item}`} className="text-xs text-muted hover:text-foreground cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}