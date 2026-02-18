import { FileText, LayoutDashboard, LogOut, Mic, Video } from 'lucide-react';
import { useState } from 'react';
import { logout } from '../../../api/auth';
import { Button } from '../ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'create-article' | 'create-podcast' | 'create-video' | 'edit-article' | 'edit-podcast';
  onNavigate: (view: 'dashboard' | 'create-article' | 'create-podcast' | 'create-video' | 'edit-article' | 'edit-podcast') => void;
}

export function AdminLayout({ children, currentView, onNavigate }: AdminLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-article', label: 'New Article', icon: FileText },
    { id: 'create-podcast', label: 'New Podcast', icon: Mic },
    { id: 'create-video', label: 'New Video', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <span className="text-[#B8336A]">PULSE</span>
              <span className="text-foreground"> & </span>
              <span className="text-[#B8336A]">PASSION</span>
              <span className="ml-2 text-sm text-muted-foreground">Admin</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-border min-h-[calc(100vh-4rem)] p-6">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#B8336A] text-white'
                      : 'hover:bg-gray-100 text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Menu */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-40">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-[#B8336A]' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label.replace('New ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
