import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenCvModal?: () => void;
}

export default function Footer({ onOpenCvModal }: FooterProps) {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'International Scope', href: '#international-career' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education Point', href: '#education-point' },
    { name: 'Founder & Builder', href: '#founder' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Curriculum Vitae', href: '#cv' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Email Direct', href: `mailto:${PERSONAL_INFO.email}`, note: PERSONAL_INFO.email },
    { name: 'WhatsApp', href: PERSONAL_INFO.whatsappUrl, note: PERSONAL_INFO.phone },
    { name: 'Education Point Platform', href: PERSONAL_INFO.websiteUrl, note: 'educationpoint360.netlify.app' },
    { name: 'Portfolio Identity', href: PERSONAL_INFO.portfolioUrl, note: 'rizwanep.netlify.app' },
    { name: 'Instagram', href: PERSONAL_INFO.instagramUrl, note: PERSONAL_INFO.instagramHandle },
    { name: 'WhatsApp Channel', href: PERSONAL_INFO.whatsappChannelUrl, note: 'Official Announcements' },
  ];

  return (
    <footer
      id="main-footer"
      className={`pt-20 pb-14 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#08080B] text-[#F4F4F6] border-[#242432]'
          : 'bg-[#FFFFFF] text-[#18181B] border-[#E6E5DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b ${
          isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
        }`}>
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className={`w-11 h-11 rounded-2xl flex items-center justify-center font-serif text-lg font-bold shadow-xs ${
                isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
              }`}>
                MR
              </span>
              <div>
                <h3 className={`text-xl font-serif font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  {PERSONAL_INFO.name}
                </h3>
                <p className={`text-xs font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                  {PERSONAL_INFO.headline}
                </p>
              </div>
            </div>

            <p className={`text-sm max-w-sm leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              {PERSONAL_INFO.shortIntro}
            </p>

            <div className="pt-2">
              <p className="font-serif italic text-base text-emerald-500 font-semibold">
                «{PERSONAL_INFO.motto}»
              </p>
            </div>

            <div className={`flex items-center gap-2 text-xs font-mono pt-1 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors flex items-center justify-between group ${
                      isDark
                        ? 'text-[#A6A6B4] hover:text-[#F4F4F6]'
                        : 'text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Channels Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              Verified Channels & Platforms
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark
                        ? 'bg-[#121218] border-[#242432] hover:border-emerald-500/50 text-[#D0D0DA]'
                        : 'bg-[#F9F9F6] border-[#E6E5DC] hover:border-[#18181B] text-[#333338]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{link.name}</div>
                      <div className="text-[10px] opacity-60 truncate">{link.note}</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className={isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}>
            © 2026 Muhammad Rizwan. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              isDark
                ? 'border-[#353548] text-[#A6A6B4] hover:text-[#F4F4F6] hover:bg-[#1D1D26]'
                : 'border-[#D4D3C7] text-[#57575E] hover:text-[#18181B] hover:bg-[#EFEFE8]'
            }`}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
