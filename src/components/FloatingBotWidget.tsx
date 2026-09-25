import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  FileText,
  Boxes,
  MessageSquare,
  CornerDownLeft,
  ExternalLink,
  ChevronDown,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { downloadCvPdf } from '../utils/generatePdfCv';

interface FloatingBotWidgetProps {
  ambientAtmosphere: boolean;
  onToggleAtmosphere: () => void;
  onOpenCvModal: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: 'whatsapp' | 'cv' | 'link';
  };
}

const QUICK_PROMPTS = [
  {
    label: 'Who is Muhammad Rizwan?',
    response:
      "Muhammad Rizwan is a Founder, Educationist, and Digital Architect from Mianwali, Pakistan. He is the Founder & Owner of Education Point, a free educational platform created to help students access educational resources digitally.",
  },
  {
    label: 'Mission & Philosophy',
    response:
      "Guided by 'Think Digital. Build Future.', Muhammad Rizwan architects free and accessible educational platforms to empower Pakistani students with quality digital learning resources.",
  },
  {
    label: 'Tell me about Education Point',
    response:
      "Education Point is a free educational platform created to help Pakistani students access academic resources digitally—including 9th–12th class notes, MCQs, past papers, guess papers, pairing schemes, test series, and entry test preparation material.",
    actionType: 'education-point',
  },
  {
    label: 'What verified projects has he created?',
    response:
      "Muhammad Rizwan has built 5 verified digital platforms: Education Point (Flagship EdTech), Education Point AI (learning companion), Education Point Courses (modular tracks), NUR Islamic (Islamic resources PWA), and SoulBook (social web platform).",
    actionType: 'projects',
  },
  {
    label: 'What is his Tech Stack?',
    response:
      "Rizwan specializes in Education Technology, Web Development, Frontend Architecture, Progressive Web Apps (PWA), HTML/CSS/JavaScript, REST APIs, and AI endpoint integration.",
    actionType: 'skills',
  },
  {
    label: 'ICS & Educational Background',
    response:
      "Rizwan completed Intermediate in Computer Science (ICS) with focus on Physics, Mathematics, and Computer Science, building on an 85% Matric qualification in Computer Science.",
    actionType: 'education',
  },
  {
    label: 'Open to International Work?',
    response:
      "Yes! Rizwan is actively open to international remote collaborations, web development, and educational technology consulting.",
    actionType: 'international',
  },
  {
    label: 'How can I contact him directly?',
    response:
      "You can message Rizwan directly on WhatsApp at +92 331 4220506 or email him at educationpoint0360@gmail.com. He usually responds promptly!",
    actionType: 'whatsapp',
  },
];

