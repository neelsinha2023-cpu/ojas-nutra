import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    line: string;
    city: string;
    state: string;
    pincode: string;
  };
  memberTier: 'Circle Patron' | 'Atelier Reserve' | 'Guest';
  joinedDate: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (email: string, name?: string) => Promise<boolean>;
  signUp: (email: string, name: string, phone?: string) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'ojasnutra_user_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default demo authenticated patron so user can immediately experience the account features
    return {
      id: 'usr_ojas_7781',
      name: 'Dr. Aarav Mehta',
      email: 'aarav.mehta@vitality.in',
      phone: '+91 98201 44521',
      address: {
        line: 'Flat 402, Lotus Grand, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
      },
      memberTier: 'Circle Patron',
      joinedDate: 'October 2025',
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Could not save user session:', e);
    }
  }, [user]);

  const signIn = async (email: string, name?: string): Promise<boolean> => {
    if (!email || !email.includes('@')) return false;
    const existingName = name || (email.split('@')[0].replace(/[._]/g, ' '));
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: existingName.charAt(0).toUpperCase() + existingName.slice(1),
      email,
      memberTier: 'Circle Patron',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
    setUser(newUser);
    return true;
  };

  const signUp = async (email: string, name: string, phone?: string): Promise<boolean> => {
    if (!email || !name) return false;
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      phone,
      memberTier: 'Circle Patron',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
    setUser(newUser);
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
