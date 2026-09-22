import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  ArrowUpRight,
  Phone,
  Send,
  MapPin,
  Sparkles,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function ContactSection() {
  const [quickMessage, setQuickMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const handleCopyPhone = () => {
    soundFX.playTick();
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    soundFX.playTick();
    navigator.clipboard.writeText(PERSONAL_INFO.epEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getWhatsAppSendUrl = () => {
    const encoded = encodeURIComponent(
      quickMessage.trim() || 'Hi Muhammad Rizwan! I saw your portfolio and would like to connect.'
    );
    return `https://wa.me/923314220506?text=${encoded}`;
  };

  const getEmailSendUrl = () => {
    const subject = encodeURIComponent('Inquiry regarding Education Point / Digital Projects');
    const body = encodeURIComponent(quickMessage.trim() || 'Hello Muhammad Rizwan,');
    return `mailto:${PERSONAL_INFO.epEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className={`py-24 sm:py-36 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            10 // DIALOGUE & INITIATIVES
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[0.98] ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                LET'S BUILD
                <span className={`block italic ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                  SOMETHING DIGITAL.
                </span>
              </h2>

              <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-lg ${
                isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
              }`}>
                «Have an idea, project or digital platform in mind?»
              </p>
            </div>

            {/* Premium Contact Card */}
            <div className={`mt-10 p-8 rounded-3xl border shadow-sm ${
              isDark
                ? 'bg-[#15151C] border-[#242432]'
                : 'bg-[#F9F9F6] border-[#E6E5DC]'
            }`}>
              <div className={`flex items-start justify-between pb-6 border-b ${
                isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
              }`}>
                <div>
                  <h3 className={`text-2xl font-serif font-bold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className={`text-xs font-mono mt-1 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    {PERSONAL_INFO.title}
                  </p>
                  <div className={`flex items-center gap-1.5 text-xs mt-2 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`} />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold shadow-sm ${
                  isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
                }`}>
                  MR
                </div>
              </div>

              {/* Direct channels in contact card - CTA button style with Lucide icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime()}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 group active:scale-95 ${
                    isDark
                      ? 'bg-[#101016] border-[#242432] hover:border-[#353548] text-[#F4F4F6]'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B] text-[#18181B]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">WhatsApp</span>
                </a>

                <a
                  href={PERSONAL_INFO.personalInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 group active:scale-95 ${
                    isDark
                      ? 'bg-[#101016] border-[#242432] hover:border-[#353548] text-[#F4F4F6]'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B] text-[#18181B]'
                  }`}
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">Instagram</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.epEmail}`}
                  onClick={() => soundFX.playTick()}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 group active:scale-95 ${
                    isDark
                      ? 'bg-[#101016] border-[#242432] hover:border-[#353548] text-[#F4F4F6]'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B] text-[#18181B]'
                  }`}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">Email</span>
                </a>

                <a
                  href={PERSONAL_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 group active:scale-95 ${
                    isDark
                      ? 'bg-[#101016] border-[#242432] hover:border-[#353548] text-[#F4F4F6]'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B] text-[#18181B]'
                  }`}
                >
                  <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">YouTube</span>
                </a>
              </div>

              {/* Education Point Channels CTA Box */}
              <div className={`mt-6 pt-6 border-t p-5 rounded-2xl border ${
                isDark
                  ? 'border-[#242432] bg-[#101016]'
                  : 'border-[#E6E5DC] bg-[#FFFFFF]'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-serif font-bold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    Education Point Channels
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    OFFICIAL EDTECH
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={PERSONAL_INFO.epInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#1D1D26] hover:bg-[#252532] border-[#353548] text-[#F4F4F6]'
                        : 'bg-[#F4F4EE] hover:bg-[#EFEFE8] border-[#E6E5DC] text-[#18181B]'
                    }`}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>

                  <a
                    href={PERSONAL_INFO.epWhatsappChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#1D1D26] hover:bg-[#252532] border-[#353548] text-[#F4F4F6]'
                        : 'bg-[#F4F4EE] hover:bg-[#EFEFE8] border-[#E6E5DC] text-[#18181B]'
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Channel</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.epEmail}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#1D1D26] hover:bg-[#252532] border-[#353548] text-[#F4F4F6]'
                        : 'bg-[#F4F4EE] hover:bg-[#EFEFE8] border-[#E6E5DC] text-[#18181B]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7E7E88]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Public Contact Methods & Interactive Messenger */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Interactive Direct Message Box */}
            <div className={`p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#15151C] border-[#242432]'
                : 'bg-[#F9F9F6] border-[#E6E5DC]'
            }`}>
              <h3 className={`text-xs font-mono font-bold tracking-widest uppercase mb-2 flex items-center gap-2 ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Dispatch Note</span>
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                Write a brief project concept or greeting to send directly to Muhammad Rizwan via WhatsApp or Email:
              </p>

              <textarea
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="E.g., Hello Muhammad Rizwan, I would like to discuss building an academic resource portal / modern web project..."
                rows={3}
                className={`w-full p-4 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-[#101016] border-[#353548] text-[#F4F4F6] placeholder-[#747482] focus:ring-emerald-500'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] placeholder-[#7E7E88] focus:ring-[#18181B]'
                }`}
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppSendUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime()}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                    isDark
                      ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                      : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getEmailSendUrl()}
                  onClick={() => soundFX.playTick()}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border text-xs font-medium transition-all shadow-sm active:scale-95 ${
                    isDark
                      ? 'bg-[#101016] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                      : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>

            {/* Real Public Contact Links Cards - Modern Elevated Cards with CTA Buttons */}
            <div className="space-y-3.5">
              {/* WhatsApp Card */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:shadow-sm ${
                isDark
                  ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
                  : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B]'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${
                    isDark ? 'bg-[#1D1D26] text-[#F4F4F6]' : 'bg-[#EFEFE8] text-[#18181B]'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono font-bold uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                      WHATSAPP // DIRECT
                    </div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyPhone}
                    title="Copy Phone Number"
                    className={`p-2.5 rounded-xl transition-colors text-xs flex items-center gap-1 active:scale-95 ${
                      isDark
                        ? 'bg-[#1D1D26] text-[#A6A6B4] hover:text-[#F4F4F6]'
                        : 'bg-[#F4F4EE] text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playChime()}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                      isDark
                        ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                        : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                    }`}
                  >
                    <span>Message</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Personal Instagram */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:shadow-sm ${
                isDark
                  ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
                  : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B]'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${
                    isDark ? 'bg-[#1D1D26] text-[#F4F4F6]' : 'bg-[#EFEFE8] text-[#18181B]'
                  }`}>
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono font-bold uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                      PERSONAL INSTAGRAM
                    </div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                      {PERSONAL_INFO.personalInstagramHandle}
                    </div>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.personalInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all self-end sm:self-center active:scale-95 ${
                    isDark
                      ? 'bg-[#1D1D26] hover:bg-[#F4F4F6] text-[#F4F4F6] hover:text-[#0C0C0F] border-[#353548]'
                      : 'bg-[#F4F4EE] hover:bg-[#18181B] text-[#18181B] hover:text-[#F9F9F6] border-[#D4D3C7]'
                  }`}
                >
                  <span>View Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Education Point Email */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:shadow-sm ${
                isDark
                  ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
                  : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B]'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${
                    isDark ? 'bg-[#1D1D26] text-[#F4F4F6]' : 'bg-[#EFEFE8] text-[#18181B]'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono font-bold uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                      OFFICIAL EMAIL
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold font-mono break-all ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                      {PERSONAL_INFO.epEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className={`p-2.5 rounded-xl transition-colors text-xs flex items-center gap-1 active:scale-95 ${
                      isDark
                        ? 'bg-[#1D1D26] text-[#A6A6B4] hover:text-[#F4F4F6]'
                        : 'bg-[#F4F4EE] text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.epEmail}`}
                    onClick={() => soundFX.playTick()}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm whitespace-nowrap active:scale-95 ${
                      isDark
                        ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                        : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                    }`}
                  >
                    <span>Send Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
