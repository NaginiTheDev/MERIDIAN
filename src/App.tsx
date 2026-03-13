/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { InAction } from './components/InAction/InAction';
import {
  ArrowRight,
  Smartphone,
  Monitor,
  Zap,
  Clock,
  CheckCircle2,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Slack,
  Trello,
  Database,
  FlaskConical,
  Stethoscope,
  TrendingUp,
  Quote,
  Search,
  Settings,
  FileText,
  RefreshCw,
  Menu,
  X,
  Phone,
  MapPin,
  LayoutDashboard,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CONTACT_EMAIL = 'hello@meridian.mu';

// ---------------------------------------------------------------------------
// Animated Background — replaces grain overlay
// ---------------------------------------------------------------------------

const AnimatedBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: -1 }}
    aria-hidden
  >
    {/* Orb 1 — large, slow drift */}
    <motion.div
      className="absolute rounded-full bg-meridian-gold"
      style={{ width: 900, height: 900, filter: 'blur(220px)', opacity: 0.045, marginLeft: -450, marginTop: -450 }}
      animate={{ left: ['0%', '42%', '18%', '0%'], top: ['8%', '22%', '58%', '8%'] }}
      transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Orb 2 — medium, different speed */}
    <motion.div
      className="absolute rounded-full bg-meridian-gold"
      style={{ width: 600, height: 600, filter: 'blur(160px)', opacity: 0.03, marginLeft: -300, marginTop: -300 }}
      animate={{ left: ['82%', '45%', '72%', '82%'], top: ['65%', '28%', '78%', '65%'] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Orb 3 — small white accent */}
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ width: 350, height: 350, filter: 'blur(120px)', opacity: 0.012, marginLeft: -175, marginTop: -175 }}
      animate={{ left: ['50%', '12%', '68%', '50%'], top: ['42%', '78%', '28%', '42%'] }}
      transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

// ---------------------------------------------------------------------------
// Reusable components
// ---------------------------------------------------------------------------

const SectionReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = '',
  delay = 0,
}) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'process' },
    { label: 'Applications', id: 'applications' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-700 ${scrolled ? 'bg-meridian-black/90 backdrop-blur-xl border-b border-white/5' : ''
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-xl tracking-tighter cursor-pointer"
        >
          MERIDIAN
        </button>

        <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.3em] text-white/50">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-meridian-gold transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:flex items-center gap-3 bg-meridian-gold text-meridian-black px-6 py-3 rounded-full font-display text-xs uppercase tracking-wider hover:bg-white transition-colors duration-300 cursor-pointer"
        >
          Book Discovery Call
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white cursor-pointer"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-meridian-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-[11px] uppercase tracking-[0.3em] text-white/50">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left hover:text-meridian-gold transition-colors cursor-pointer"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="text-left text-meridian-gold hover:text-white transition-colors cursor-pointer"
              >
                Book Discovery Call →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ---------------------------------------------------------------------------
// Integration Marquee
// ---------------------------------------------------------------------------

const IntegrationMarquee = () => {
  const tools = [
    { name: 'Slack', icon: <Slack size={18} /> },
    { name: 'Zoho CRM', icon: <Database size={18} /> },
    { name: 'Trello', icon: <Trello size={18} /> },
    { name: 'Salesforce', icon: <TrendingUp size={18} /> },
    { name: 'HubSpot', icon: <MessageSquare size={18} /> },
    { name: 'Google Workspace', icon: <Mail size={18} /> },
    { name: 'Microsoft 365', icon: <Monitor size={18} /> },
    { name: 'Asana', icon: <CheckCircle2 size={18} /> },
    { name: 'WhatsApp Business', icon: <Phone size={18} /> },
    { name: 'Notion', icon: <FileText size={18} /> },
  ];

  return (
    <div className="py-12 border-y border-white/5 overflow-hidden bg-white/[0.02]">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...tools, ...tools].map((tool, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-white/30 hover:text-meridian-gold transition-colors duration-500"
          >
            {tool.icon}
            <span className="text-xs uppercase tracking-[0.4em] font-display">{tool.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Device Frame
// ---------------------------------------------------------------------------

const DeviceFrame = ({
  type,
  children,
  label,
}: {
  type: 'iphone' | 'laptop';
  children: React.ReactNode;
  label: string;
}) => {
  const frames = {
    iphone:
      'w-[280px] h-[580px] border-[8px] border-[#1a1a1a] rounded-[40px] relative overflow-hidden bg-[#050505] shadow-2xl',
    laptop:
      'w-[600px] h-[380px] border-[12px] border-[#1a1a1a] rounded-t-2xl relative overflow-hidden bg-[#050505] shadow-2xl',
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={frames[type]}>
        {type === 'iphone' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        )}
        <div className="w-full h-full p-4 flex flex-col">{children}</div>
      </div>
      <span className="text-xs font-display tracking-widest text-meridian-gold/60 uppercase">
        {label}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Applications Carousel — what Meridian does per sector
// ---------------------------------------------------------------------------

const ApplicationsCarousel = () => {
  const [index, setIndex] = useState(0);

  const applications = [
    {
      sector: 'Pharmaceutics',
      icon: <FlaskConical size={48} />,
      title: 'Regulatory Intelligence',
      body: "-Preloaded and organized compliance documents, vetted and ready before every audit cycle, active documentation and monitoring between cycles.\n-State of the art stock and price monitoring; get a visual representation of where product is going, leaks and strong links, all in the click of a button, or automatically every monday morning",
      capabilities: ['Audit brief generation', 'Deviation & compliance monitoring', 'Regulatory correspondence drafting', 'Deadline & document tracking'],
    },
    {
      sector: 'Sales & Marketing',
      icon: <TrendingUp size={48} />,
      title: 'Client & Pipeline Intelligence',
      body: 'Every client call starts with a brief Meridian has already prepared — CRM history, last interaction, open proposals, relevant signals — surfaced without anyone searching. After the call, the follow-up is drafted. Between calls, Meridian watches your pipeline for deals going quiet and surfaces them before they die. Your team focuses on the conversation, not the admin around it. Automate every process that does not require a mind to think',
      capabilities: ['Pre-call client briefing', 'Follow-up & summary drafting', 'Deal-at-risk monitoring', 'CRM auto-update after interactions'],
    },
    {
      sector: 'Healthcare',
      icon: <Stethoscope size={48} />,
      title: 'Clinical Operations Command',
      body: 'Scheduling, patient records, and communications unified into a single operational view. Clinicians and practice managers see each appointment pre-loaded with relevant patient context. Post-consultation documentation is drafted automatically. Referrals, billing exceptions, and staff scheduling are routed and tracked without manual input at each step.',
      capabilities: ['Pre-appointment patient briefing', 'Post-consultation documentation', 'Referral & billing automation', 'Scheduling exception management'],
    },
    {
      sector: 'Logistics',
      icon: <Database size={48} />,
      title: 'Operations Coordination',
      body: 'Your CRM, dispatch platform, and project tools talk to each other in real-time without anyone manually syncing them. Delivery exceptions surface before they become client complaints. Operations managers start the day with a brief on what\'s moving, what\'s at risk, and what needs a decision. Client status updates are drafted and sent automatically.',
      capabilities: ['Real-time cross-tool sync', 'Exception alerts before escalation', 'Daily operations briefing', 'Automated client communication'],
    },
  ];

  const next = () => setIndex((prev) => (prev + 1) % applications.length);
  const prev = () => setIndex((prev) => (prev - 1 + applications.length) % applications.length);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-4">
            Applications
          </p>
          <h2 className="text-4xl md:text-6xl">What Meridian Does In Your Sector</h2>
        </div>
        <div className="flex gap-4 pb-2">
          <button
            onClick={prev}
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex gap-3 mb-12">
        {applications.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-0.5 flex-1 transition-all duration-500 cursor-pointer rounded-full ${i === index ? 'bg-meridian-gold' : 'bg-white/10'
              }`}
          />
        ))}
      </div>

      <div className="relative h-auto min-h-[440px] md:min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.45, ease: 'circOut' }}
            className="grid md:grid-cols-12 gap-12 items-start"
          >
            {/* Sector label */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-meridian-gold">
              {applications[index].icon}
              <h3 className="text-3xl mt-6 font-display">{applications[index].sector}</h3>
              <p className="text-meridian-gold/60 text-sm mt-2 italic font-serif">
                {applications[index].title}
              </p>
            </div>

            {/* Content */}
            <div className="md:col-span-8 space-y-8">
              <p className="text-xl text-meridian-offwhite/60 leading-relaxed">
                {applications[index].body}
              </p>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/30">
                  Capabilities
                </p>
                <div className="flex flex-wrap gap-3">
                  {applications[index].capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-4 py-1.5 rounded-full bg-meridian-gold/10 border border-meridian-gold/20 text-meridian-gold text-sm"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Contact Section
// ---------------------------------------------------------------------------

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Discovery Call Request — ${form.company || form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company || '—'}`,
      `Email: ${form.email}`,
      '',
      'Message:',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-meridian-offwhite placeholder:text-white/20 focus:outline-none focus:border-meridian-gold/40 transition-colors font-serif text-lg';

  return (
    <section id="contact" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <SectionReveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
              Get Started
            </p>
            <h2 className="text-5xl md:text-7xl mb-8 leading-tight">
              Start the conversation.
            </h2>
            <p className="text-xl text-meridian-offwhite/60 leading-relaxed mb-16 font-serif italic">
              A 1-hour discovery call is all it takes. We map your workflows, identify where
              time is leaking most, and send you a custom implementation roadmap within 5
              business days. No commitment required.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 text-meridian-offwhite/60">
                <div className="p-3 bg-meridian-gold/10 rounded-xl border border-meridian-gold/20">
                  <Mail size={20} className="text-meridian-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-lg hover:text-meridian-gold transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 text-meridian-offwhite/60">
                <div className="p-3 bg-meridian-gold/10 rounded-xl border border-meridian-gold/20">
                  <MapPin size={20} className="text-meridian-gold" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                    Location
                  </p>
                  <p className="text-lg">Port Louis, Mauritius</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 glass-card rounded-3xl space-y-5">
              <p className="text-[10px] uppercase tracking-widest text-meridian-gold">
                What happens after you reach out
              </p>
              {[
                'We reply within 1 business day to schedule your discovery call.',
                'On the call, we map your workflows and identify the highest-value automation targets.',
                'Within 5 days you receive a detailed proposal with fixed pricing and projected outcomes.',
                'You decide — no pressure, no retainer until you\'re ready to proceed.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-meridian-gold font-display text-sm mt-0.5">0{i + 1}</span>
                  <p className="text-meridian-offwhite/60 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            {submitted ? (
              <div className="glass-card p-16 rounded-[48px] text-center space-y-6">
                <CheckCircle2 size={64} className="text-meridian-gold mx-auto" />
                <h3 className="text-3xl">Message sent.</h3>
                <p className="text-meridian-offwhite/60 font-serif italic">
                  Your email client should have opened. Expect a response within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[48px] space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  rows={5}
                  placeholder="Briefly describe your business and the biggest time-sinks you deal with daily..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-meridian-gold text-meridian-black py-5 rounded-2xl font-display text-lg tracking-wider hover:bg-white transition-colors duration-300 flex items-center justify-center gap-4 cursor-pointer"
                >
                  Book Discovery Call
                  <ArrowRight size={18} />
                </motion.button>
                <p className="text-center text-[10px] uppercase tracking-widest text-white/20">
                  Complimentary · 1-hour session · Proposal within 5 days
                </p>
              </form>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0.4]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-meridian-gold selection:text-meridian-black overflow-x-hidden"
    >
      <AnimatedBackground />
      <NavBar />

      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="hero"
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      >
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="opacity-15">
            <motion.circle
              cx="500" cy="500" r="300"
              fill="none" stroke="currentColor" strokeWidth="0.5"
              className="text-meridian-gold"
              animate={{ r: [300, 355, 300], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M200,500 L800,500 M500,200 L500,800"
              stroke="currentColor" strokeWidth="0.5"
              className="text-meridian-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 text-[10px] uppercase tracking-[0.5em] text-meridian-gold/60"
          >
            AI Implementation Consultancy · Mauritius
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] md:text-[8vw] leading-none mb-8"
          >
            Meridian
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl font-serif italic text-meridian-offwhite/70 max-w-2xl mx-auto mb-12"
          >
            How would you like some of your time back?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-4 bg-meridian-gold text-meridian-black px-10 py-5 rounded-full font-display text-sm tracking-wider hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              Book Discovery Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button
              onClick={() =>
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-meridian-offwhite/50 text-sm uppercase tracking-widest hover:text-meridian-gold transition-colors cursor-pointer"
            >
              See How It Works ↓
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-meridian-gold/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* What We Do */}
      {/* ------------------------------------------------------------------ */}
      <section id="services" className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <SectionReveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
              What We Do
            </p>
            <h2 className="text-4xl md:text-6xl mb-12 leading-tight">
              The information exists. It just doesn't reach you.
            </h2>
            <div className="space-y-8 text-xl md:text-2xl text-meridian-offwhite/60 leading-relaxed">
              <p>
                Business owners spend the first hours of every day doing work a machine could
                do better — preparing for meetings, chasing updates, writing follow-ups,
                hunting for numbers that should already be in front of them.
              </p>
              <p>
                Meridian is an AI implementation consultancy. We enter your business, map
                exactly where that time is leaking, and build AI systems that close those
                gaps permanently.
                <span className="text-meridian-offwhite italic"> You get the time back.</span>
              </p>
            </div>
          </SectionReveal>

          <SectionReveal className="grid grid-cols-1 gap-8">
            {[
              {
                icon: <Search size={22} />,
                title: 'Meeting Intelligence',
                desc: 'Walk into every meeting already briefed. Meridian pre-loads the context for each calendar item — who\'s in the room, last interaction, relevant numbers, open actions — without you searching for any of it.',
              },
              {
                icon: <FileText size={22} />,
                title: 'Follow-Up Automation',
                desc: 'After every meeting, the summary and follow-up are already drafted. You review, edit, and send. The loop closes in minutes, not hours.',
              },
              {
                icon: <LayoutDashboard size={22} />,
                title: 'Business Visibility',
                desc: 'Instead of hunting across your CRM, accounting software, and project tools — one surface, one view. See the full state of your business in under 60 seconds.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-8 border-l border-meridian-gold/20 space-y-4">
                <div className="flex items-center gap-4 text-meridian-gold">
                  {icon}
                  <h3 className="text-xl">{title}</h3>
                </div>
                <p className="text-meridian-offwhite/50">{desc}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Integration Marquee */}
      {/* ------------------------------------------------------------------ */}
      <IntegrationMarquee />

      {/* ------------------------------------------------------------------ */}
      {/* How It Works */}
      {/* ------------------------------------------------------------------ */}
      <section id="process" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
              The Process
            </p>
            <h2 className="text-5xl md:text-7xl mb-6">From call to running in weeks.</h2>
            <p className="text-meridian-offwhite/50 text-xl font-serif italic max-w-2xl mx-auto">
              A clear four-stage engagement. Fixed fees. No vague deliverables.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: <Search size={28} />,
                title: 'Discovery',
                duration: '1-hour Zoom',
                desc: 'We map where your business is losing time. Meeting prep, follow-ups, information gaps, data scattered across tools. You leave with a clear picture of what\'s costing you most and where the highest-value interventions are.',
              },
              {
                step: '02',
                icon: <FileText size={28} />,
                title: 'Roadmap',
                duration: 'Within 5 days',
                desc: 'A complete implementation plan delivered in writing: what we\'ll build, what it integrates with, what time you\'ll recover, and a fixed project fee. No hourly billing, no ambiguity.',
              },
              {
                step: '03',
                icon: <Settings size={28} />,
                title: 'Build & Deploy',
                duration: '2–4 weeks',
                desc: 'We build your AI systems against your actual workflows and connect them to your existing tools. Weekly updates throughout. Deployed and tested before we hand over. Staff training included.',
              },
              {
                step: '04',
                icon: <LayoutDashboard size={28} />,
                title: 'Meridian App',
                duration: 'Optional',
                desc: 'For clients who want a unified command centre: a proprietary CEO dashboard that surfaces your entire business in one place. Your morning brief, delivered before 9am. Powered by your own data.',
              },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="relative p-8 glass-card rounded-[32px] h-full group hover:border-meridian-gold/30 transition-colors duration-500">
                  <div className="absolute -top-4 -left-2 font-display text-7xl text-white/5 group-hover:text-meridian-gold/10 transition-colors duration-500 select-none">
                    {item.step}
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="text-meridian-gold p-3 bg-meridian-gold/10 rounded-xl inline-block border border-meridian-gold/20">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl mb-1">{item.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-meridian-gold/60">
                        {item.duration}
                      </p>
                    </div>
                    <p className="text-meridian-offwhite/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Product in Action */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-32 bg-meridian-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="text-center mb-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
              In Action
            </p>
            <h2 className="text-5xl md:text-7xl mb-6">
              Intelligence built into your daily tools.
            </h2>
            <p className="text-meridian-gold/60 uppercase tracking-widest text-sm">
              Real automations running across real stacks
            </p>
          </SectionReveal>
          <InAction />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Applications Carousel */}
      {/* ------------------------------------------------------------------ */}
      <section id="applications" className="py-32 border-y border-white/5">
        <ApplicationsCarousel />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Outcomes */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
            What Clients Experience
          </p>
          <h2 className="text-5xl md:text-7xl">Typical Outcomes</h2>
        </SectionReveal>

        <SectionReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: '2–3',
                unit: 'hrs/day',
                desc: 'Average time recovered by senior executives after implementation — from meeting prep, follow-ups, and information gathering alone.',
                note: 'Most clients recover this within the first week of go-live.',
              },
              {
                metric: '2–4',
                unit: 'weeks',
                desc: 'From signed proposal to live, running automations in your production environment.',
                note: 'Most integrations go live in 3 weeks. Complex multi-system builds take 4–6.',
              },
              {
                metric: '< 1',
                unit: 'month ROI',
                desc: 'Time to recoup the initial investment, based on recovered executive capacity at local billing rates.',
                note: 'At MUR 144/hr average, a 2hr/day recovery covers the MUR 40,000 fee in under a month.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-10 rounded-[32px] space-y-6 hover:border-meridian-gold/30 transition-colors duration-500"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-display text-meridian-gold">{item.metric}</span>
                  <span className="text-xl text-meridian-offwhite/40">{item.unit}</span>
                </div>
                <p className="text-lg text-meridian-offwhite/70 leading-relaxed">{item.desc}</p>
                <p className="text-sm text-white/30 italic font-serif">{item.note}</p>
              </div>
            ))}
          </div>


        </SectionReveal>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pricing — 3-phase engagement, all different prices */}
      {/* ------------------------------------------------------------------ */}
      <section id="pricing" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
              Pricing
            </p>
            <h2 className="text-5xl md:text-7xl mb-6">A Clear Engagement.</h2>
            <p className="text-meridian-offwhite/50 text-xl font-serif italic">
              Fixed fees. No hourly billing. No surprises.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* 01 — Discovery */}
            <SectionReveal>
              <div className="glass-card p-10 rounded-[32px] h-full flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
                  01 — Entry
                </p>
                <h3 className="text-3xl mb-4">Discovery Call</h3>
                <p className="text-meridian-offwhite/50 mb-8 leading-relaxed">
                  A 1-hour Zoom session to map where your business is losing time. We identify
                  the highest-value automation opportunities and build a custom roadmap. No
                  commitment required.
                </p>
                <ul className="space-y-3 mb-12 flex-1">
                  {[
                    'Workflow mapping session',
                    'Pain point identification',
                    'Custom implementation roadmap',
                    'No obligation to proceed',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-meridian-offwhite/60"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-meridian-gold flex-shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="text-4xl font-display text-meridian-gold mb-1">
                    Complimentary
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6">
                    No cost. No commitment.
                  </p>
                  <button
                    onClick={() =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="w-full py-4 rounded-2xl border border-white/10 text-white/60 text-sm font-display tracking-wider hover:border-meridian-gold/30 hover:text-meridian-gold transition-all duration-300 cursor-pointer"
                  >
                    Book Your Call
                  </button>
                </div>
              </div>
            </SectionReveal>

            {/* 02 — Implementation */}
            <SectionReveal delay={0.1}>
              <div className="glass-card p-10 rounded-[32px] h-full flex flex-col border-meridian-gold/30 ring-1 ring-meridian-gold/20">
                <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
                  02 — Implementation
                </p>
                <h3 className="text-3xl mb-4">Build & Deploy</h3>
                <p className="text-meridian-offwhite/50 mb-8 leading-relaxed">
                  We build and deploy your complete AI system — integrated into your existing
                  tools, tested against your real workflows, with staff training included.
                </p>

                {/* Deployment options */}
                <div className="mb-8 p-5 bg-white/[0.03] rounded-2xl border border-white/5 space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/30">
                    Deployment options
                  </p>
                  {[
                    { icon: <Smartphone size={14} />, label: 'Mobile Office', sub: 'iPhone-based AI assistant' },
                    { icon: <Monitor size={14} />, label: 'In-Office Node', sub: 'Mac Mini, runs 24/7' },
                    { icon: <Zap size={14} />, label: 'Cloud-Native', sub: 'No new hardware needed' },
                  ].map(({ icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-meridian-gold flex-shrink-0">{icon}</span>
                      <span className="text-sm text-meridian-offwhite/80">{label}</span>
                      <span className="text-xs text-white/30">— {sub}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-12 flex-1">
                  {[
                    'Full AI system build',
                    'Integration with your existing stack',
                    'Staff training & handover',
                    '2–4 week deployment timeline',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-meridian-offwhite/60"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-meridian-gold flex-shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-white/40">MUR</span>
                    <span className="text-5xl font-display">40,000</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6">
                    One-time project fee
                  </p>
                  <button
                    onClick={() =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="w-full py-4 rounded-2xl bg-meridian-gold text-meridian-black text-sm font-display tracking-wider hover:bg-white transition-all duration-300 cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </SectionReveal>

            {/* 03 — Partnership */}
            <SectionReveal delay={0.2}>
              <div className="glass-card p-10 rounded-[32px] h-full flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.4em] text-meridian-gold mb-6">
                  03 — Ongoing
                </p>
                <h3 className="text-3xl mb-4">Monthly Partnership</h3>
                <p className="text-meridian-offwhite/50 mb-8 leading-relaxed">
                  For clients who want to keep expanding. We monitor performance, ship new
                  automations, and grow your AI system as your business evolves.
                </p>
                <ul className="space-y-3 mb-12 flex-1">
                  {[
                    'System monitoring & uptime',
                    'Monthly automation additions',
                    'Priority support access',
                    'Quarterly strategy review',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-meridian-offwhite/60"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-meridian-gold flex-shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-white/40">MUR</span>
                    <span className="text-5xl font-display">8,000</span>
                    <span className="text-xl text-white/40">/mo</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6">
                    Monthly retainer · Cancel anytime
                  </p>
                  <button
                    onClick={() =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="w-full py-4 rounded-2xl border border-white/10 text-white/60 text-sm font-display tracking-wider hover:border-meridian-gold/30 hover:text-meridian-gold transition-all duration-300 cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal className="mt-10 text-center">
            <p className="text-white/30 text-sm font-serif italic">
              All engagements begin with a complimentary discovery call. Fixed fees only —
              no hourly billing.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Contact */}
      {/* ------------------------------------------------------------------ */}
      <ContactSection />

      {/* ------------------------------------------------------------------ */}
      {/* Footer */}
      {/* ------------------------------------------------------------------ */}
      <footer className="px-6 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto pt-16 grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-display text-2xl tracking-tighter">MERIDIAN</h3>
            <p className="text-meridian-offwhite/40 leading-relaxed max-w-xs font-serif">
              AI implementation consultancy based in Mauritius. We give business owners
              their time back.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-meridian-gold/60 hover:text-meridian-gold transition-colors text-sm"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">
              Navigation
            </p>
            {[
              { label: 'Services', id: 'services' },
              { label: 'How It Works', id: 'process' },
              { label: 'Applications', id: 'applications' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() =>
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="block text-meridian-offwhite/40 hover:text-meridian-gold transition-colors text-sm cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">
              Location
            </p>
            <div className="flex items-start gap-3 text-meridian-offwhite/40">
              <MapPin size={14} className="text-meridian-gold mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">
                Port Louis
                <br />
                Mauritius
              </p>
            </div>
            <div className="flex items-center gap-3 text-meridian-offwhite/40">
              <Mail size={14} className="text-meridian-gold flex-shrink-0" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm hover:text-meridian-gold transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-white/20">
          <span>Meridian © 2026</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-meridian-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-meridian-gold transition-colors">
              Terms
            </a>
          </div>
          <span>Idea to Execution, Faster.</span>
        </div>
      </footer>
    </div>
  );
}
