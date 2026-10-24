import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  auth,
  FirestoreUserProfile, 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail, 
  logoutUser, 
  onAuthStateChange,
  updateUserProfileDoc,
  getOrCreateUserProfile
} from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userProfile: FirestoreUserProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string, extra?: { membershipNumber?: string; tier?: string; homeStand?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<FirestoreUserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FirestoreUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user, profile) => {
      setCurrentUser(user);
      setUserProfile(profile);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { user, profile } = await loginWithGoogle();
      setCurrentUser(user);
      setUserProfile(profile);
      setIsAuthModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const { user, profile } = await loginWithEmail(email, pass);
      setCurrentUser(user);
      setUserProfile(profile);
      setIsAuthModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string, 
    pass: string, 
    name: string,
    extra?: { membershipNumber?: string; tier?: string; homeStand?: string }
  ) => {
    setLoading(true);
    try {
      const { user, profile } = await registerWithEmail(email, pass, name, extra);
      setCurrentUser(user);
      setUserProfile(profile);
      setIsAuthModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<FirestoreUserProfile>) => {
    if (!currentUser) return;
    await updateUserProfileDoc(currentUser.uid, data);
    setUserProfile(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
