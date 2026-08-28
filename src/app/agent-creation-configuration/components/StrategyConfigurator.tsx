'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { AgentConfig, RiskLevel } from './AgentBuilderWizard';

interface StrategyConfiguratorProps {
  config: AgentConfig;
  onChange: (config: AgentConfig) => void;
}

const ASSET_OPTIONS = [
  { id: 'ETH', label: 'ETH', icon: '⬡', category: 'Crypto' },
  { id: 'USDC', label: 'USDC', icon: '◎', category: 'Stablecoin' },
  { id: 'USDG', label: 'USDG', icon: '◉', category: 'Stablecoin' },
  { id: 'NVDA', label: 'NVDA Token', icon: '▣', category: 'Stock Token' },
  { id: 'AAPL', label: 'AAPL Token', icon: '▣', category: 'Stock Token' },
  { id: 'GOOG', label: 'GOOG Token', icon: '▣', category: 'Stock Token' },
  { id: 'MSFT', label: 'MSFT Token', icon: '▣', category: 'Stock Token' },
  { id: 'DeFi', label: 'DeFi Index', icon: '◈', category: 'Index' },
] as const;

const RISK_OPTIONS: { id: RiskLevel; label: string; desc: string; color: string; bgColor: string; borderActive: string; icon: string }[] = [
  { id: 'low', label: 'Conservative', desc: 'Max 5% drawdown', color: 'text-success', bgColor: 'bg-success/10', borderActive: 'rgba(63,185,80,0.5)', icon: 'ShieldCheckIcon' },
  { id: 'medium', label: 'Balanced', desc: 'Max 15% drawdown', color: 'text-warning', bgColor: 'bg-warning/10', borderActive: 'rgba(210,153,34,0.5)', icon: 'ScaleIcon' },
  { id: 'high', label: 'Aggressive', desc: 'Max 40% drawdown', color: 'text-destructive', bgColor: 'bg-destructive/10', borderActive: 'rgba(248,81,73,0.5)', icon: 'FireIcon' },
];

