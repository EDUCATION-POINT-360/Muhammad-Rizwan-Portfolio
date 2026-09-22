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

export default function ContactSection() {
  const [quickMessage, setQuickMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
    <section id="contact" className="py-24 sm:py-36 relative border-b border-[#E6E5DC]/80 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
            10 // DIALOGUE & INITIATIVES
          </span>
          <div className="w-12 h-[1px] bg-[#D4D3C7]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#18181B] tracking-tight leading-[0.98]">
                LET'S BUILD
                <span className="block italic text-[#57575E]">SOMETHING DIGITAL.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#57575E] leading-relaxed max-w-lg">
                «Have an idea, project or digital platform in mind?»
              </p>
            </div>

            {/* Premium Contact Card */}
            <div className="mt-10 p-8 rounded-3xl bg-[#F9F9F6] border border-[#E6E5DC] shadow-[0_8px_32px_rgba(24,24,27,0.03)]">
              <div className="flex items-start justify-between pb-6 border-b border-[#E6E5DC]">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#18181B]">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-mono text-[#57575E] mt-1">
                    {PERSONAL_INFO.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#7E7E88] mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#18181B]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-2xl font-bold shadow-sm">
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
                  className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] text-center hover:border-[#18181B] hover:shadow-sm transition-all flex flex-col items-center gap-1.5 group active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-[#18181B] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-[#18181B]">WhatsApp</span>
                </a>

                <a
                  href={PERSONAL_INFO.personalInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] text-center hover:border-[#18181B] hover:shadow-sm transition-all flex flex-col items-center gap-1.5 group active:scale-95"
                >
                  <Instagram className="w-4 h-4 text-[#18181B] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-[#18181B]">Instagram</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.epEmail}`}
                  onClick={() => soundFX.playTick()}
                  className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] text-center hover:border-[#18181B] hover:shadow-sm transition-all flex flex-col items-center gap-1.5 group active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#18181B] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-[#18181B]">Email</span>
                </a>

                <a
                  href={PERSONAL_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] text-center hover:border-[#18181B] hover:shadow-sm transition-all flex flex-col items-center gap-1.5 group active:scale-95"
                >
                  <Youtube className="w-4 h-4 text-[#18181B] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold text-[#18181B]">YouTube</span>
                </a>
              </div>

              {/* Education Point Channels CTA Box */}
              <div className="mt-6 pt-6 border-t border-[#E6E5DC] bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E5DC]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-serif font-bold text-[#18181B]">
                    Education Point Channels
                  </span>
                  <span className="text-[10px] font-mono text-[#7E7E88]">OFFICIAL EDTECH</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={PERSONAL_INFO.epInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18181B] px-3 py-1.5 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] border border-[#E6E5DC] transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>

                  <a
                    href={PERSONAL_INFO.epWhatsappChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18181B] px-3 py-1.5 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] border border-[#E6E5DC] transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Channel</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.epEmail}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18181B] px-3 py-1.5 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] border border-[#E6E5DC] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7E7E88]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Public Contact Methods & Interactive Messenger */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Interactive Direct Message Box */}
            <div className="p-8 rounded-3xl bg-[#F9F9F6] border border-[#E6E5DC]">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Dispatch Note</span>
              </h3>
              <p className="text-xs text-[#57575E] mb-4">
                Write a brief project concept or greeting to send directly to Muhammad Rizwan via WhatsApp or Email:
              </p>

              <textarea
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="E.g., Hello Muhammad Rizwan, I would like to discuss building an academic resource portal / modern web project..."
                rows={3}
                className="w-full p-4 rounded-2xl bg-[#FFFFFF] border border-[#D4D3C7] text-sm text-[#18181B] placeholder-[#7E7E88] focus:outline-none focus:ring-2 focus:ring-[#18181B] focus:border-transparent transition-all"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppSendUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getEmailSendUrl()}
                  onClick={() => soundFX.playTick()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#D4D3C7] text-[#18181B] text-xs font-medium hover:bg-[#EFEFE8] transition-all shadow-sm active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>

            {/* Real Public Contact Links Cards - Modern 3D/Elevated Cards with CTA Buttons */}
            <div className="space-y-3.5">
              {/* WhatsApp Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#18181B] transition-all hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#EFEFE8] flex items-center justify-center text-[#18181B] shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#7E7E88] uppercase">WHATSAPP // DIRECT</div>
                    <div className="text-sm font-semibold text-[#18181B]">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyPhone}
                    title="Copy Phone Number"
                    className="p-2.5 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] text-[#57575E] hover:text-[#18181B] transition-colors text-xs flex items-center gap-1 active:scale-95"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playChime()}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm active:scale-95"
                  >
                    <span>Message</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Personal Instagram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#18181B] transition-all hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#EFEFE8] flex items-center justify-center text-[#18181B] shadow-xs">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#7E7E88] uppercase">PERSONAL INSTAGRAM</div>
                    <div className="text-sm font-semibold text-[#18181B]">{PERSONAL_INFO.personalInstagramHandle}</div>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.personalInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F4F4EE] hover:bg-[#18181B] text-[#18181B] hover:text-[#F9F9F6] text-xs font-semibold border border-[#D4D3C7] transition-all self-end sm:self-center active:scale-95"
                >
                  <span>View Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Education Point Email */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#18181B] transition-all hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#EFEFE8] flex items-center justify-center text-[#18181B] shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#7E7E88] uppercase">OFFICIAL EMAIL</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#18181B] font-mono break-all">{PERSONAL_INFO.epEmail}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="p-2.5 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] text-[#57575E] hover:text-[#18181B] transition-colors text-xs flex items-center gap-1 active:scale-95"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.epEmail}`}
                    onClick={() => soundFX.playTick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm whitespace-nowrap active:scale-95"
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
