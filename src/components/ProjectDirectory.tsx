import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Layers,
  Sparkles,
  BookOpen,
  Compass,
  Users,
  Search,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { PROJECT_DIRECTORY, PERSONAL_INFO } from '../data/portfolioData';
import { ProjectDirectoryEntry } from '../types';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function ProjectDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isDark } = useTheme();

  const categories = ['All', 'Education / EdTech', 'AI / EdTech', 'Education / Courses', 'Islamic Digital Resources', 'Digital Web Project'];

  const filteredProjects = PROJECT_DIRECTORY.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technology.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'Education Point':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'Education Point AI':
        return <Sparkles className="w-4 h-4 text-sky-400" />;
      case 'Education Point Courses':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'NUR Islamic':
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'SoulBook':
        return <Users className="w-4 h-4 text-indigo-400" />;
      default:
        return <Globe2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <section
      id="project-directory"
      aria-labelledby="project-directory-title"
      className={`py-20 sm:py-28 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0E0E13] border-[#242432]' : 'bg-[#FAFAF7] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Numbering */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            Project Graph & Semantic Directory
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="project-directory-title"
              className={`text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-[1.05] ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}
            >
              Verified Project Directory
            </h2>
            <p className={`mt-3 text-sm sm:text-base font-normal max-w-2xl ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`}>
              A structured semantic registry of all verified digital platforms and independent web applications created and maintained by Muhammad Rizwan.
            </p>
          </div>

          {/* Entity Hierarchy Visual Pill */}
          <div className={`p-4 rounded-2xl border text-xs font-mono max-w-md ${
            isDark ? 'bg-[#15151C] border-[#2A2A38] text-[#D0D0DA]' : 'bg-[#FFFFFF] border-[#E6E5DC] text-[#44444C]'
          }`}>
            <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Entity Provenance Graph</span>
            </div>
            <div className="text-[11px] leading-relaxed">
              <span className="font-semibold text-emerald-500">Muhammad Rizwan</span>
              <span className="opacity-50"> (Creator) → </span>
              <span className="font-semibold">Education Point</span>
              <span className="opacity-50"> (Flagship) → </span>
              <span>EP AI • EP Courses • NUR Islamic • SoulBook</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-[#747482]' : 'text-[#9E9EA8]'
            }`} />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-mono border transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                isDark
                  ? 'bg-[#14141B] border-[#282836] text-[#F4F4F6] placeholder-[#5C5C6E]'
                  : 'bg-[#FFFFFF] border-[#DCDCD0] text-[#18181B] placeholder-[#8E8E98]'
              }`}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playTick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white font-bold shadow-xs'
                    : isDark
                    ? 'bg-[#171720] text-[#A6A6B4] hover:bg-[#20202A] border border-[#2A2A38]'
                    : 'bg-[#FFFFFF] text-[#57575E] hover:bg-[#EFEFE8] border border-[#E6E5DC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Semantic Directory Grid / Table */}
        <div className="space-y-3">
          {filteredProjects.map((entry, idx) => (
            <motion.article
              key={entry.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group hover:border-emerald-500/40 ${
                isDark
                  ? 'bg-[#14141B] border-[#222230] hover:bg-[#181822]'
                  : 'bg-[#FFFFFF] border-[#E6E5DC] hover:bg-[#FDFDFB]'
              }`}
            >
              {/* Left Column: Project Identity & Association */}
              <div className="space-y-2 lg:max-w-xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${
                    isDark ? 'bg-[#1E1E2A] text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {getProjectIcon(entry.name)}
                    {entry.category}
                  </span>
                  <span className="opacity-30">•</span>
                  <span className={`text-[11px] font-medium ${isDark ? 'text-[#8E8E9E]' : 'text-[#747480]'}`}>
                    {entry.association}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-serif font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  {entry.name}
                </h3>

                <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                  isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
                }`}>
                  {entry.description}
                </p>

                {/* Tech & Creator Specs */}
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono pt-1 ${
                  isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
                }`}>
                  <div>
                    <span className="opacity-60">Creator: </span>
                    <span className={isDark ? 'text-[#D0D0DA]' : 'text-[#2D2D34]'}>{entry.creator}</span>
                  </div>
                  <span className="hidden sm:inline opacity-30">•</span>
                  <div>
                    <span className="opacity-60">Tech: </span>
                    <span className={isDark ? 'text-[#D0D0DA]' : 'text-[#2D2D34]'}>{entry.technology}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Status & Live Direct Action */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-current/10">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {entry.status}
                  </span>
                </div>

                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime()}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all active:scale-95 group/link ${
                    isDark
                      ? 'bg-[#1E1E2A] hover:bg-emerald-500 hover:text-white text-[#F4F4F6] border border-[#303042]'
                      : 'bg-[#F4F4EE] hover:bg-emerald-600 hover:text-white text-[#18181B] border border-[#D4D3C7]'
                  }`}
                  aria-label={`Visit live website of ${entry.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[170px] sm:max-w-none">{entry.liveUrl.replace('https://', '')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-link:translate-x-0.5 group-link:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}

          {filteredProjects.length === 0 && (
            <div className={`p-8 text-center rounded-2xl border text-xs font-mono ${
              isDark ? 'bg-[#14141B] border-[#222230] text-[#747482]' : 'bg-[#FFFFFF] border-[#E6E5DC] text-[#7E7E88]'
            }`}>
              No projects found matching query. Try another term or reset filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
