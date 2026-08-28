'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AgentPnlChart from './AgentPnlChart';
import { toast } from 'sonner';

type AgentStatus = 'active' | 'paused' | 'deploying';

interface MockAgent {
  id: string;
  name: string;
  type: string;
  typeIcon: string;
  status: AgentStatus;
  pnl: string;
  pnlValue: number;
  trades: number;
  aum: string;
  riskLevel: string;
  assets: string[];
  uptime: string;
  lastTrade: string;
  deployedAt: string;
  agentId: string;
}

const MOCK_AGENTS: MockAgent[] = [
  {
    id: 'agent-001',
    name: 'Alpha Trader',
    type: 'Trading Bot',
    typeIcon: 'ChartBarIcon',
    status: 'active',
    pnl: '+24.5%',
    pnlValue: 24.5,
    trades: 1847,
    aum: '$48,230',
    riskLevel: 'Aggressive',
    assets: ['NVDA', 'AAPL', 'ETH'],
    uptime: '99.8%',
    lastTrade: '2 min ago',
    deployedAt: 'Aug 1, 2026',
    agentId: '0xAG1a...8f23',
  },
  {
    id: 'agent-002',
    name: 'Yield Max',
    type: 'Yield Optimizer',
    typeIcon: 'ArrowTrendingUpIcon',
    status: 'active',
    pnl: '+12.1%',
    pnlValue: 12.1,
    trades: 423,
    aum: '$92,100',
    riskLevel: 'Balanced',
    assets: ['USDC', 'USDG', 'ETH'],
    uptime: '100%',
    lastTrade: '14 min ago',
    deployedAt: 'Jul 22, 2026',
    agentId: '0xAG4c...3b17',
  },
  {
    id: 'agent-003',
    name: 'RWA Scout',
    type: 'RWA Manager',
    typeIcon: 'BuildingLibraryIcon',
    status: 'paused',
    pnl: '+8.7%',
    pnlValue: 8.7,
    trades: 211,
    aum: '$31,500',
    riskLevel: 'Conservative',
    assets: ['GOOG', 'MSFT', 'AAPL'],
    uptime: '97.2%',
    lastTrade: '3 days ago',
    deployedAt: 'Jul 10, 2026',
    agentId: '0xAG9e...7d44',
  },
];

const STATUS_CONFIG: Record<AgentStatus, { label: string; color: string; bgColor: string; dotColor: string; borderColor: string }> = {
  active: { label: 'Active', color: 'text-success', bgColor: 'rgba(63,185,80,0.1)', dotColor: 'bg-success', borderColor: 'rgba(63,185,80,0.25)' },
  paused: { label: 'Paused', color: 'text-warning', bgColor: 'rgba(210,153,34,0.1)', dotColor: 'bg-warning', borderColor: 'rgba(210,153,34,0.25)' },
  deploying: { label: 'Deploying', color: 'text-accent-blue', bgColor: 'rgba(59,130,246,0.1)', dotColor: 'bg-accent-blue', borderColor: 'rgba(59,130,246,0.25)' },
};

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Trading Bot': { bg: 'rgba(59,130,246,0.1)', text: 'text-accent-blue', border: 'rgba(59,130,246,0.25)' },
  'Yield Optimizer': { bg: 'rgba(210,153,34,0.1)', text: 'text-warning', border: 'rgba(210,153,34,0.25)' },
  'RWA Manager': { bg: 'rgba(63,185,80,0.1)', text: 'text-success', border: 'rgba(63,185,80,0.25)' },
  'Lending Agent': { bg: 'rgba(124,58,237,0.1)', text: 'text-accent', border: 'rgba(124,58,237,0.25)' },
};

