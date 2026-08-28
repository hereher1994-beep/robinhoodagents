'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface AgentPnlChartProps {
  agentId: string;
  pnlValue: number;
}

// Deterministic mock chart data per agent — no Math.random()
const CHART_DATA: Record<string, { v: number }[]> = {
  'agent-001': [
    { v: 0 }, { v: 4.2 }, { v: 8.1 }, { v: 6.3 }, { v: 11.2 }, { v: 15.8 },
    { v: 13.1 }, { v: 18.4 }, { v: 20.1 }, { v: 17.9 }, { v: 22.3 }, { v: 24.5 },
  ],
  'agent-002': [
    { v: 0 }, { v: 1.1 }, { v: 2.8 }, { v: 4.1 }, { v: 3.5 }, { v: 5.9 },
    { v: 7.2 }, { v: 6.8 }, { v: 8.4 }, { v: 9.1 }, { v: 10.8 }, { v: 12.1 },
  ],
  'agent-003': [
    { v: 0 }, { v: 1.8 }, { v: 3.2 }, { v: 2.1 }, { v: 4.5 }, { v: 5.9 },
    { v: 5.2 }, { v: 6.8 }, { v: 7.4 }, { v: 6.9 }, { v: 7.8 }, { v: 8.7 },
  ],
};

const FALLBACK_DATA = [
  { v: 0 }, { v: 2 }, { v: 4 }, { v: 3 }, { v: 6 }, { v: 8 },
  { v: 7 }, { v: 9 }, { v: 11 }, { v: 10 }, { v: 12 }, { v: 14 },
];

export default function AgentPnlChart({ agentId, pnlValue }: AgentPnlChartProps) {
  const data = CHART_DATA[agentId] || FALLBACK_DATA;
  const isPositive = pnlValue >= 0;
  const color = isPositive ? 'var(--success)' : 'var(--destructive)';
  const gradientId = `pnl-grad-${agentId}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={false}
        />
        <Tooltip
          content={() => null}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}