import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export function SignUp() {
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Basic validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        const result = await signUp(email, password, name);

        if (result.success) {
            setSuccess(true);
            // Some Supabase setups require email confirmation
            // If auto-confirmed, redirect to profile
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } else {
            setError(result.error || 'Failed to create account');
        }
        setIsLoading(false);
    };

    const handleGoogleSignUp = async () => {
        setError('');
        setIsLoading(true);
        const result = await signInWithGoogle();
        if (!result.success) {
            setError(result.error || 'Google sign up failed');
            setIsLoading(false);
        }
        // If success, user will be redirected by OAuth
    };

    return (
        <div className="min-h-screen pt-32 pb-12 flex items-center justify-center px-4">
            <div className="max-w-md w-full glass-panel p-8 md:p-10 space-y-8 animate-fade-in-up">
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-primary dark:text-white mb-2">Create Account</h2>
                    <p className="text-gray-500 dark:text-gray-400">Join our community of organic lovers</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-sm">
                        <CheckCircle size={18} />
                        <span>Account created! Redirecting to your profile...</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="space-y-4">
                    {/* Google Sign Up Button */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={isLoading || success}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">Continue with Google</span>
                    </button>

                    <button
                        onClick={handleGoogleSignUp}
                        disabled={isLoading || success}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.95 1.86.11 3.08.92 3.81 1.96-3.23 1.88-2.66 6.34 1.17 7.72-.64 1.76-1.57 3.5-3.71 3.5zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <span className="font-medium">Continue with Apple</span>
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-[#1F2833] text-gray-500">Or sign up with email</span>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleSignUp}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all dark:text-white"
                                required
                                disabled={isLoading || success}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all dark:text-white"
                                required
                                disabled={isLoading || success}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="Create a password (min 6 chars)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all dark:text-white"
                                required
                                minLength={6}
                                disabled={isLoading || success}
                            />
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <input type="checkbox" className="w-4 h-4 mr-2 rounded border-gray-300 text-brand-accent focus:ring-brand-accent" required />
                        <span>I agree to the <a href="/terms-of-service" className="text-brand-accent hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-brand-accent hover:underline">Privacy Policy</a></span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || success}
                        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : success ? (
                            <>
                                <CheckCircle size={18} />
                                <span>Account Created!</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-brand-primary dark:text-white font-bold hover:underline">
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
}
