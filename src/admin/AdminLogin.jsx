import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { storeConfig } from '../store.config';


export function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple client-side auth for demo purposes
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid access key');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050608] relative overflow-hidden font-sans selection:bg-brand-primary/30 selection:text-brand-accent">
            {/* Ambient Background - Deep & Premium */}
            <div className="absolute inset-0 bg-[#0B0C10]">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-primary/20 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-primary/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-up">

                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="w-36 h-36 mx-auto mb-6 relative group">
                        <div className="absolute inset-0 bg-brand-primary/30 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 rounded-full animate-spin-slow opacity-50"></div>
                        <img
                            src="/images/skardu_basket_logo.png"
                            alt="The Skardu Basket"
                            className="w-full h-full object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-300 mb-2 tracking-tight drop-shadow-sm">
                        Admin Portal
                    </h1>
                    <p className="text-brand-accent/80 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                        {storeConfig.name} Management
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-[#1F2833]/30 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group/card hover:border-white/15 transition-colors duration-500">

                    {/* Inner glowing border/highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 ml-1">
                                <Shield size={12} className="text-brand-primary" /> Secure Access Key
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-brand-accent transition-colors duration-300" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    className="block w-full pl-14 pr-6 py-5 bg-[#0B0C10]/50 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all font-sans tracking-widest text-lg shadow-inner focus:bg-[#0B0C10]/80 hover:border-white/10"
                                    placeholder="••••••••••••"
                                    autoFocus
                                />
                                {/* Detail: Corner accents */}
                                <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-white/20 rounded-tl-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-white/20 rounded-br-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 text-red-300 text-sm bg-red-500/10 p-4 rounded-2xl border border-red-500/20 animate-shake backdrop-blur-sm">
                                <AlertCircle size={18} className="shrink-0 text-red-500" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-brand-primary to-brand-dark hover:from-brand-primary/90 hover:to-brand-dark/90 text-white rounded-2xl font-bold uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-brand-primary/30 hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden border border-white/5"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Enter Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out blur-md"></div>
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Secured System • Authorized Personnel Only
                    </p>
                </div>
            </div>
        </div>
    );
}
