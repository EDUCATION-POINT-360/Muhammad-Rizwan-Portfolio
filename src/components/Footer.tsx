import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../utils/audio';

interface FooterProps {
  onOpenCvModal?: () => void;
}

export default function Footer({ onOpenCvModal }: FooterProps) {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    soundFX.playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'International Scope', href: '#international-career' },
    { name: 'Projects', href: '#projects' },
    { name: 'Project Directory', href: '#project-directory' },
    { name: 'Education Point', href: '#education-point' },
    { name: 'Founder & Builder', href: '#founder' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Curriculum Vitae', href: '#cv' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Email Direct', href: `mailto:${PERSONAL_INFO.email}`, note: PERSONAL_INFO.email },
    { name: 'WhatsApp Direct', href: PERSONAL_INFO.whatsappUrl, note: PERSONAL_INFO.phoneInternational },
    { name: 'Education Point Platform', href: PERSONAL_INFO.websiteUrl, note: 'educationpoint360.netlify.app' },
    { name: 'Official Portfolio', href: PERSONAL_INFO.portfolioUrl, note: 'rizwanportfolio01.netlify.app (Canonical)' },
    { name: 'Previous Reference', href: PERSONAL_INFO.alternatePortfolioUrl, note: 'rizwanep.netlify.app' },
    { name: 'Personal Instagram', href: PERSONAL_INFO.personalInstagram, note: PERSONAL_INFO.personalInstagramHandle },
    { name: 'Facebook', href: PERSONAL_INFO.facebookUrl, note: 'Muhammad Rizwan' },
    { name: 'YouTube', href: PERSONAL_INFO.youtubeUrl, note: PERSONAL_INFO.youtubeHandle },
    { name: 'Education Point IG', href: PERSONAL_INFO.instagramUrl, note: PERSONAL_INFO.instagramHandle },
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
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b ${
            isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
          }`}
        >
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-serif text-lg font-bold shadow-xs ${
                  isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
                }`}
              >
                MR
              </span>
              <div>
                <h3
                  className={`text-xl font-serif font-bold tracking-tight ${
                    isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                  }`}
                >
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

            <div
              className={`flex items-center gap-2 text-xs font-mono pt-1 ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4
              className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}
            >
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => soundFX.playTick()}
                    className={`inline-flex items-center gap-1 transition-colors ${
                      isDark ? 'text-[#A6A6B4] hover:text-[#F4F4F6]' : 'text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4
              className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}
            >
              Connected Channels
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playTick()}
                    className={`group flex items-baseline justify-between transition-colors ${
                      isDark ? 'text-[#A6A6B4] hover:text-[#F4F4F6]' : 'text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    <span className="font-semibold flex items-center gap-1">
                      <span>{s.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                    <span className="opacity-60 text-[11px] truncate max-w-[160px] sm:max-w-[200px]">
                      {s.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick CV Modal Trigger */}
            {onOpenCvModal && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    soundFX.playChime();
                    onOpenCvModal();
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-mono font-semibold transition-all ${
                    isDark
                      ? 'bg-[#15151C] hover:bg-[#1E1E28] border-[#303042] text-[#F4F4F6]'
                      : 'bg-[#F9F9F6] hover:bg-[#EFEFE8] border-[#D4D3C7] text-[#18181B]'
                  }`}
                >
                  Open Official CV (PDF & Picture View)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-70">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Muhammad Rizwan. All Rights Reserved.</span>
            <span>•</span>
            <span>Founder &amp; Owner — Education Point</span>
            <span>•</span>
            <span>Mianwali, Pakistan</span>
            <span>•</span>
            <span className="text-[11px] opacity-80">Think Digital. Build Future.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
