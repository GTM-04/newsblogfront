import { Mail, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-12">
      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Editorial Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Trust & Standards */}
          <div>
            <h3 className="font-semibold mb-4">Trust & Standards</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Fact-Checking Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Source Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corrections Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Safety</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Research Archive</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expert Directory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Glossary</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Informed</h3>
            <p className="text-sm text-gray-400 mb-4">
              Weekly research updates and insights delivered to your inbox
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#B8336A]"
              />
              <button className="px-4 py-2 bg-[#B8336A] hover:bg-[#9a2a58] transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-4 pt-8 border-t border-white/10 mb-8">
          <span className="text-sm text-gray-400">Follow us:</span>
          <div className="flex gap-3">
            <a href="#" className="hover:text-[#B8336A] transition-colors">
              <Twitter className="size-5" />
            </a>
            <a href="#" className="hover:text-[#B8336A] transition-colors">
              <Facebook className="size-5" />
            </a>
            <a href="#" className="hover:text-[#B8336A] transition-colors">
              <Instagram className="size-5" />
            </a>
            <a href="#" className="hover:text-[#B8336A] transition-colors">
              <Youtube className="size-5" />
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/5 border border-white/10 p-6 mb-8">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Our Standards
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Pulse & Passion</strong> adheres to the highest standards of journalistic integrity. 
            We are committed to accuracy, fairness, and transparency in all our reporting. Every article is fact-checked, 
            peer-reviewed where applicable, and clearly sourced. We maintain editorial independence and do not allow 
            commercial interests to influence our content.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-8 border-t border-white/10">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Advertising</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4">
          <p className="text-xs text-gray-400 text-center">
            © 2026 Pulse & Passion. All rights reserved. A research-driven sexual wellness newsroom.
          </p>
        </div>
      </div>
    </footer>
  );
}
