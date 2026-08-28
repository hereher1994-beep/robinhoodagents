'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import AgentTypeSelector from './AgentTypeSelector';
import StrategyConfigurator from './StrategyConfigurator';
import DeploymentSummary from './DeploymentSummary';

export type AgentType = 'trading-bot' | 'lending-agent' | 'yield-optimizer' | 'rwa-manager';
export type RiskLevel = 'low' | 'medium' | 'high';

export type AgentConfig = {
  name: string;
  agentType: AgentType | null;
  riskLevel: RiskLevel;
  targetAssets: string[];
  autoExecute: boolean;
  maxPositionSize: string;
  rebalanceFrequency: string;
};

const STEPS = [
  { id: 1, label: 'Name Agent', icon: 'PencilSquareIcon', desc: 'Identity' },
  { id: 2, label: 'Choose Type', icon: 'CpuChipIcon', desc: 'Strategy' },
  { id: 3, label: 'Configure', icon: 'AdjustmentsHorizontalIcon', desc: 'Parameters' },
  { id: 4, label: 'Deploy', icon: 'RocketLaunchIcon', desc: 'Launch' },
] as const;

export default function AgentBuilderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const [config, setConfig] = useState<AgentConfig>({
    name: '',
    agentType: null,
    riskLevel: 'medium',
    targetAssets: ['ETH'],
    autoExecute: true,
    maxPositionSize: '10',
    rebalanceFrequency: 'daily',
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<{ agentName: string }>({
    defaultValues: { agentName: '' },
  });

  const agentName = watch('agentName');

  const handleNext = () => {
    if (currentStep === 1 && !agentName.trim()) return;
    if (currentStep === 2 && !config.agentType) {
      toast.error('Please select an agent type to continue');
      return;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    await new Promise((r) => setTimeout(r, 2400));
    setIsDeploying(false);
    setDeployed(true);
    toast.success(`Agent "${agentName || config.name}" deployed!`, {
      description: 'Your agent is now live on Robinhood Chain.',
    });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setDeployed(false);
    setConfig({
      name: '',
      agentType: null,
      riskLevel: 'medium',
      targetAssets: ['ETH'],
      autoExecute: true,
      maxPositionSize: '10',
      rebalanceFrequency: 'daily',
    });
  };

  return (
    <section id="agent-builder" className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-3"
            style={{ background: 'rgba(0,200,5,0.08)', border: '1px solid rgba(0,200,5,0.2)' }}>
            <Icon name="WrenchScrewdriverIcon" size={12} className="text-primary" />
            Agent Builder
          </div>
          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            Configure Your <span className="text-gradient-green">AI Agent</span>
          </h2>
          <p className="text-sm text-muted">Deploy your autonomous agent in 4 simple steps</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center mb-10">
          {STEPS.map((step, idx) => (
            <React.Fragment key={`step-${step.id}`}>
              <button
                onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
                className={`flex flex-col items-center gap-1.5 group flex-shrink-0 ${step.id < currentStep ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-400 ${
                  step.id === currentStep
                    ? 'border-primary bg-primary/15 glow-green scale-110'
                    : step.id < currentStep
                    ? 'border-primary bg-primary text-black shadow-[0_0_12px_rgba(0,200,5,0.4)]'
                    : 'border-border bg-card'
                }`}>
                  {step.id < currentStep ? (
                    <Icon name="CheckIcon" size={16} className="text-black" />
                  ) : (
                    <Icon name={step.icon} size={15} className={step.id === currentStep ? 'text-primary' : 'text-muted'} />
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-center">
                  <span className={`text-[10px] font-bold ${
                    step.id === currentStep ? 'text-primary' : step.id < currentStep ? 'text-success' : 'text-muted'
                  }`}>
                    {step.label}
                  </span>
                  <span className="text-[9px] text-muted/60">{step.desc}</span>
                </div>
              </button>

              {idx < STEPS.length - 1 && (
                <div className="flex-1 mx-2 relative h-0.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-full"
                    style={{
                      width: idx + 1 < currentStep ? '100%' : '0%',
                      background: 'linear-gradient(90deg, #00c805, #00ff08)',
                      boxShadow: idx + 1 < currentStep ? '0 0 8px rgba(0,200,5,0.6)' : 'none',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Wizard Card */}
        <div className="rounded-2xl border border-border-bright shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)' }}>
          {/* Step content */}
          <div className="p-7 md:p-9">

            {/* STEP 1: Name Your Agent */}
            {currentStep === 1 && (
              <div className="animate-fade-in-scale space-y-7">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Name Your Agent</h3>
                  </div>
                  <p className="text-sm text-muted ml-9">Give your AI agent a unique identity on Robinhood Chain</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">
                    Agent Name
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <p className="text-xs text-muted">Choose a memorable name — this will be your agent&apos;s onchain identity</p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Alpha Trader, Yield Max, RWA Scout..."
                      maxLength={32}
                      className="w-full px-4 py-3.5 rounded-xl text-foreground placeholder-muted text-sm outline-none transition-all duration-200 input-enhanced"
                      {...register('agentName', {
                        required: 'Agent name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' },
                        maxLength: { value: 32, message: 'Name cannot exceed 32 characters' },
                      })}
                    />
                    {agentName && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      </div>
                    )}
                  </div>
                  {errors.agentName && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <Icon name="ExclamationCircleIcon" size={12} className="text-destructive" />
                      {errors.agentName.message}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <span className={`text-xs number-tabular transition-colors ${agentName.length > 28 ? 'text-warning' : 'text-muted'}`}>
                      {agentName.length}/32
                    </span>
                  </div>
                </div>

                {/* Name suggestions */}
                <div>
                  <p className="text-xs text-muted mb-2.5 uppercase tracking-wider font-medium">Quick Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {['Alpha Trader', 'Yield Max', 'RWA Scout', 'DeFi Hawk', 'Momentum X', 'Stablecoin Guard'].map((name) => (
                      <button
                        key={`suggest-${name}`}
                        type="button"
                        onClick={() => {
                          const input = document.querySelector('input[name="agentName"]') as HTMLInputElement;
                          if (input) {
                            input.value = name;
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg text-sm text-muted transition-all duration-200 hover:text-primary"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,5,0.3)';
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,200,5,0.06)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Agent Type */}
            {currentStep === 2 && (
              <div className="animate-fade-in-scale space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Choose Agent Type</h3>
                  </div>
                  <p className="text-sm text-muted ml-9">Select the primary strategy your agent will execute onchain</p>
                </div>

                <AgentTypeSelector
                  selected={config.agentType}
                  onSelect={(type) => setConfig({ ...config, agentType: type })}
                />
              </div>
            )}

            {/* STEP 3: Configure Strategy */}
            {currentStep === 3 && (
              <div className="animate-fade-in-scale space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Configure Strategy</h3>
                  </div>
                  <p className="text-sm text-muted ml-9">Tune your agent&apos;s risk parameters and execution settings</p>
                </div>

                <StrategyConfigurator
                  config={config}
                  onChange={(updated) => setConfig(updated)}
                />
              </div>
            )}

            {/* STEP 4: Deploy */}
            {currentStep === 4 && (
              <div className="animate-fade-in-scale space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Deploy to Robinhood Chain</h3>
                  </div>
                  <p className="text-sm text-muted ml-9">Review your configuration and launch your agent onchain</p>
                </div>

                <DeploymentSummary
                  agentName={agentName}
                  config={config}
                  isDeploying={isDeploying}
                  deployed={deployed}
                  onDeploy={handleDeploy}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>

          {/* Navigation footer */}
          {!deployed && (
            <div className="flex items-center justify-between px-7 md:px-9 py-4 border-t border-border"
              style={{ background: 'rgba(0,0,0,0.2)' }}>
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed rounded-lg"
              >
                <Icon name="ChevronLeftIcon" size={14} />
                Back
              </button>

              <div className="flex items-center gap-1.5">
                {STEPS.map((step) => (
                  <div
                    key={`dot-${step.id}`}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: step.id === currentStep ? '20px' : '6px',
                      height: '6px',
                      background: step.id === currentStep
                        ? '#00c805'
                        : step.id < currentStep
                        ? 'rgba(0,200,5,0.5)'
                        : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-lg"
                >
                  Next
                  <Icon name="ChevronRightIcon" size={14} className="text-black" />
                </button>
              ) : (
                <div className="w-20" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}