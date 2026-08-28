import React from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Total Agents Deployed', value: '12,847', icon: 'CpuChipIcon', change: '+342 today', positive: true },
  { label: 'Total Volume Processed', value: '$2.4B', icon: 'BanknotesIcon', change: '+$18.2M today', positive: true },
  { label: 'Active Agents', value: '8,392', icon: 'BoltIcon', change: '65.3% of total', positive: true },
  { label: 'Avg Agent Return', value: '+18.3%', icon: 'ArrowTrendingUpIcon', change: 'Past 30 days', positive: true },
  { label: 'RWA Assets Managed', value: '47 Tokens', icon: 'BuildingLibraryIcon', change: 'NVDA, AAPL, GOOG +44', positive: true },
];

export default function PlatformStatsBar() {
  return (
    <div className="relative border-y border-border overflow-hidden"
      style={{ background: 'rgba(0,200,5,0.03)', backdropFilter: 'blur(12px)' }}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-green pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={`pstat-${stat.label}`}
              className="flex items-center gap-3 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(0,200,5,0.1)',
                  border: '1px solid rgba(0,200,5,0.25)',
                  boxShadow: '0 0 12px rgba(0,200,5,0.1)',
                }}>
                <Icon name={stat.icon as 'CpuChipIcon'} size={16} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-extrabold text-foreground number-tabular stat-counter leading-tight">{stat.value}</p>
                <p className="text-[10px] text-muted truncate leading-tight">{stat.label}</p>
                <p className="text-[10px] text-success font-semibold">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}