export default function FloatingBotWidget({
  ambientAtmosphere,
  onToggleAtmosphere,
  onOpenCvModal,
}: FloatingBotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'controls'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { theme, isDark, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Assalam-o-Alaikum & Welcome! I am Rizwan's Digital Assistant Bot. How can I help you explore his portfolio, projects, or background today?",
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
    }
  }, [isOpen, messages, isTyping]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.enabled = nextState;
    if (nextState) soundFX.playChime();
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    soundFX.playTick();
    setHasInteracted(true);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Intelligent answer engine based on query
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';
      let action: Message['action'] | undefined = undefined;

      if (lower.includes('education point') || lower.includes('flagship') || lower.includes('students')) {
        reply =
          "Education Point is Rizwan's flagship platform! It serves 50,000+ students with curated educational resources, career roadmaps, and digital syllabus archives.";
        action = {
          label: 'View Education Point Case Study',
          onClick: () => {
            setIsOpen(false);
            document.getElementById('education-point')?.scrollIntoView({ behavior: 'smooth' });
          },
        };
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('number')) {
        reply =
          `You can reach Muhammad Rizwan on WhatsApp at ${PERSONAL_INFO.phoneInternational} or email ${PERSONAL_INFO.email}.`;
        action = {
          label: 'Chat on WhatsApp',
          icon: 'whatsapp',
          onClick: () => {
            window.open(PERSONAL_INFO.whatsappUrl, '_blank', 'noopener,noreferrer');
          },
        };
      } else if (lower.includes('cv') || lower.includes('resume') || lower.includes('download') || lower.includes('pdf')) {
        reply =
          "Muhammad Rizwan's CV is ATS-formatted and available as verified vector PDF and high-res image.";
        action = {
          label: 'Download ATS CV (PDF)',
          icon: 'cv',
          onClick: () => {
            downloadCvPdf();
          },
        };
      } else if (lower.includes('ics') || lower.includes('matric') || lower.includes('study') || lower.includes('school')) {
        reply =
          "Rizwan completed his Intermediate in Computer Science (ICS) with focus on Computer Science, Mathematics, and Physics, alongside Matric (Computer Science) with 85% distinction.";
        action = {
          label: 'View Education Section',
          onClick: () => {
            setIsOpen(false);
            document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
          },
        };
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) {
        reply =
          "Rizwan has built Education Point 360, AI Document Architect, Realtime Web Chat, and multiple high-performance web applications.";
        action = {
          label: 'Explore All Projects',
          onClick: () => {
            setIsOpen(false);
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          },
        };
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('react') || lower.includes('typescript')) {
        reply =
          "His core competencies include TypeScript, React, Next.js, Node.js, Tailwind CSS, 3D Three.js, REST APIs, and educational product strategy.";
        action = {
          label: 'View Verified Skills',
          onClick: () => {
            setIsOpen(false);
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          },
        };
      } else {
        reply =
          "Thank you for reaching out! Muhammad Rizwan is available for remote opportunities, full-stack web builds, and tech collaborations. Would you like to chat directly on WhatsApp or review his verified CV?";
        action = {
          label: 'Open WhatsApp (+92 331 4220506)',
          icon: 'whatsapp',
          onClick: () => {
            window.open(PERSONAL_INFO.whatsappUrl, '_blank', 'noopener,noreferrer');
          },
        };
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: 'Just now',
        action,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      soundFX.playChime();
    }, 700);
  };

  return (
    <>
      {/* Floating Bot Widget Launcher Pill / Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Animated Bot Toggle Button */}
        <motion.button
          onClick={() => {
            soundFX.playTick();
            setIsOpen((prev) => !prev);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Rizwan AI Assistant Bot"
          className={`relative group flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            isOpen
              ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30'
              : isDark
              ? 'bg-[#15151C]/95 text-[#F4F4F6] border-[#353548] hover:border-emerald-500/60 shadow-black/60'
              : 'bg-white/95 text-[#18181B] border-[#D4D3C7] hover:border-emerald-500/60 shadow-black/10'
          }`}
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20 blur-sm group-hover:opacity-60 transition duration-300 -z-10" />

          {/* Bot Icon with active pulse indicator */}
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <div className="relative">
                <Bot className="w-5 h-5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
                {unreadBadge && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="font-mono text-xs font-semibold tracking-wider flex items-center gap-1.5">
              {isOpen ? 'Close Bot' : 'Assistant Bot'}
              {!isOpen && (
                <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-mono">
                  Online
                </span>
              )}
            </span>
          </div>

          {/* Pulse ring effect on initial visit */}
          {!isOpen && unreadBadge && (
            <span className="absolute -inset-1 rounded-full border border-emerald-500/50 animate-ping pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* Expanded Floating Bot Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[82vh] h-[580px] flex flex-col rounded-2xl border shadow-2xl backdrop-blur-2xl overflow-hidden transition-colors duration-300 ${
              isDark
                ? 'bg-[#101016]/95 border-[#282838] text-[#F4F4F6] shadow-black/80'
                : 'bg-[#FFFFFF]/95 border-[#E6E5DC] text-[#18181B] shadow-black/15'
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 border-b flex items-center justify-between transition-colors ${
                isDark ? 'bg-[#151520] border-[#242434]' : 'bg-[#F9F9F6] border-[#EAEAE0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#151520]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-sm">Rizwan AI Assistant</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-medium border border-emerald-500/20">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#8E8EA0]">
                    Founder & Digital Architect Assistant
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleSound}
                  aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                    soundEnabled
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-[#8E8EA0] hover:bg-black/10 dark:hover:bg-white/10'
                  }`}
                  title={soundEnabled ? 'Sound On' : 'Sound Muted'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant Window"
                  className="p-1.5 rounded-lg text-[#8E8EA0] hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div
              className={`flex items-center border-b px-4 text-xs font-mono transition-colors ${
                isDark ? 'border-[#242434] bg-[#0E0E14]' : 'border-[#EAEAE0] bg-[#F2F2EB]'
              }`}
            >
              <button
                onClick={() => {
                  soundFX.playTick();
                  setActiveTab('chat');
                }}
                className={`py-2 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-emerald-500 text-emerald-500 font-semibold'
                    : 'border-transparent text-[#8E8EA0] hover:text-current'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Smart Chat
              </button>
              <button
                onClick={() => {
                  soundFX.playTick();
                  setActiveTab('controls');
                }}
                className={`py-2 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'controls'
                    ? 'border-emerald-500 text-emerald-500 font-semibold'
                    : 'border-transparent text-[#8E8EA0] hover:text-current'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Quick Toggles
              </button>
            </div>

            {/* TAB CONTENT: SMART CHAT */}
            {activeTab === 'chat' && (
              <>
                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-emerald-500 text-white rounded-br-none shadow-md shadow-emerald-500/20'
                            : isDark
                            ? 'bg-[#181824] text-[#E0E0E8] border border-[#2B2B3E] rounded-bl-none'
                            : 'bg-[#F2F2EC] text-[#18181B] border border-[#DDDDCF] rounded-bl-none'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                        {/* Interactive Action Button inside message */}
                        {msg.action && (
                          <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10">
                            <button
                              onClick={msg.action.onClick}
                              className={`w-full py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-mono font-medium transition-all ${
                                msg.action.icon === 'whatsapp'
                                  ? 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm'
                                  : msg.action.icon === 'cv'
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              <span>{msg.action.label}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-[#8E8EA0] mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#181824] border border-[#2B2B3E] w-16 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Bar */}
                <div
                  className={`p-2.5 border-t border-b overflow-x-auto flex gap-1.5 no-scrollbar transition-colors ${
                    isDark ? 'bg-[#0E0E14] border-[#222232]' : 'bg-[#F5F5ED] border-[#E6E5DC]'
                  }`}
                >
                  {QUICK_PROMPTS.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qp.label)}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
                        isDark
                          ? 'border-[#2D2D40] bg-[#151522] text-[#A6A6B8] hover:border-emerald-500/50 hover:text-emerald-400'
                          : 'border-[#D4D3C7] bg-white text-[#57575E] hover:border-emerald-500/50 hover:text-emerald-600'
                      }`}
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>

                {/* Input Field */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={`p-3 flex items-center gap-2 border-t transition-colors ${
                    isDark ? 'bg-[#151520] border-[#242434]' : 'bg-[#FAFAF7] border-[#EAEAE0]'
                  }`}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Education Point, ICS, skills..."
                    className={`flex-1 px-3 py-2 rounded-xl text-xs font-sans outline-none transition-all ${
                      isDark
                        ? 'bg-[#0C0C12] border border-[#2B2B3E] text-white focus:border-emerald-500 placeholder:text-[#555566]'
                        : 'bg-white border border-[#D4D3C7] text-black focus:border-emerald-500 placeholder:text-[#999999]'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`p-2 rounded-xl font-mono text-xs transition-all ${
                      inputValue.trim()
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-emerald-500/20 text-emerald-500/40 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* TAB CONTENT: QUICK TOGGLES & FEATURES */}
            {activeTab === 'controls' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Portfolio Interactive Controls</h4>
                  <p className="text-[#8E8EA0] text-[11px] font-mono">
                    Customize your 3D visual fidelity, audio feedback & theme.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {/* Atmospheric Particles Toggle */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#151522] border-[#2A2A3C]' : 'bg-[#F5F5ED] border-[#DCDCCF]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-xs">Ambient Tech Particles</div>
                        <div className="text-[10px] text-[#8E8EA0] font-mono">
                          Floating canvas starfield particles
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        soundFX.playTick();
                        onToggleAtmosphere();
                      }}
                      className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all ${
                        ambientAtmosphere
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-[#2A2A3A] text-[#888899]'
                      }`}
                    >
                      {ambientAtmosphere ? 'Active' : 'Muted'}
                    </button>
                  </div>

                  {/* Sound Effects Toggle */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#151522] border-[#2A2A3C]' : 'bg-[#F5F5ED] border-[#DCDCCF]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-xs">Spatial Audio FX</div>
                        <div className="text-[10px] text-[#8E8EA0] font-mono">
                          Subtle interactive haptic clicks & chimes
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={toggleSound}
                      className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all ${
                        soundEnabled
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-[#2A2A3A] text-[#888899]'
                      }`}
                    >
                      {soundEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  {/* Theme Mode Toggle */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#151522] border-[#2A2A3C]' : 'bg-[#F5F5ED] border-[#DCDCCF]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDark ? (
                        <Moon className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-amber-500" />
                      )}
                      <div>
                        <div className="font-semibold text-xs">Display Theme</div>
                        <div className="text-[10px] text-[#8E8EA0] font-mono">
                          {isDark ? 'Obsidian Slate Dark Mode' : 'Warm Ivory Light Mode'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold border border-[#3A3A4C] hover:border-emerald-400 transition-all"
                    >
                      Toggle to {isDark ? 'Light' : 'Dark'}
                    </button>
                  </div>

                  {/* Quick ATS CV Action */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-[#151522] border-[#2A2A3C]' : 'bg-[#F5F5ED] border-[#DCDCCF]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-xs">Curriculum Vitae</div>
                        <div className="text-[10px] text-[#8E8EA0] font-mono">
                          Verified vector ATS PDF / High-res Pic
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenCvModal();
                        }}
                        className="px-2.5 py-1 rounded-lg font-mono text-[10px] bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                      >
                        Preview
                      </button>
                      <button
                        onClick={downloadCvPdf}
                        className="px-2.5 py-1 rounded-lg font-mono text-[10px] bg-emerald-500 hover:bg-emerald-400 text-white transition-all"
                      >
                        PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Direct Connect Quick Banner */}
                <div className="pt-2">
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        Direct Founder Line
                      </span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A6A6B8] leading-relaxed mb-3 font-sans">
                      Connect with Muhammad Rizwan for web builds, educational projects, or remote technical opportunities.
                    </p>
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 font-mono text-xs font-semibold shadow-md transition-all"
                    >
                      <span>WhatsApp Direct (+92 331 4220506)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
