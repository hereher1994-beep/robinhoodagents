'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { AgentConfig } from './AgentBuilderWizard';

interface DeploymentSummaryProps {
  agentName: string;
  config: AgentConfig;
  isDeploying: boolean;
  deployed: boolean;
  onDeploy: () => void;
  onReset: () => void;
}

const AGENT_TYPE_LABELS: Record<string, string> = {
  'trading-bot': 'Trading Bot',
  'lending-agent': 'Lending Agent',
  'yield-optimizer': 'Yield Optimizer',
  'rwa-manager': 'RWA Manager',
};

const RISK_LABELS: Record<string, string> = {
  low: 'Conservative',
  medium: 'Balanced',
  high: 'Aggressive',
};

export default function DeploymentSummary({
  agentName,
  config,
  isDeploying,
  deployed,
  onDeploy,
  onReset,
}: DeploymentSummaryProps) {

  if (deployed) {
    return (
      <div className="text-center py-8 animate-fade-in-scale space-y-7">
        {/* Success icon with rings */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border border-primary/20 animate-[ping_2s_ease-in-out_infinite]" />
          <div className="absolute w-24 h-24 rounded-full border border-primary/30 animate-[ping_2s_ease-in-out_infinite_0.5s]" />
          <div className="w-20 h-20 rounded-full flex items-center justify-center glow-green-strong"
            style={{ background: 'linear-gradient(135deg, rgba(0,200,5,0.2), rgba(0,200,5,0.1))', border: '2px solid #00c805' }}>
            <Icon name="CheckIcon" size={36} className="text-primary" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-foreground mb-2">Agent Deployed! 🚀</h3>
          <p className="text-muted text-sm max-w-sm mx-auto">
            <span className="text-foreground font-semibold">{agentName || 'Your agent'}</span> is now live on Robinhood Chain and actively monitoring the market.
          </p>
        </div>

        <div className="rounded-xl border p-4 text-left space-y-2.5 max-w-sm mx-auto"
          style={{ background: 'rgba(0,200,5,0.05)', borderColor: 'rgba(0,200,5,0.2)' }}>
          {[
            { label: 'Status', value: 'Active', isStatus: true },
            { label: 'Network', value: 'Robinhood Chain', isStatus: false },
            { label: 'Block', value: '#4,892,341', isStatus: false },
            { label: 'Agent ID', value: '0xAG7f...2e91', isStatus: false, isMono: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted">{item.label}</span>
              {item.isStatus ? (
                <span className="flex items-center gap-1.5 text-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                  {item.value}
                </span>
              ) : (
                <span className={`text-foreground font-medium ${item.isMono ? 'font-mono text-primary text-xs number-tabular' : ''}`}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onReset}
            className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl"
          >
            <Icon name="PlusIcon" size={15} />
            Create Another
          </button>
          <button className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl glow-green">
            <Icon name="ChartBarIcon" size={15} className="text-black" />
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary card */}
      <div className="rounded-xl border p-5 space-y-3"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="ClipboardDocumentListIcon" size={15} className="text-primary" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Configuration Summary</h4>
        </div>

        {[
          { label: 'Agent Name', value: agentName || '—', icon: 'TagIcon' },
          { label: 'Agent Type', value: config.agentType ? AGENT_TYPE_LABELS[config.agentType] : '—', icon: 'CpuChipIcon' },
          { label: 'Risk Level', value: RISK_LABELS[config.riskLevel] || config.riskLevel, icon: 'ShieldExclamationIcon' },
          { label: 'Max Position Size', value: `${config.maxPositionSize}%`, icon: 'ScaleIcon' },
          { label: 'Rebalance Frequency', value: config.rebalanceFrequency, icon: 'ClockIcon' },
          { label: 'Auto-Execute', value: config.autoExecute ? 'Enabled' : 'Disabled', icon: 'BoltIcon' },
        ].map((item) => (
          <div key={`summary-${item.label}`} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
            <div className="flex items-center gap-2 text-muted">
              <Icon name={item.icon as 'TagIcon'} size={13} />
              {item.label}
            </div>
            <span className={`font-semibold ${item.label === 'Auto-Execute' && config.autoExecute ? 'text-primary' : 'text-foreground'}`}>
              {item.value}
            </span>
          </div>
        ))}

        {/* Target assets */}
        <div className="flex items-start justify-between text-sm pt-2">
          <div className="flex items-center gap-2 text-muted">
            <Icon name="CircleStackIcon" size={13} />
            Target Assets
          </div>
          <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
            {config.targetAssets.map((asset) => (
              <span key={`deploy-asset-${asset}`} className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-primary"
                style={{ background: 'rgba(0,200,5,0.12)', border: '1px solid rgba(0,200,5,0.25)' }}>
                {asset}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Network info */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(0,200,5,0.1)', border: '1px solid rgba(0,200,5,0.2)' }}>
          <Icon name="GlobeAltIcon" size={17} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground">Deploying to Robinhood Chain</p>
          <p className="text-[11px] text-muted">Arbitrum L2 · EVM Compatible · Gas: ~$0.002</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
          <span className="text-xs text-success font-medium">Mainnet Live</span>
        </div>
      </div>

      {/* Deploy button */}
      <button
        onClick={onDeploy}
        disabled={isDeploying || !agentName || !config.agentType}
        className="btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-xl"
        style={{ boxShadow: (!isDeploying && agentName && config.agentType) ? '0 0 32px rgba(0,200,5,0.4), 0 8px 24px rgba(0,200,5,0.15)' : 'none' }}
      >
        {isDeploying ? (
          <>
            <div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
            <span>Deploying to Robinhood Chain...</span>
          </>
        ) : (
          <>
            <Icon name="RocketLaunchIcon" size={19} className="text-black" />
            <span>Deploy to Robinhood Chain</span>
            <Icon name="ArrowRightIcon" size={16} className="text-black" />
          </>
        )}
      </button>

      {(!agentName || !config.agentType) && (
        <p className="text-center text-xs text-warning flex items-center justify-center gap-1.5">
          <Icon name="ExclamationTriangleIcon" size={12} className="text-warning" />
          Complete all steps before deploying
        </p>
      )}
    </div>
  );
}