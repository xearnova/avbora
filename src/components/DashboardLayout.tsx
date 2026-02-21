import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, BarChart3, User, CreditCard, MessageSquare, LogOut, Menu, X, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useLanguage } from '../App';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const navItems = [
    { icon: LayoutDashboard, label: t.sidebar.overview, path: '/dashboard' },
    { icon: Store, label: t.sidebar.connect, path: '/dashboard/connect' },
    { icon: BarChart3, label: t.sidebar.stats, path: '/dashboard/stats' },
    { icon: Send, label: t.sidebar.reports, path: '/dashboard/reports' },
    { icon: CreditCard, label: t.sidebar.plans, path: '/dashboard/plans' },
    { icon: MessageSquare, label: t.sidebar.support, path: '/dashboard/support' },
    { icon: User, label: t.sidebar.account, path: '/dashboard/account' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={cn(
        "bg-brand-charcoal text-white transition-all duration-300 flex flex-col fixed md:relative z-50 h-full",
        isSidebarOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.362 9.354H12V.338L2.638 11.646H12v9.016l9.362-11.308z" />
              </svg>
              <span className="font-bold text-xl tracking-tighter">AVBORA</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 w-full rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="font-medium">{t.nav.logout}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="md:hidden mb-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm">
            <Menu size={20} />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};
