import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MessageSquare,
  Instagram,
  Mail,
  ArrowUpRight,
  Phone,
  Send,
  MapPin,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Globe,
  Radio,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function ContactSection() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isDark } = useTheme();

  const handleCopyPhone = () => {
    soundFX.playTick();
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    soundFX.playTick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playChime();
    setSubmitted(true);

    const subject = encodeURIComponent(formSubject.trim() || `Inquiry from ${formName || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    );
    // Open email client with pre-filled content
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Muhammad Rizwan, I came across your portfolio (rizwanep.netlify.app) and would like to discuss a project or collaboration!`
    );
    return `https://wa.me/923314220506?text=${text}`;
  };

  return (
    <section
      id="contact"
      className={`py-24 sm:py-36 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B0B0E] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            09. Direct Contact & Collaboration
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                CONTACT & INITIATIVES
              </h2>
              <h3 className={`text-4xl sm:text-6xl font-serif tracking-tight leading-[1.02] ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                Let's Build Something Meaningful
              </h3>

              <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-lg ${
                isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
              }`}>
                “I'm open to connecting with international teams, organizations, startups, clients and technology communities working on meaningful digital products.”
              </p>
            </div>

            {/* Direct Coordinates Card */}
            <div className={`p-8 rounded-3xl border shadow-sm ${
              isDark
                ? 'bg-[#14141B] border-[#242432]'
                : 'bg-[#F9F9F6] border-[#E6E5DC]'
            }`}>
              <div className="flex items-center justify-between pb-6 border-b border-current/10">
                <div>
                  <h4 className={`text-xl font-serif font-bold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    {PERSONAL_INFO.headline}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>

              {/* Verified Contact Points */}
              <div className="mt-6 space-y-3.5 text-xs font-mono">
                {/* Email */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-[#1A1A24] border-[#2C2C3C]' : 'bg-[#FFFFFF] border-[#E2E2D6]'
                }`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className={`p-1.5 rounded-lg border text-[11px] transition-colors ${
                        isDark ? 'border-[#353548] hover:bg-[#252533]' : 'border-[#D4D3C7] hover:bg-[#EFEFE8]'
                      }`}
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[11px] hover:bg-emerald-400 transition-colors"
                    >
                      Email Me
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-[#1A1A24] border-[#2C2C3C]' : 'bg-[#FFFFFF] border-[#E2E2D6]'
                }`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleCopyPhone}
                      className={`p-1.5 rounded-lg border text-[11px] transition-colors ${
                        isDark ? 'border-[#353548] hover:bg-[#252533]' : 'border-[#D4D3C7] hover:bg-[#EFEFE8]'
                      }`}
                      title="Copy Phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[11px] hover:bg-emerald-400 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Primary Web Assets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href={PERSONAL_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#1A1A24] border-[#2C2C3C] hover:border-emerald-500/50' : 'bg-[#FFFFFF] border-[#E2E2D6] hover:border-[#18181B]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="truncate font-semibold">Education Point</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={PERSONAL_INFO.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#1A1A24] border-[#2C2C3C] hover:border-emerald-500/50' : 'bg-[#FFFFFF] border-[#E2E2D6] hover:border-[#18181B]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="truncate font-semibold">Portfolio Site</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Verified Social & Community Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={PERSONAL_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#1A1A24] border-[#2C2C3C] hover:border-emerald-500/50' : 'bg-[#FFFFFF] border-[#E2E2D6] hover:border-[#18181B]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                      <span className="truncate font-semibold">{PERSONAL_INFO.instagramHandle}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={PERSONAL_INFO.whatsappChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#1A1A24] border-[#2C2C3C] hover:border-emerald-500/50' : 'bg-[#FFFFFF] border-[#E2E2D6] hover:border-[#18181B]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Radio className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="truncate font-semibold">WhatsApp Channel</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Clean Contact Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className={`p-8 sm:p-10 rounded-3xl border shadow-xl relative ${
              isDark ? 'bg-[#14141B] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
            }`}>
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                  DIRECT TRANSMISSION
                </span>
                <h4 className={`text-2xl font-serif font-bold tracking-tight mt-1 ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  Send a Direct Message
                </h4>
                <p className={`text-xs font-mono mt-1 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                  Messages route directly to Muhammad Rizwan's official inbox.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl border text-center space-y-3 ${
                    isDark ? 'bg-[#122019] border-emerald-500/40 text-[#CDEFD9]' : 'bg-[#EBF7F0] border-emerald-500/40 text-[#143B1D]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h5 className="font-serif font-bold text-lg">Thank You!</h5>
                  <p className="text-xs font-mono leading-relaxed">
                    Your message draft has been routed to educationpoint0360@gmail.com. You can also chat directly on WhatsApp at +92 331 4220506.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-full text-xs font-mono font-bold bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-mono font-semibold uppercase mb-1.5 ${
                      isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark
                          ? 'bg-[#1B1B26] border-[#2E2E3E] text-[#F4F4F6] placeholder-[#5C5C6E]'
                          : 'bg-[#F9F9F6] border-[#DCDCD0] text-[#18181B] placeholder-[#8E8E98]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold uppercase mb-1.5 ${
                      isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                    }`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark
                          ? 'bg-[#1B1B26] border-[#2E2E3E] text-[#F4F4F6] placeholder-[#5C5C6E]'
                          : 'bg-[#F9F9F6] border-[#DCDCD0] text-[#18181B] placeholder-[#8E8E98]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold uppercase mb-1.5 ${
                      isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                    }`}>
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Remote Collaboration / Web Platform Project"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark
                          ? 'bg-[#1B1B26] border-[#2E2E3E] text-[#F4F4F6] placeholder-[#5C5C6E]'
                          : 'bg-[#F9F9F6] border-[#DCDCD0] text-[#18181B] placeholder-[#8E8E98]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold uppercase mb-1.5 ${
                      isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                    }`}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your project, timeline, or opportunity..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                        isDark
                          ? 'bg-[#1B1B26] border-[#2E2E3E] text-[#F4F4F6] placeholder-[#5C5C6E]'
                          : 'bg-[#F9F9F6] border-[#DCDCD0] text-[#18181B] placeholder-[#8E8E98]'
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-md transition-all active:scale-[0.99] group"
                    >
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