export default function StrategyConfigurator({ config, onChange }: StrategyConfiguratorProps) {
  const toggleAsset = (assetId: string) => {
    const current = config.targetAssets;
    if (current.includes(assetId)) {
      if (current.length === 1) return;
      onChange({ ...config, targetAssets: current.filter((a) => a !== assetId) });
    } else {
      onChange({ ...config, targetAssets: [...current, assetId] });
    }
  };

  const positionPct = Number(config.maxPositionSize);

  return (
    <div className="space-y-7">

      {/* Risk Level */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-foreground mb-0.5">Risk Level</label>
          <p className="text-xs text-muted">Controls maximum position sizing and drawdown tolerance</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {RISK_OPTIONS.map((risk) => {
            const isActive = config.riskLevel === risk.id;
            return (
              <button
                key={`risk-${risk.id}`}
                type="button"
                onClick={() => onChange({ ...config, riskLevel: risk.id })}
                className={`p-3.5 rounded-xl border-2 text-left transition-all duration-250 group`}
                style={{
                  borderColor: isActive ? risk.borderActive : 'rgba(255,255,255,0.1)',
                  background: isActive ? `${risk.bgColor.replace('bg-', 'rgba(').replace('/10', ',0.1)')}` : 'rgba(255,255,255,0.03)',
                  boxShadow: isActive ? `0 0 16px ${risk.borderActive.replace('0.5', '0.2')}` : 'none',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name={risk.icon as 'ShieldCheckIcon'} size={13} className={isActive ? risk.color : 'text-muted'} />
                  <p className={`text-xs font-bold ${isActive ? risk.color : 'text-foreground'}`}>
                    {risk.label}
                  </p>
                </div>
                <p className="text-[10px] text-muted leading-tight">{risk.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Assets */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-foreground mb-0.5">Target Assets</label>
          <p className="text-xs text-muted">Select the assets your agent will trade and manage</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ASSET_OPTIONS.map((asset) => {
            const isSelected = config.targetAssets.includes(asset.id);
            return (
              <button
                key={`asset-${asset.id}`}
                type="button"
                onClick={() => toggleAsset(asset.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isSelected ? 'rgba(0,200,5,0.5)' : 'rgba(255,255,255,0.1)',
                  background: isSelected ? 'rgba(0,200,5,0.1)' : 'rgba(255,255,255,0.04)',
                  color: isSelected ? '#00c805' : '#8b949e',
                  boxShadow: isSelected ? '0 0 10px rgba(0,200,5,0.15)' : 'none',
                }}
              >
                <span className="text-sm">{asset.icon}</span>
                {asset.label}
                {isSelected && <Icon name="CheckIcon" size={10} className="text-primary" />}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">
          <span className="text-primary font-semibold">{config.targetAssets.length}</span> asset{config.targetAssets.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      {/* Max Position Size */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-foreground">Max Position Size</label>
        <p className="text-xs text-muted">Maximum % of portfolio allocated to a single position</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={config.maxPositionSize}
              onChange={(e) => onChange({ ...config, maxPositionSize: e.target.value })}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: 'var(--primary)' }}
            />
            {/* Track fill overlay */}
            <div
              className="absolute top-1/2 left-0 h-2 rounded-full pointer-events-none -translate-y-1/2 transition-all duration-150"
              style={{
                width: `${((positionPct - 1) / 49) * 100}%`,
                background: 'linear-gradient(90deg, #00c805, #00ff08)',
                boxShadow: '0 0 8px rgba(0,200,5,0.4)',
              }}
            />
          </div>
          <div className="w-16 text-center px-2 py-1 rounded-lg"
            style={{ background: 'rgba(0,200,5,0.1)', border: '1px solid rgba(0,200,5,0.25)' }}>
            <span className="text-lg font-extrabold text-primary number-tabular">{config.maxPositionSize}%</span>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-muted">
          <span>Conservative 1%</span>
          <span>Aggressive 50%</span>
        </div>
      </div>

      {/* Rebalance Frequency */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-foreground">Rebalance Frequency</label>
        <p className="text-xs text-muted">How often the agent reviews and rebalances the portfolio</p>
        <select
          value={config.rebalanceFrequency}
          onChange={(e) => onChange({ ...config, rebalanceFrequency: e.target.value })}
          className="w-full px-4 py-3 rounded-xl text-foreground text-sm outline-none transition-all duration-200 cursor-pointer input-enhanced"
        >
          <option value="hourly">Every Hour</option>
          <option value="4hours">Every 4 Hours</option>
          <option value="daily">Daily (Recommended)</option>
          <option value="weekly">Weekly</option>
          <option value="signal">On Signal Only</option>
        </select>
      </div>

      {/* Auto-execute Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <Icon name="BoltIcon" size={15} className="text-primary" />
            <p className="text-sm font-bold text-foreground">Auto-Execute Trades</p>
          </div>
          <p className="text-xs text-muted">Agent executes transactions autonomously without manual approval.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...config, autoExecute: !config.autoExecute })}
          className="relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 focus:outline-none"
          style={{
            background: config.autoExecute ? '#00c805' : 'rgba(255,255,255,0.15)',
            boxShadow: config.autoExecute ? '0 0 12px rgba(0,200,5,0.4)' : 'none',
          }}
          role="switch"
          aria-checked={config.autoExecute}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300"
            style={{ transform: config.autoExecute ? 'translateX(24px)' : 'translateX(2px)' }}
          />
        </button>
      </div>

      {/* Warning for auto-execute */}
      {config.autoExecute && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl animate-fade-in-scale"
          style={{ background: 'rgba(210,153,34,0.08)', border: '1px solid rgba(210,153,34,0.25)' }}>
          <Icon name="ExclamationTriangleIcon" size={15} className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-warning leading-relaxed">
            Auto-execute is enabled. Your agent will transact onchain autonomously. Ensure your risk parameters are correctly configured.
          </p>
        </div>
      )}
    </div>
  );
}