import { Menu } from 'lucide-react';

interface NavigationProps {
  onNavigate: (view: 'home' | 'news' | 'video' | 'podcasts') => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
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

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <Menu className="size-5" />
            </button>
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