export default function MyAgentsSection() {
  const [agents, setAgents] = useState<MockAgent[]>(MOCK_AGENTS);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? { ...a, status: a.status === 'active' ? 'paused' : 'active' }
          : a
      )
    );
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      const newStatus = agent.status === 'active' ? 'paused' : 'active';
      toast.success(`${agent.name} ${newStatus === 'active' ? 'resumed' : 'paused'}`, {
        description: newStatus === 'active' ? 'Agent is now executing trades' : 'Agent paused — no new trades',
      });
    }
  };

  const handleDelete = (agentId: string) => {
    setDeletingId(agentId);
    const agent = agents.find((a) => a.id === agentId);
    setTimeout(() => {
      setAgents((prev) => prev.filter((a) => a.id !== agentId));
      setDeletingId(null);
      toast.success(`${agent?.name} deleted`, { description: 'Agent removed from Robinhood Chain' });
    }, 600);
  };

  const totalAUM = agents.reduce((sum, a) => {
    const val = parseFloat(a.aum.replace(/[$,]/g, ''));
    return sum + val;
  }, 0);

  return (
    <section className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-2xl font-extrabold text-foreground">My Agents</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold text-primary"
              style={{ background: 'rgba(0,200,5,0.12)', border: '1px solid rgba(0,200,5,0.25)' }}>
              {agents.length}
            </span>
          </div>
          <p className="text-sm text-muted">
            <span className="text-success font-semibold">{agents.filter((a) => a.status === 'active').length} active</span>
            {' · '}
            <span className="text-foreground font-medium">${(totalAUM / 1000).toFixed(1)}K</span> total AUM
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted"
            style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)' }}>
            <Icon name="ArrowPathIcon" size={12} className="text-success" />
            <span className="text-success font-medium">Live data</span>
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
          </div>
          <button className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg">
            <Icon name="FunnelIcon" size={13} />
            Filter
          </button>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-20 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(0,200,5,0.1)', border: '1px solid rgba(0,200,5,0.2)' }}>
            <Icon name="CpuChipIcon" size={28} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No agents deployed yet</h3>
          <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
            Use the Agent Builder above to create and deploy your first AI agent on Robinhood Chain.
          </p>
          <a href="#agent-builder" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl">
            <Icon name="PlusIcon" size={15} className="text-black" />
            Build Your First Agent
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {agents.map((agent, idx) => {
            const statusCfg = STATUS_CONFIG[agent.status];
            const typeCfg = TYPE_COLORS[agent.type] || TYPE_COLORS['Lending Agent'];
            const isDeleting = deletingId === agent.id;
            const isExpanded = expandedId === agent.id;

            return (
              <div
                key={agent.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-500 agent-card-hover animate-fade-in-up`}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  opacity: isDeleting ? 0 : 1,
                  transform: isDeleting ? 'scale(0.95)' : 'scale(1)',
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Card Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: typeCfg.bg, border: `1px solid ${typeCfg.border}` }}>
                        <Icon name={agent.typeIcon as 'ChartBarIcon'} size={19} className={typeCfg.text} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-foreground">{agent.name}</h3>
                        <p className="text-[11px] text-muted">{agent.type}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ background: statusCfg.bgColor, border: `1px solid ${statusCfg.borderColor}` }}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor} ${agent.status === 'active' ? 'pulse-dot' : ''}`} />
                      <span className={`text-[11px] font-bold ${statusCfg.color}`}>{statusCfg.label}</span>
                    </div>
                  </div>

                  {/* PnL Hero */}
                  <div className="rounded-xl p-3.5 mb-4"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted font-medium">All-time PnL</span>
                      <span className="text-[10px] text-muted font-mono number-tabular">{agent.agentId}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className={`text-2xl font-extrabold number-tabular ${agent.pnlValue >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {agent.pnl}
                        </span>
                        <p className="text-[10px] text-muted mt-0.5">{agent.aum} AUM</p>
                      </div>
                      <div className="h-10 w-28">
                        <AgentPnlChart agentId={agent.id} pnlValue={agent.pnlValue} />
                      </div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: 'AUM', value: agent.aum, icon: 'BanknotesIcon' },
                      { label: 'Trades', value: agent.trades.toLocaleString(), icon: 'ArrowsRightLeftIcon' },
                      { label: 'Uptime', value: agent.uptime, icon: 'SignalIcon' },
                    ].map((stat) => (
                      <div key={`agentstat-${agent.id}-${stat.label}`} className="text-center p-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <Icon name={stat.icon as 'BanknotesIcon'} size={12} className="text-muted mx-auto mb-0.5" />
                        <p className="text-xs font-bold text-foreground number-tabular">{stat.value}</p>
                        <p className="text-[10px] text-muted">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Asset tags */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {agent.assets.map((asset) => (
                      <span key={`agent-asset-${agent.id}-${asset}`} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-primary"
                        style={{ background: 'rgba(0,200,5,0.1)', border: '1px solid rgba(0,200,5,0.2)' }}>
                        {asset}
                      </span>
                    ))}
                    <span className="text-[10px] text-muted ml-auto">{agent.riskLevel}</span>
                  </div>

                  {/* Last trade info */}
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>Last trade: <span className="text-foreground font-medium">{agent.lastTrade}</span></span>
                    <span>Since {agent.deployedAt}</span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-border pt-4 animate-fade-in-up">
                    <div className="space-y-2 text-xs">
                      {[
                        { label: 'Network', value: 'Robinhood Chain Mainnet' },
                        { label: 'Contract', value: agent.agentId, isMono: true, isGreen: true },
                        { label: 'Rebalance', value: 'Daily' },
                        { label: 'Auto-execute', value: 'Enabled', isGreen: true },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between">
                          <span className="text-muted">{item.label}</span>
                          <span className={`${item.isGreen ? 'text-success' : 'text-foreground'} ${item.isMono ? 'font-mono text-primary number-tabular' : 'font-medium'}`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Actions */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-t border-border"
                  style={{ background: 'rgba(0,0,0,0.15)' }}>
                  <button
                    onClick={() => handleToggleStatus(agent.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{
                      background: agent.status === 'active' ? 'rgba(210,153,34,0.1)' : 'rgba(63,185,80,0.1)',
                      color: agent.status === 'active' ? '#d29922' : '#3fb950',
                      border: `1px solid ${agent.status === 'active' ? 'rgba(210,153,34,0.25)' : 'rgba(63,185,80,0.25)'}`,
                    }}
                  >
                    <Icon name={agent.status === 'active' ? 'PauseIcon' : 'PlayIcon'} size={12} />
                    {agent.status === 'active' ? 'Pause' : 'Resume'}
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : agent.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={12} />
                    {isExpanded ? 'Less' : 'Details'}
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon name="PencilSquareIcon" size={12} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="ml-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{ background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid rgba(248,81,73,0.2)' }}
                    title="Delete this agent"
                  >
                    <Icon name="TrashIcon" size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}