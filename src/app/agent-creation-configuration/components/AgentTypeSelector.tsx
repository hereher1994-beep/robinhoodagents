'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { AgentType } from './AgentBuilderWizard';

interface AgentTypeSelectorProps {
  selected: AgentType | null;
  onSelect: (type: AgentType) => void;
}

const AGENT_TYPES = [
  {
    id: 'trading-bot' as AgentType,
    label: 'Trading Bot',
    icon: 'ChartBarIcon',
    description: 'Executes buy/sell orders on tokenized stock tokens and crypto assets using AI-driven signals',
    features: ['Stock token trading', 'Technical analysis', 'Auto-rebalancing'],
    color: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10',
    borderColor: 'border-accent-blue/30',
    activeBorder: 'border-accent-blue',
    activeGlow: '0 0 24px rgba(59,130,246,0.25)',
    badge: 'Most Popular',
    badgeColor: 'text-accent-blue bg-accent-blue/15',
  },
  {
    id: 'lending-agent' as AgentType,
    label: 'Lending Agent',
    icon: 'BanknotesIcon',
    description: 'Manages collateral and lending positions on Morpho protocol to maximize yield from deposited assets',
    features: ['Morpho integration', 'Collateral management', 'Rate optimization'],
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30',
    activeBorder: 'border-accent',
    activeGlow: '0 0 24px rgba(124,58,237,0.25)',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'yield-optimizer' as AgentType,
    label: 'Yield Optimizer',
    icon: 'ArrowTrendingUpIcon',
    description: 'Automatically shifts capital between DeFi protocols to capture the highest risk-adjusted yield',
    features: ['Multi-protocol', 'Auto-compounding', 'Gas optimization'],
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    activeBorder: 'border-warning',
    activeGlow: '0 0 24px rgba(210,153,34,0.25)',
    badge: 'High Yield',
    badgeColor: 'text-warning bg-warning/15',
  },
  {
    id: 'rwa-manager' as AgentType,
    label: 'RWA Manager',
    icon: 'BuildingLibraryIcon',
    description: 'Manages a portfolio of tokenized real-world assets including equities, ETFs, and private credit',
    features: ['NVDA, AAPL, GOOG', 'ETF exposure', 'Portfolio rebalancing'],
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    activeBorder: 'border-success',
    activeGlow: '0 0 24px rgba(63,185,80,0.25)',
    badge: 'RWA Native',
    badgeColor: 'text-success bg-success/15',
  },
] as const;

export default function AgentTypeSelector({ selected, onSelect }: AgentTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {AGENT_TYPES.map((type, idx) => {
        const isSelected = selected === type.id;
        return (
          <button
            key={`agent-type-${type.id}`}
            type="button"
            onClick={() => onSelect(type.id)}
            className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 group animate-fade-in-scale`}
            style={{
              animationDelay: `${idx * 0.08}s`,
              borderColor: isSelected ? undefined : 'rgba(255,255,255,0.1)',
              background: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              boxShadow: isSelected ? type.activeGlow : 'none',
            }}
          >
            {/* Selected border override */}
            {isSelected && (
              <div className={`absolute inset-0 rounded-2xl border-2 ${type.activeBorder} pointer-events-none`} />
            )}

            {/* Hover shimmer */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer-green" />

            {/* Badge */}
            {type.badge && !isSelected && (
              <span className={`absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${type.badgeColor}`}>
                {type.badge}
              </span>
            )}

            {/* Selected checkmark */}
            {isSelected && (
              <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-fade-in-scale">
                <Icon name="CheckIcon" size={11} className="text-black" />
              </div>
            )}

            {/* Icon */}
            <div className={`w-11 h-11 rounded-xl ${type.bgColor} flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-110`}>
              <Icon name={type.icon as 'ChartBarIcon'} size={21} className={type.color} />
            </div>

            <h4 className="font-bold text-sm text-foreground mb-1.5">{type.label}</h4>
            <p className="text-xs text-muted leading-relaxed mb-3.5">{type.description}</p>

            <div className="space-y-1.5">
              {type.features.map((feature) => (
                <div key={`feature-${type.id}-${feature}`} className="flex items-center gap-1.5">
                  <Icon name="CheckCircleIcon" size={12} className={type.color} />
                  <span className="text-[11px] text-muted">{feature}</span>
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}