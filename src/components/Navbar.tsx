'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface NavbarProps {
  walletAddress?: string;
  userName?: string;
}

export default function Navbar({ walletAddress = '0x1a2b...3c4d', userName = 'Robin Hood' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: 'HomeIcon' },
    { label: 'My Agents', href: '/agent-creation-configuration', icon: 'CpuChipIcon' },
    { label: 'Marketplace', href: '#', icon: 'ShoppingBagIcon' },
    { label: 'Docs', href: '#', icon: 'DocumentTextIcon' },
  ] as const;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-glass-dark shadow-[0_4px_32px_rgba(0,0,0,0.5)] border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <AppLogo size={34} />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-200">
                RobinhoodAgents
              </span>
              <span className="text-[10px] text-primary/70 leading-tight tracking-widest uppercase font-medium">
                AI-Native L2
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={`nav-${link.label}`}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon name={link.icon} size={14} variant="outline" className={isActive ? 'text-primary' : ''} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Network indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted"
              style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
              <span className="text-success font-medium">Mainnet</span>
            </div>

            {/* Wallet Address */}
            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 group"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,200,5,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            >
              <span className="w-2 h-2 rounded-full bg-primary pulse-green flex-shrink-0" />
              <span className="font-mono text-xs text-muted group-hover:text-foreground transition-colors number-tabular">
                {walletAddress}
              </span>
              <Icon
                name={copied ? 'CheckIcon' : 'ClipboardIcon'}
                size={12}
                className={copied ? 'text-primary' : 'text-muted'}
              />
            </button>

            {/* New Agent Button */}
            <Link
              href="/agent-creation-configuration"
              className="btn-primary flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg"
            >
              <Icon name="PlusIcon" size={14} variant="outline" className="text-black" />
              <span>New Agent</span>
            </Link>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #00c805 0%, #7c3aed 100%)' }}>
                  RH
                </div>
                <Icon
                  name="ChevronDownIcon"
                  size={13}
                  className={`text-muted transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border-bright shadow-[0_16px_48px_rgba(0,0,0,0.6)] animate-fade-in-scale overflow-hidden"
                  style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(24px)' }}>
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{userName}</p>
                    <p className="text-xs text-muted font-mono number-tabular mt-0.5">{walletAddress}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                      <span className="text-[11px] text-success font-medium">Connected to Robinhood Chain</span>
                    </div>
                  </div>
                  {[
                    { label: 'Profile', icon: 'UserIcon' },
                    { label: 'Settings', icon: 'Cog6ToothIcon' },
                    { label: 'Sign Out', icon: 'ArrowRightOnRectangleIcon' },
                  ].map((item) => (
                    <button
                      key={`menu-${item.label}`}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-foreground hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon name={item.icon as 'UserIcon'} size={14} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border animate-fade-in-up"
          style={{ background: 'rgba(7,11,15,0.97)', backdropFilter: 'blur(24px)' }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={`mobile-nav-${link.label}`}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-primary bg-primary/10' : 'text-muted hover:text-foreground hover:bg-white/5'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon name={link.icon} size={16} className={isActive ? 'text-primary' : ''} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border">
              <Link
                href="/agent-creation-configuration"
                className="btn-primary flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="PlusIcon" size={15} className="text-black" />
                New Agent
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}