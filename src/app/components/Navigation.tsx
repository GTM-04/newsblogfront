import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onNavigate: (view: 'home' | 'news' | 'video' | 'podcasts' | 'admin') => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'news' | 'video' | 'podcasts' | 'admin') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50">
      {/* Primary Navigation */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <span className="text-[#B8336A]">PULSE</span>
                  <span className="text-foreground"> & </span>
                  <span className="text-[#B8336A]">PASSION</span>
                </div>
              </button>
              
              {/* Desktop Primary Nav */}
              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => onNavigate('home')} className="text-sm hover:text-[#B8336A] transition-colors">Home</button>
                <button onClick={() => onNavigate('news')} className="text-sm hover:text-[#B8336A] transition-colors">News</button>
                <a href="#" className="text-sm hover:text-[#B8336A] transition-colors">Science & Health</a>
                <a href="#" className="text-sm hover:text-[#B8336A] transition-colors">Relationships</a>
                <a href="#" className="text-sm hover:text-[#B8336A] transition-colors">Culture</a>
                <button onClick={() => onNavigate('video')} className="text-sm hover:text-[#B8336A] transition-colors">Video</button>
              </div>
            </div>

            {/* Admin & Mobile menu button */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => onNavigate('admin')}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#B8336A] text-white text-sm font-semibold rounded hover:bg-[#9a2a58] transition-colors"
              >
                Admin Portal
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>

              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="md:hidden fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  
                  {/* Dropdown */}
                  <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <button 
                        onClick={() => handleNavigate('home')} 
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors"
                      >
                        Home
                      </button>
                      <button 
                        onClick={() => handleNavigate('news')} 
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors"
                      >
                        News
                      </button>
                      <button 
                        onClick={() => handleNavigate('video')} 
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors"
                      >
                        Video
                      </button>
                      <button 
                        onClick={() => handleNavigate('podcasts')} 
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors"
                      >
                        Podcasts
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => handleNavigate('admin')}
                        className="w-full text-left px-4 py-2.5 bg-[#B8336A] text-white text-sm font-semibold hover:bg-[#9a2a58] transition-colors mx-2 rounded"
                        style={{ width: 'calc(100% - 1rem)' }}
                      >
                        Admin Portal
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-[#f9f9f9]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-6 h-10 overflow-x-auto">
            <a href="#" className="text-xs uppercase tracking-wide hover:text-[#B8336A] transition-colors whitespace-nowrap">Sex Ed</a>
            <a href="#" className="text-xs uppercase tracking-wide hover:text-[#B8336A] transition-colors whitespace-nowrap">Mental Health</a>
            <a href="#" className="text-xs uppercase tracking-wide hover:text-[#B8336A] transition-colors whitespace-nowrap">Identity</a>
            <a href="#" className="text-xs uppercase tracking-wide hover:text-[#B8336A] transition-colors whitespace-nowrap">Research</a>
            <button onClick={() => onNavigate('podcasts')} className="text-xs uppercase tracking-wide hover:text-[#B8336A] transition-colors whitespace-nowrap">Podcasts</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
