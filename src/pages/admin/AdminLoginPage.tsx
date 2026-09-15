import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Lock, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin, isAuthenticated } = useContent();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const ok = await loginAdmin(username, password);
      if (ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071712] text-[#F7F3EA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#12352B]/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#0A211A] border border-[#D4AF6A]/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-[#D4AF6A] bg-[#12352B] flex items-center justify-center text-[#D4AF6A] font-serif text-2xl font-bold mx-auto mb-4">
            K
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF6A] uppercase tracking-widest font-semibold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Management Portal</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F7F3EA] uppercase font-medium">
            Kee Event & Garden
          </h1>
          <p className="text-xs text-[#F7F3EA]/60 font-sans mt-1">
            Sign in to manage venue content, media, and customer enquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#F7F3EA]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] transition-colors"
                placeholder="Admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium tracking-wider text-[#D4AF6A] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#F7F3EA]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#12352B]/60 border border-[#D4AF6A]/30 text-sm text-[#F7F3EA] focus:outline-none focus:border-[#D4AF6A] transition-colors"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF6A] to-[#E5C98A] text-[#0A211A] text-xs font-semibold tracking-[0.16em] uppercase hover:brightness-105 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-60"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#12352B] text-center space-y-2">
          <p className="text-[11px] text-[#F7F3EA]/40 font-sans">
            Default credentials: <code className="text-[#D4AF6A]">admin</code> /{' '}
            <code className="text-[#D4AF6A]">KeesAdmin2025!</code>
          </p>
          <a
            href="/"
            className="text-xs text-[#D4AF6A] hover:underline inline-block font-medium tracking-wider uppercase"
          >
            ← Back to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  );
};
