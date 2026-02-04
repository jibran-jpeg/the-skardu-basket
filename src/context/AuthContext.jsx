import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFetchingProfile = useRef(false);
    const lastUserId = useRef(null);

    // Listen for auth state changes
    useEffect(() => {
        // Check current session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await fetchUserProfile(session.user);
            }
            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth event:', event);

            // Only handle specific events to prevent unnecessary processing
            if (event === 'SIGNED_IN' && session?.user) {
                // Prevent duplicate profile fetches for the same user
                if (lastUserId.current !== session.user.id) {
                    await fetchUserProfile(session.user);
                }
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                lastUserId.current = null;
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
                // Don't fetch profile on token refresh if we already have this user
                if (!user || user.id !== session.user.id) {
                    await fetchUserProfile(session.user);
                }
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    // Fetch or create user profile
    const fetchUserProfile = async (authUser) => {
        // Prevent concurrent fetches
        if (isFetchingProfile.current) {
            console.log('Profile fetch already in progress, skipping...');
            return;
        }

        // If we already have this user's profile, skip
        if (lastUserId.current === authUser.id) {
            console.log('Profile already loaded for this user, skipping...');
            return;
        }

        isFetchingProfile.current = true;
        lastUserId.current = authUser.id;
        try {
            // First try to get existing profile
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // Profile doesn't exist, create one
                const newProfile = {
                    id: authUser.id,
                    name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'User',
                    phone: '',
                    avatar_url: authUser.user_metadata?.avatar_url || null
                };

                await supabase.from('profiles').insert([newProfile]);

                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: newProfile.name,
                    avatar: newProfile.avatar_url,
                    provider: authUser.app_metadata?.provider || 'email'
                });
            } else if (profile) {
                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: profile.name,
                    phone: profile.phone,
                    avatar: profile.avatar_url,
                    provider: authUser.app_metadata?.provider || 'email'
                });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            // Fallback to basic user info
            setUser({
                id: authUser.id,
                email: authUser.email,
                name: authUser.user_metadata?.full_name || 'User',
                provider: authUser.app_metadata?.provider || 'email'
            });
        } finally {
            isFetchingProfile.current = false;
        }
    };

    // Sign up with email/password
    const signUp = async (email, password, name) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign in with email/password
    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/profile`
                }
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Reset password
    const resetPassword = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Update profile
    const updateProfile = async (updates) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            setUser(prev => ({ ...prev, ...updates }));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Legacy login function for backward compatibility
    const login = (provider = 'email', userData = {}) => {
        if (provider === 'google') {
            signInWithGoogle();
        } else {
            // For mock/demo purposes, create a temporary user
            const mockUser = {
                id: 'demo_' + Math.random().toString(36).substr(2, 9),
                name: userData.name || 'Demo User',
                email: userData.email || 'demo@example.com',
                provider: provider
            };
            setUser(mockUser);
        }
    };

    // Legacy logout for backward compatibility
    const logout = () => {
        signOut();
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        updateProfile,
        // Legacy compatibility
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
