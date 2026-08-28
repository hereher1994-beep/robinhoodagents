'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import AnimatedGridBackground from './AnimatedGridBackground';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export default function AuthPageClient() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginForm>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const registerForm = useForm<RegisterForm>({
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: false },
  });

  const handleLogin = async (data: LoginForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    if (data.email === 'robin@robinhoodchain.io' && data.password === 'Agent2026!') {
      toast.success('Welcome back, Robin Hood!', { description: 'Redirecting to your agents...' });
      setTimeout(() => router.push('/agent-creation-configuration'), 800);
    } else {
      toast.error('Invalid credentials — use the demo accounts below to sign in');
      loginForm.setError('email', { message: ' ' });
      loginForm.setError('password', { message: 'Invalid email or password' });
    }
    setIsSubmitting(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    toast.success('Account created!', { description: 'Welcome to Robinhood Chain Agents.' });
    setTimeout(() => router.push('/agent-creation-configuration'), 800);
    setIsSubmitting(false);
  };

  const handleWalletConnect = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Wallet connected', { description: '0x1a2b...3c4d verified on Robinhood Chain' });
    setTimeout(() => router.push('/agent-creation-configuration'), 600);
    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth — connect your backend OAuth provider here');
  };

  const demoCredentials = [
    { role: 'Community Member', email: 'robin@robinhoodchain.io', password: 'Agent2026!' },
  ];

  const handleUseDemoCredential = (email: string, password: string) => {
    loginForm.setValue('email', email);
    loginForm.setValue('password', password);
    setActiveTab('login');
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-foreground placeholder-muted text-sm outline-none transition-all duration-200 input-enhanced";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <AnimatedGridBackground />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00c805 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.07] blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-[0.05] blur-[60px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">

        {/* ── BLINKING BETA DEMO CREDENTIALS BANNER ── */}
        <div className="mb-5 rounded-2xl overflow-hidden demo-blink-banner"
          style={{
            background: 'linear-gradient(135deg, rgba(0,200,5,0.12) 0%, rgba(0,168,4,0.08) 100%)',
            border: '1.5px solid rgba(0,200,5,0.45)',
            boxShadow: '0 0 24px rgba(0,200,5,0.2), inset 0 0 20px rgba(0,200,5,0.04)',
          }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5">
            {/* Left: badge + label */}
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase demo-badge-blink"
                style={{ background: 'rgba(0,200,5,0.25)', color: '#00c805', border: '1px solid rgba(0,200,5,0.5)' }}>
                🔑 Beta Demo
              </span>
              <p className="text-sm font-bold text-foreground">
                Login with demo credentials for beta testing
              </p>
            </div>

            {/* Right: credentials + use button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs font-mono text-primary font-semibold number-tabular">robin@robinhoodchain.io</p>
                <p className="text-xs font-mono text-muted number-tabular">Agent2026!</p>
              </div>
              <button
                type="button"
                onClick={() => handleUseDemoCredential('robin@robinhoodchain.io', 'Agent2026!')}
                className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #00c805, #00a804)',
                  color: '#000',
                  boxShadow: '0 0 16px rgba(0,200,5,0.4)',
                }}
              >
                Use Now →
              </button>
            </div>
          </div>
        </div>
        {/* ── END BANNER ── */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-border-bright overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)' }}>

          {/* LEFT PANEL — Branding */}
          <div className="relative hidden lg:flex flex-col justify-between p-10 border-r border-border overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(0,200,5,0.05) 0%, rgba(0,0,0,0) 50%, rgba(124,58,237,0.05) 100%)' }}>
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scan-line absolute inset-0 w-full h-32" />
            </div>

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, #00c805, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle at bottom left, #7c3aed, transparent 70%)' }} />

            {/* Logo */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <AppLogo size={42} />
                <div className="absolute inset-0 rounded-full blur-md opacity-50"
                  style={{ background: 'rgba(0,200,5,0.3)' }} />
              </div>
              <div>
                <p className="font-sans font-extrabold text-lg text-foreground leading-tight">RobinhoodAgents</p>
                <p className="text-xs text-primary font-semibold tracking-widest uppercase">AI-Native Layer 2</p>
              </div>
            </div>

            {/* Hero text */}
            <div className="space-y-7 relative z-10">
              <div>
                <h1 className="text-4xl font-extrabold leading-tight text-foreground mb-3">
                  Deploy AI Agents
                  <br />
                  <span className="text-gradient-green">Onchain.</span>
                </h1>
                <p className="text-muted text-sm leading-relaxed">
                  Create autonomous AI agents that trade, swap, lend, and transact with tokenized real-world assets on Robinhood Chain — the AI-native Layer 2 built for financial services.
                </p>
              </div>

              {/* Chain stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Agents', value: '12,847', icon: 'CpuChipIcon' },
                  { label: 'Total Volume', value: '$2.4B', icon: 'ChartBarIcon' },
                  { label: 'Active Now', value: '8,392', icon: 'BoltIcon' },
                  { label: 'Avg Return', value: '+18.3%', icon: 'ArrowTrendingUpIcon' },
                ].map((stat) => (
                  <div key={`stat-${stat.label}`} className="rounded-xl p-3 transition-all duration-200 hover:border-primary/30"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon name={stat.icon as 'CpuChipIcon'} size={12} className="text-primary" />
                      <span className="text-[10px] text-muted uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-lg font-extrabold text-foreground number-tabular">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Ecosystem badges */}
              <div>
                <p className="text-xs text-muted mb-2.5 uppercase tracking-wider font-medium">Ecosystem Partners</p>
                <div className="flex flex-wrap gap-2">
                  {['Arbitrum', 'Chainlink', 'Uniswap', 'Morpho', 'LayerZero', 'Alchemy'].map((p) => (
                    <span key={`eco-${p}`} className="px-2.5 py-1 rounded-full text-[11px] text-muted transition-colors hover:text-foreground"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom disclaimer */}
            <p className="text-[11px] text-muted-foreground leading-relaxed relative z-10">
              Built on Arbitrum Dedicated Blockchains. 100ms block times. ETH gas token. EVM compatible with Account Abstraction (ERC-4337).
            </p>
          </div>

          {/* RIGHT PANEL — Auth Form */}
          <div className="flex flex-col p-8 lg:p-10">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <AppLogo size={32} />
              <span className="font-bold text-base text-foreground">RobinhoodAgents</span>
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl p-1 mb-8 border border-border"
              style={{ background: 'rgba(0,0,0,0.3)' }}>
              {(['login', 'register'] as const).map((tab) => (
                <button
                  key={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-250 ${
                    activeTab === tab
                      ? 'text-black' :'text-muted hover:text-foreground'
                  }`}
                  style={activeTab === tab ? {
                    background: 'linear-gradient(135deg, #00c805, #00a804)',
                    boxShadow: '0 0 16px rgba(0,200,5,0.35)',
                  } : {}}
                >
                  {tab === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 animate-fade-in-scale">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Email Address</label>
                  <input
                    type="email"
                    placeholder="robin@robinhoodchain.io"
                    className={inputClass}
                    {...loginForm.register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {loginForm.formState.errors.email?.message && loginForm.formState.errors.email.message.trim() && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <Icon name="ExclamationCircleIcon" size={12} className="text-destructive" />
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your secure password"
                      className={`${inputClass} pr-11`}
                      {...loginForm.register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Minimum 6 characters' },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={17} />
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <Icon name="ExclamationCircleIcon" size={12} className="text-destructive" />
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border bg-input accent-primary"
                      {...loginForm.register('remember')}
                    />
                    <span className="text-sm text-muted">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none rounded-xl"
                  style={{ boxShadow: !isSubmitting ? '0 0 24px rgba(0,200,5,0.35)' : 'none' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="BoltIcon" size={16} className="text-black" />
                      <span>Sign In to Robinhood Chain</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted">or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleWalletConnect}
                    disabled={isSubmitting}
                    className="btn-secondary flex items-center justify-center gap-2 py-2.5 text-sm disabled:opacity-50 rounded-xl"
                  >
                    <span className="text-base">🦊</span>
                    <span>Connect Wallet</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting}
                    className="btn-secondary flex items-center justify-center gap-2 py-2.5 text-sm disabled:opacity-50 rounded-xl"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>
                </div>

                {/* Demo credentials box */}
                <div className="mt-2 rounded-xl p-3.5"
                  style={{ background: 'rgba(0,200,5,0.06)', border: '1px solid rgba(0,200,5,0.2)' }}>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Icon name="KeyIcon" size={12} className="text-primary" />
                    <p className="text-[11px] text-primary font-bold uppercase tracking-wider">Demo Credentials</p>
                  </div>
                  {demoCredentials.map((cred) => (
                    <div key={`cred-${cred.role}`} className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted font-mono truncate number-tabular">{cred.email}</p>
                        <p className="text-xs text-muted font-mono number-tabular">{cred.password}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUseDemoCredential(cred.email, cred.password)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg text-primary text-xs font-bold transition-all duration-200"
                        style={{ background: 'rgba(0,200,5,0.15)', border: '1px solid rgba(0,200,5,0.3)' }}
                      >
                        Use
                      </button>
                    </div>
                  ))}
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {activeTab === 'register' && (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4 animate-fade-in-scale">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Full Name</label>
                  <input
                    type="text"
                    placeholder="Robin Hood"
                    className={inputClass}
                    {...registerForm.register('fullName', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                  />
                  {registerForm.formState.errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{registerForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@robinhoodchain.io"
                    className={inputClass}
                    {...registerForm.register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min 8 characters"
                      className={`${inputClass} pr-11`}
                      {...registerForm.register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Minimum 8 characters' },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={17} />
                    </button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-xs text-destructive mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      className={`${inputClass} pr-11`}
                      {...registerForm.register('confirmPassword', {
                        required: 'Please confirm your password',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={17} />
                    </button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-border bg-input accent-primary"
                    {...registerForm.register('agreeTerms', { required: 'You must agree to the terms' })}
                  />
                  <span className="text-sm text-muted leading-snug">
                    I agree to the{' '}
                    <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
                  </span>
                </label>
                {registerForm.formState.errors.agreeTerms && (
                  <p className="text-xs text-destructive">{registerForm.formState.errors.agreeTerms.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none rounded-xl"
                  style={{ boxShadow: !isSubmitting ? '0 0 24px rgba(0,200,5,0.35)' : 'none' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="RocketLaunchIcon" size={16} className="text-black" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button
                  type="button"
                  onClick={handleWalletConnect}
                  disabled={isSubmitting}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-xl disabled:opacity-50"
                  style={{ border: '1px solid rgba(0,200,5,0.3)' }}
                >
                  <span className="text-base">🦊</span>
                  <span>Connect Wallet to Register</span>
                </button>
              </form>
            )}

            {/* Footer toggle */}
            <p className="text-center text-sm text-muted mt-6">
              {activeTab === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-primary font-bold hover:text-primary/80 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-primary font-bold hover:text-primary/80 transition-colors"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
          Powered by Robinhood Chain · AI-Native Layer 2 · Built on Arbitrum
          <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
        </p>
      </div>
    </div>
  );
}