import { ArrowUp, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Journey', href: '#journey' },
    { name: 'Education Point', href: '#education-point' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Interests', href: '#interests' },
    { name: 'Personality', href: '#personality' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'WhatsApp (+92 331 4220506)', href: PERSONAL_INFO.whatsappUrl },
    { name: 'Personal Instagram (@itx.wani1)', href: PERSONAL_INFO.personalInstagram },
    { name: 'Education Point Instagram', href: PERSONAL_INFO.epInstagram },
    { name: 'Facebook Profile', href: PERSONAL_INFO.facebookUrl },
    { name: 'YouTube Channel', href: PERSONAL_INFO.youtubeUrl },
    { name: 'EP WhatsApp Channel', href: PERSONAL_INFO.epWhatsappChannel },
    { name: 'Email (educationpoint0360@gmail.com)', href: `mailto:${PERSONAL_INFO.epEmail}` },
  ];

  return (
    <footer id="main-footer" className="bg-[#FFFFFF] pt-20 pb-14 text-[#18181B] border-t border-[#E6E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Brand & Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E6E5DC]">
          {/* Identity Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-lg font-bold">
                MR
              </span>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#18181B] tracking-tight">
                  MUHAMMAD RIZWAN
                </h3>
                <p className="text-xs font-mono text-[#57575E]">
                  {PERSONAL_INFO.title}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#57575E] max-w-sm leading-relaxed">
              Building purposeful digital experiences through web development, educational platforms, AI tools, and creative digital architecture.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#7E7E88]">
              <MapPin className="w-3.5 h-3.5 text-[#18181B]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            {/* Section 33: Brand Identity Statement Box */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F9F9F6] border border-[#E6E5DC] text-xs space-y-1">
              <div className="font-mono text-[10px] tracking-widest text-[#7E7E88] uppercase">
                BRAND STATEMENT // 2026
              </div>
              <div className="font-serif font-bold text-sm text-[#18181B]">
                MUHAMMAD RIZWAN
              </div>
              <div className="text-[#57575E]">
                Founder • Educationist • Digital Architect
              </div>
              <div className="text-[#7E7E88]">
                Mianwali, Pakistan
              </div>
              <div className="font-serif italic text-sm text-[#18181B] pt-1">
                «{PERSONAL_INFO.motto}»
              </div>
            </div>
          </div>

          {/* Navigation Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs font-medium text-[#57575E] hover:text-[#18181B] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase mb-4">
              PLATFORMS
            </h4>
            <ul className="space-y-2">
              {PROJECTS_DATA.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#57575E] hover:text-[#18181B] transition-colors"
                  >
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Social & Contact Links Column (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase mb-4">
              CONNECT & INITIATIVES
            </h4>
            <ul className="space-y-2.5">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#57575E] hover:text-[#18181B] transition-colors"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7E7E88]">
          <div>
            © 2026 Muhammad Rizwan. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Designed in Off-White & Charcoal</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#18181B] hover:text-[#57575E] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
