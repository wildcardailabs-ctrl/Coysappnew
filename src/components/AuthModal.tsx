import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [tier, setTier] = useState('One Hotspur');
  const [homeStand, setHomeStand] = useState('South Stand (Single Tier)');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // Sync mode with context state when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password);
      } else {
        if (!displayName.trim()) {
          setError('Please enter your supporter name or nickname.');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password should be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        await signUpWithEmail(email.trim(), password, displayName.trim(), {
          membershipNumber: membershipNumber.trim(),
          tier,
          homeStand
        });
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Invalid email or password. Please double check.');
      } else if (code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no error message needed
      } else if (err?.code === 'auth/cancelled-popup-request') {
        // Ignored
      } else {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Spurs Navy Branding */}
        <div className="bg-[#0a2353] p-5 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl">⚪</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#4ea8de]">COYS Supporter Hub</span>
          </div>

          <h2 className="text-xl font-black mt-1">
            {mode === 'login' ? 'Sign in to My COYS' : 'Create Supporter Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login' 
              ? 'Access your saved away pubs, matchday stats, loyalty points, and badges.' 
              : 'Join the digital Tottenham Hotspur matchday community.'}
          </p>

          {/* Toggle Tabs */}
          <div className="flex rounded-xl bg-white/10 p-1 mt-4">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' 
                  ? 'bg-white text-[#0a2353] shadow-xs' 
                  : 'text-white hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-white text-[#0a2353] shadow-xs' 
                  : 'text-white hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Google 1-Click Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleSubmitting || isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-2xs hover:shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {googleSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0a2353]" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>{mode === 'login' ? 'Continue with Google' : 'Register with Google'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or with email</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Supporter Name / Handle
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. LilywhiteJack or SpursFan1882"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2353]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2353]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2353]"
                />
              </div>
            </div>

            {/* Extra profile fields for registration */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Membership Tier
                    </label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#0a2353]"
                    >
                      <option value="One Hotspur">One Hotspur</option>
                      <option value="One Hotspur+">One Hotspur+</option>
                      <option value="Season Ticket Holder">Season Ticket</option>
                      <option value="Junior Hotspur">Junior Hotspur</option>
                      <option value="International Member">International Fan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Home Stand
                    </label>
                    <select
                      value={homeStand}
                      onChange={(e) => setHomeStand(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#0a2353]"
                    >
                      <option value="South Stand (Single Tier)">South Stand</option>
                      <option value="East Stand">East Stand</option>
                      <option value="West Stand">West Stand</option>
                      <option value="North Stand">North Stand</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CRN / Membership # <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Ticket className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={membershipNumber}
                      onChange={(e) => setMembershipNumber(e.target.value)}
                      placeholder="e.g. 7482910"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2353]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting || googleSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#0a2353] hover:bg-[#07193b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-60 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-[#4ea8de]" />
              )}
              <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
            </button>
          </form>

          {/* Privacy footnote */}
          <div className="pt-2 text-center text-[11px] text-slate-400">
            Protected by Cloud Firestore. Your credentials are securely encrypted.
          </div>
        </div>
      </div>
    </div>
  );
};
