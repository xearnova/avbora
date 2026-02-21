import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { cn } from './lib/utils';
import { translations } from './lib/i18n';
import { DashboardLayout } from './components/DashboardLayout';
import { Typewriter } from './components/Typewriter';
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Store, 
  Send,
  User as UserIcon,
  Mail,
  Lock,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- Context ---
const LanguageContext = createContext<{
  lang: 'en' | 'ar';
  setLang: (l: 'en' | 'ar') => void;
  t: any;
}>({ lang: 'en', setLang: () => {}, t: {} });

export const useLanguage = () => useContext(LanguageContext);

// --- Pages ---

const Footer = () => {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-brand-charcoal text-white py-12 border-t border-white/10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
            </svg>
            <span className="font-bold text-xl tracking-tighter">AVBORA</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
            <a href="https://wa.me/201515794174" target="_blank" className="hover:text-white transition-colors">{t.footer.contact}</a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AVBORA. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  const { t, lang, setLang } = useLanguage();
  return (
    <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
          </svg>
          <span className="font-bold text-xl md:text-2xl tracking-tighter">AVBORA</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <Link to="/login" className="font-medium hover:text-gray-600 transition-colors hidden sm:block">{t.nav.login}</Link>
          <Link to="/signup" className="bg-brand-charcoal text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-brand-dark transition-all text-sm md:text-base">
            {t.nav.signup}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-bold tracking-tight mb-8"
        >
          {t.landing.heroTitle} <Typewriter /> <br />
          {t.landing.heroSubTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
        >
          {t.landing.heroDesc}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <Link to="/signup" className="bg-brand-charcoal text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg flex items-center gap-2 hover:scale-105 transition-transform">
            {t.landing.cta} <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </Link>
        </motion.div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.landing.aboutTitle}</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              {t.landing.aboutDesc1}
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t.landing.aboutDesc2}
            </p>
          </div>
          <div className="bg-brand-charcoal aspect-video rounded-3xl flex items-center justify-center order-first md:order-none shadow-2xl">
            <svg viewBox="0 0 24 24" className="w-32 h-32 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:text-center md:mb-16">{t.landing.featuresTitle}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: BarChart3, title: t.landing.feature1Title, desc: t.landing.feature1Desc },
              { icon: Zap, title: t.landing.feature2Title, desc: t.landing.feature2Desc },
              { icon: ShieldCheck, title: t.landing.feature3Title, desc: t.landing.feature3Desc }
            ].map((f, i) => (
              <div key={i} className={cn("bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100", lang === 'ar' ? 'text-right' : 'text-left')}>
                <f.icon className={cn("mb-6 text-brand-charcoal", lang === 'ar' ? 'mr-0' : '')} size={32} />
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PrivacyPage = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="px-8 py-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
          </svg>
          <span className="font-bold text-2xl tracking-tighter">AVBORA</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-8 py-24">
        <h1 className="text-5xl font-bold mb-4">{t.privacy.title}</h1>
        <p className="text-gray-500 mb-12">{t.privacy.lastUpdated}</p>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          {t.privacy.content}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TermsPage = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="px-8 py-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
          </svg>
          <span className="font-bold text-2xl tracking-tighter">AVBORA</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-8 py-24">
        <h1 className="text-5xl font-bold mb-4">{t.terms.title}</h1>
        <p className="text-gray-500 mb-12">{t.terms.lastUpdated}</p>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          {t.terms.content}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const StatisticsPage = () => {
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: stores } = await supabase.from('stores').select('id').eq('user_id', user?.id);
      
      if (stores && stores.length > 0) {
        const storeIds = stores.map(s => s.id);
        const { data: events } = await supabase.from('customer_events').select('*').in('store_id', storeIds);
        
        // Group by type for a simple bar chart
        const grouped = (events || []).reduce((acc: any, curr: any) => {
          acc[curr.event_type] = (acc[curr.event_type] || 0) + 1;
          return acc;
        }, {});

        setStats(Object.entries(grouped).map(([name, value]) => ({ name, value })));
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold">{t.stats.title}</h1>
        <p className="text-gray-500">{t.stats.desc}</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className={cn("text-xl font-bold mb-8", lang === 'ar' ? 'text-right' : 'text-left')}>{t.stats.distribution}</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} orientation={lang === 'ar' ? 'right' : 'left'} />
              <Tooltip />
              <Bar dataKey="value" fill="#000" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ReportsPage = () => {
  const { t, lang } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: stores } = await supabase.from('stores').select('id').eq('user_id', user?.id);
      if (stores && stores.length > 0) {
        const { data } = await supabase.from('customer_events').select('*, stores(name)').in('store_id', stores.map(s => s.id)).order('created_at', { ascending: false });
        setEvents(data || []);
      }
    };
    fetchEvents();
  }, []);

  const downloadCSV = () => {
    const headers = [t.reports.table.store, t.reports.table.event, t.reports.table.customer, t.reports.table.date];
    const rows = events.map(e => [e.stores.name, e.event_type, e.customer_id, new Date(e.created_at).toLocaleString()]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avbora-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <header className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold">{t.reports.title}</h1>
          <p className="text-gray-500">{t.reports.desc}</p>
        </header>
        <button 
          onClick={downloadCSV}
          className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all w-full md:w-auto justify-center"
        >
          {t.reports.download}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className={cn("px-6 py-4 text-xs font-bold text-gray-400 uppercase", lang === 'ar' ? 'text-right' : 'text-left')}>{t.reports.table.store}</th>
              <th className={cn("px-6 py-4 text-xs font-bold text-gray-400 uppercase", lang === 'ar' ? 'text-right' : 'text-left')}>{t.reports.table.event}</th>
              <th className={cn("px-6 py-4 text-xs font-bold text-gray-400 uppercase", lang === 'ar' ? 'text-right' : 'text-left')}>{t.reports.table.customer}</th>
              <th className={cn("px-6 py-4 text-xs font-bold text-gray-400 uppercase", lang === 'ar' ? 'text-right' : 'text-left')}>{t.reports.table.date}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                <td className={cn("px-6 py-4 font-medium", lang === 'ar' ? 'text-right' : 'text-left')}>{event.stores?.name}</td>
                <td className={cn("px-6 py-4", lang === 'ar' ? 'text-right' : 'text-left')}>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-bold uppercase",
                    event.event_type === 'conversion' ? "bg-green-100 text-green-700" : 
                    event.event_type === 'abandoned_cart' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {event.event_type.replace('_', ' ')}
                  </span>
                </td>
                <td className={cn("px-6 py-4 text-gray-500 font-mono text-sm", lang === 'ar' ? 'text-right' : 'text-left')}>{event.customer_id || 'Anonymous'}</td>
                <td className={cn("px-6 py-4 text-gray-500", lang === 'ar' ? 'text-right' : 'text-left')}>{new Date(event.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AuthPage = ({ type }: { type: 'login' | 'signup' }) => {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('Check your email for verification!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
            </svg>
            <span className="font-bold text-2xl tracking-tighter">AVBORA</span>
          </Link>
          <h2 className="text-3xl font-bold">{type === 'login' ? t.auth.loginTitle : t.auth.signupTitle}</h2>
          <p className="text-gray-500 mt-2">{type === 'login' ? t.auth.loginDesc : t.auth.signupDesc}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-1">{t.auth.fullName}</label>
              <div className="relative">
                <UserIcon className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400", lang === 'ar' ? 'right-3' : 'left-3')} size={18} />
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={cn("w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none", lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4')}
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">{t.auth.email}</label>
            <div className="relative">
              <Mail className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400", lang === 'ar' ? 'right-3' : 'left-3')} size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn("w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none", lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4')}
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t.auth.password}</label>
            <div className="relative">
              <Lock className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400", lang === 'ar' ? 'right-3' : 'left-3')} size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn("w-full pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none", lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4')}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-brand-charcoal text-white py-3 rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : (type === 'login' ? t.auth.loginBtn : t.auth.signupBtn)}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          {type === 'login' ? t.auth.noAccount : t.auth.haveAccount} {' '}
          <Link to={type === 'login' ? '/signup' : '/login'} className="text-black font-bold hover:underline">
            {type === 'login' ? t.auth.signUp : t.auth.logIn}
          </Link>
        </p>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const { t, lang } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    visitors: 0,
    conversions: 0,
    abandoned: 0,
    rate: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Fetch real stats from customer_events
      const { data: stores } = await supabase.from('stores').select('id').eq('user_id', user?.id);
      if (stores && stores.length > 0) {
        const storeIds = stores.map(s => s.id);
        
        const { count: visitors } = await supabase.from('customer_events').select('*', { count: 'exact', head: true }).in('store_id', storeIds).eq('event_type', 'page_view');
        const { count: conversions } = await supabase.from('customer_events').select('*', { count: 'exact', head: true }).in('store_id', storeIds).eq('event_type', 'conversion');
        const { count: abandoned } = await supabase.from('customer_events').select('*', { count: 'exact', head: true }).in('store_id', storeIds).eq('event_type', 'abandoned_cart');

        setStats({
          visitors: visitors || 0,
          conversions: conversions || 0,
          abandoned: abandoned || 0,
          rate: visitors ? Number(((conversions || 0) / visitors * 100).toFixed(2)) : 0
        });
      }
    };
    fetchData();
  }, []);

  const chartData = [
    { name: 'Mon', visitors: 400, conversions: 240 },
    { name: 'Tue', visitors: 300, conversions: 139 },
    { name: 'Wed', visitors: 200, conversions: 980 },
    { name: 'Thu', visitors: 278, conversions: 390 },
    { name: 'Fri', visitors: 189, conversions: 480 },
    { name: 'Sat', visitors: 239, conversions: 380 },
    { name: 'Sun', visitors: 349, conversions: 430 },
  ];

  return (
    <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl md:text-3xl font-bold">{t.dashboard.welcome}, {user?.user_metadata?.full_name || 'User'}!</h1>
        <p className="text-gray-500">{t.dashboard.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: t.dashboard.totalVisitors, value: stats.visitors, color: 'bg-blue-500' },
          { label: t.dashboard.conversions, value: stats.conversions, color: 'bg-green-500' },
          { label: t.dashboard.abandoned, value: stats.abandoned, color: 'bg-red-500' },
          { label: t.dashboard.rate, value: `${stats.rate}%`, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-white p-6 rounded-2xl shadow-sm border border-gray-100", lang === 'ar' ? 'text-right' : 'text-left')}>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stat.value}</p>
            <div className={cn("h-1 w-12 mt-4 rounded-full", stat.color, lang === 'ar' ? 'mr-0' : '')} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className={cn("text-xl font-bold mb-6", lang === 'ar' ? 'text-right' : 'text-left')}>{t.dashboard.trends}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} orientation={lang === 'ar' ? 'right' : 'left'} />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className={cn("text-xl font-bold mb-6", lang === 'ar' ? 'text-right' : 'text-left')}>{t.dashboard.analysis}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} orientation={lang === 'ar' ? 'right' : 'left'} />
                <Tooltip />
                <Bar dataKey="conversions" fill="#000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoreConnection = () => {
  const { t, lang } = useLanguage();
  const [stores, setStores] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('stores').select('*').eq('user_id', user?.id);
    setStores(data || []);
  };

  useEffect(() => { fetchStores(); }, []);

  const handleAddStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('stores').insert([{ name, domain, user_id: user?.id }]);
    setName('');
    setDomain('');
    fetchStores();
    setLoading(false);
  };

  const getTrackingCode = (apiKey: string, storeId: string) => {
    return `<script>
const AVBORA_CONFIG = {
  apiKey: '${apiKey}',
  storeId: '${storeId}',
  apiUrl: 'https://qxudxkrghuvavdailsqk.supabase.co/rest/v1/customer_events'
};

async function avboraTrack(eventType, customerId = null, metadata = {}) {
  await fetch(AVBORA_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dWR4a3JnaHV2YXZkYWlsc3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODg1NzUsImV4cCI6MjA4NzI2NDU3NX0.KE5POwszW1qq9IRvs0aUAvxaZDw2KcvUquGMLuXDOdo',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dWR4a3JnaHV2YXZkYWlsc3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODg1NzUsImV4cCI6MjA4NzI2NDU3NX0.KE5POwszW1qq9IRvs0aUAvxaZDw2KcvUquGMLuXDOdo'
    },
    body: JSON.stringify({
      store_id: AVBORA_CONFIG.storeId,
      event_type: eventType,
      customer_id: customerId,
      page_url: window.location.href,
      referrer: document.referrer,
      device_info: {
        agent: navigator.userAgent,
        platform: navigator.platform
      },
      metadata: metadata
    })
  });
}

// Auto-track page view
avboraTrack('page_view');
</script>`;
  };

  return (
    <div className="max-w-4xl space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold">{t.connect.title}</h1>
        <p className="text-gray-500">{t.connect.desc}</p>
      </header>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleAddStore} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder={t.connect.storeName} 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input 
            type="text" 
            placeholder={t.connect.domain} 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button 
            disabled={loading}
            className="bg-brand-charcoal text-white rounded-xl font-bold hover:bg-brand-dark transition-all py-3"
          >
            {loading ? t.connect.adding : t.connect.addBtn}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className={cn("text-xl font-bold", lang === 'ar' ? 'text-right' : 'text-left')}>{t.connect.yourStores}</h3>
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">{store.name}</p>
                <p className="text-gray-500 text-sm">{store.domain}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                  <p className="text-xs text-gray-400 uppercase font-bold">{t.connect.trackingId}</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{store.api_key}</code>
                </div>
                <div className={cn("w-3 h-3 rounded-full", store.is_active ? "bg-green-500" : "bg-gray-300")} />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm font-bold mb-2">{t.connect.copyCode}</p>
              <p className="text-xs text-gray-500 mb-4">{t.connect.copyDesc}</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto font-mono">
                {getTrackingCode(store.api_key, store.id)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountPage = () => {
  const { t, lang, setLang } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-2xl space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold">{t.account.title}</h1>
        <p className="text-gray-500">{t.account.desc}</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className={cn("flex items-center gap-6", lang === 'ar' ? 'flex-row-reverse' : 'flex-row')}>
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold">
              {profile?.full_name?.[0]}
            </div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold">{profile?.full_name}</h3>
              <p className="text-gray-500">{profile?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <label className="text-xs font-bold text-gray-400 uppercase">{t.account.language}</label>
              <div className="mt-1">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full"
                >
                  {lang === 'en' ? 'English' : 'العربية'}
                </button>
              </div>
            </div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <label className="text-xs font-bold text-gray-400 uppercase">{t.account.plan}</label>
              <p className="font-medium capitalize">{profile?.current_plan}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className={cn("flex items-center justify-between", lang === 'ar' ? 'flex-row-reverse' : 'flex-row')}>
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h3 className="font-bold text-lg">{t.account.twoFactor}</h3>
            <p className="text-gray-500 text-sm">{t.account.twoFactorDesc}</p>
          </div>
          <button 
            onClick={() => setTwoFactor(!twoFactor)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              twoFactor ? "bg-green-500" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
              twoFactor ? (lang === 'ar' ? 'left-1' : 'right-1') : (lang === 'ar' ? 'right-1' : 'left-1')
            )} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PlansPage = () => {
  const { t, lang } = useLanguage();
  const plans = [
    { id: 'free', name: t.plans.free, price: '0', features: ['1,000 Visitors', '1 Store', 'Basic Analytics'] },
    { id: 'pro', name: t.plans.pro, price: '29', features: ['50,000 Visitors', '5 Stores', 'AI Insights', 'Priority Support'], popular: true },
    { id: 'enterprise', name: t.plans.enterprise, price: '99', features: ['Unlimited Visitors', 'Unlimited Stores', 'Custom Reports', 'Dedicated Manager'] },
  ];

  return (
    <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">{t.plans.title}</h1>
        <p className="text-gray-500 mt-2">{t.plans.desc}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={cn(
            "bg-white p-8 rounded-3xl shadow-sm border-2 transition-all hover:scale-105",
            plan.popular ? "border-black" : "border-gray-100"
          )}>
            {plan.popular && <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">{t.plans.popular}</span>}
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4 mb-8">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-500">{t.plans.monthly}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className={cn("flex items-center gap-2 text-gray-600", lang === 'ar' ? 'flex-row-reverse' : 'flex-row')}>
                  <CheckCircle2 size={18} className="text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-3 rounded-xl font-bold transition-all",
              plan.popular ? "bg-black text-white hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"
            )}>
              {t.plans.select}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SupportPage = () => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: session } = await supabase.from('chat_sessions').select('id').eq('user_id', user?.id).order('created_at', { ascending: false }).limit(1).single();
      
      if (session) {
        const { data: msgs } = await supabase.from('chat_messages').select('*').eq('session_id', session.id).order('created_at', { ascending: true });
        setMessages(msgs || []);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    let sessionId: string;

    const { data: session } = await supabase.from('chat_sessions').select('id').eq('user_id', user?.id).order('created_at', { ascending: false }).limit(1).single();
    
    if (!session) {
      const { data: newSession } = await supabase.from('chat_sessions').insert([{ user_id: user?.id }]).select().single();
      sessionId = newSession.id;
    } else {
      sessionId = session.id;
    }

    // Save user message
    await supabase.from('chat_messages').insert([{ session_id: sessionId, role: 'user', content: userMsg }]);
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    // Generate AI response
    try {
      const { generateSoloResponse } = await import('./lib/gemini');
      const aiResponse = await generateSoloResponse(userMsg, messages);
      
      await supabase.from('chat_messages').insert([{ session_id: sessionId, role: 'assistant', content: aiResponse }]);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

      if (aiResponse.toLowerCase().includes('whatsapp') || aiResponse.includes('201515794174')) {
        window.open('https://wa.me/201515794174', '_blank');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="p-6 border-bottom bg-gray-50 flex items-center justify-between">
        <div className={cn("flex items-center gap-4", lang === 'ar' ? 'flex-row-reverse' : 'flex-row')}>
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">S</div>
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h3 className="font-bold">{t.support.title}</h3>
            <p className="text-xs text-green-500 font-bold uppercase">{t.support.online}</p>
          </div>
        </div>
        <a href="https://wa.me/201515794174" target="_blank" className="flex items-center gap-2 text-sm font-bold hover:underline">
          {t.support.contact} <ExternalLink size={14} />
        </a>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.support.welcome}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "max-w-[80%] p-4 rounded-2xl",
            m.role === 'user' ? "bg-black text-white ml-auto rounded-tr-none" : "bg-white border border-gray-100 rounded-tl-none mr-auto"
          )}>
            {m.content}
          </div>
        ))}
        {loading && <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none w-16 flex justify-center"><Loader2 className="animate-spin" size={18} /></div>}
      </div>

      <form onSubmit={handleSend} className="p-6 border-t flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.support.placeholder}
          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black"
        />
        <button className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all">
          <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
        </button>
      </form>
    </div>
  );
};

// --- App Component ---

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'en' | 'ar'>('ar');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const t = translations[lang];

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={session ? <Navigate to="/dashboard" /> : <AuthPage type="login" />} />
          <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <AuthPage type="signup" />} />
          
          <Route path="/dashboard" element={session ? <DashboardLayout><DashboardOverview /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/connect" element={session ? <DashboardLayout><StoreConnection /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/stats" element={session ? <DashboardLayout><StatisticsPage /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/reports" element={session ? <DashboardLayout><ReportsPage /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/plans" element={session ? <DashboardLayout><PlansPage /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/support" element={session ? <DashboardLayout><SupportPage /></DashboardLayout> : <Navigate to="/login" />} />
          <Route path="/dashboard/account" element={session ? <DashboardLayout><AccountPage /></DashboardLayout> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}
