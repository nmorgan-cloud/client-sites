import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Check, X, ChevronDown, Shield, Star, Users, Zap,
  ArrowRight, Play, Clock, Target, TrendingUp, Eye,
  MessageCircle, Award, Dumbbell, Video, Phone, Calendar
} from 'lucide-react'

// ─────────────────────────────────────────────
// INTERSECTION OBSERVER HOOK (replaces ScrollTrigger for reveals)
// ─────────────────────────────────────────────
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

// ─────────────────────────────────────────────
// COUNTDOWN TIMER
// ─────────────────────────────────────────────
function useCountdown(hours = 23) {
  const [time, setTime] = useState({ h: hours, m: 59, s: 59 })
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        if (s > 0) return { h, m, s: s - 1 }
        if (m > 0) return { h, m: m - 1, s: 59 }
        if (h > 0) return { h: h - 1, m: 59, s: 59 }
        return { h: hours, m: 59, s: 59 }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [hours])
  return time
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar() {
  const time = useCountdown(23)
  const pad = n => String(n).padStart(2, '0')
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void/85 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className="font-black text-sm md:text-base tracking-tight whitespace-nowrap">
          THE <span className="text-brand">DARIUS</span> METHOD
        </span>
        <div className="flex items-center gap-2 text-xs font-mono text-white/60">
          <Clock size={12} className="text-brand" />
          <span className="hidden sm:inline">Spots close in</span>
          <span className="font-bold text-white font-mono">
            {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
          </span>
        </div>
        <a
          href="#apply"
          className="btn-magnetic bg-brand text-white text-xs md:text-sm font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-full whitespace-nowrap red-glow-sm"
        >
          Apply Now →
        </a>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null)
  const headRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(headRef.current.children, { y: 60, opacity: 0, stagger: 0.08, duration: 1 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(ctaRef.current.children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from(mockupRef.current, { y: 50, opacity: 0, duration: 1 }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Geometric background panels */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 h-full w-[45%] opacity-30"
          style={{ background: 'linear-gradient(135deg, #0a1a2e 0%, #0d0d12 100%)', clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)' }}
        />
        <div
          className="absolute top-0 right-0 h-full w-[45%] opacity-30"
          style={{ background: 'linear-gradient(225deg, #0a1a2e 0%, #0d0d12 100%)', clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 30% 100%)' }}
        />
        {/* Red accent lines */}
        <div className="absolute top-1/3 left-[8%] w-px h-32 bg-gradient-to-b from-transparent via-brand to-transparent opacity-40" />
        <div className="absolute top-1/4 right-[8%] w-px h-24 bg-gradient-to-b from-transparent via-brand to-transparent opacity-30" />
        {/* Radial red glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #E8341E 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-1.5 rounded-full text-xs font-semibold text-brand mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
          Limited to 15–20 Active Clients
        </div>

        <div ref={headRef}>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-2">
            Stop Training
          </h1>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-2">
            <span className="text-brand">Blind.</span>
          </h1>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6 text-white/90">
            Start Training With
          </h1>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-8">
            Someone Who's{' '}
            <span className="relative inline-block">
              <span className="text-brand">Done It.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand opacity-40" />
            </span>
          </h1>
        </div>

        <p ref={subRef} className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The exact system behind 394K followers and 7 years of calisthenics mastery.
          Now built around your body, your goals, and your schedule.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#apply" className="btn-magnetic bg-brand text-white font-bold px-10 py-4 rounded-full text-lg red-glow w-full sm:w-auto text-center">
            Apply for Coaching →
          </a>
          <a href="#vsl" className="btn-magnetic flex items-center gap-3 border border-white/15 text-white/80 hover:text-white px-8 py-4 rounded-full text-lg w-full sm:w-auto justify-center transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0">
              <Play size={12} className="text-brand ml-0.5" fill="currentColor" />
            </div>
            Watch the VSL
          </a>
        </div>

        {/* Stats bar */}
        <div ref={mockupRef} className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          {[
            { num: '394K+', label: 'Followers' },
            { num: '7+', label: 'Years Training' },
            { num: '15–20', label: 'Max Clients' },
          ].map(s => (
            <div key={s.label} className="bg-white/[0.04] border border-white/8 rounded-2xl py-4 px-2 backdrop-blur-sm">
              <div className="text-2xl font-black text-brand">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mockup card */}
        <div className="bg-navy/80 border border-white/10 rounded-3xl p-6 backdrop-blur-sm red-glow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-mono text-white/30 text-xs ml-2">darius-method-dashboard</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Active Phase', val: 'Phase 1 — Week 3', color: 'brand' },
              { label: 'Pull-ups', val: '↑ 4 → 11', color: 'green-400' },
              { label: 'Next Check-in', val: 'Thursday 7PM', color: 'white/60' },
            ].map(item => (
              <div key={item.label} className="bg-black/40 rounded-xl p-3 text-left">
                <div className="text-white/30 text-[10px] font-mono mb-1">{item.label}</div>
                <div className={`text-${item.color} font-bold text-sm`}>{item.val}</div>
              </div>
            ))}
          </div>
          <div className="bg-brand/10 border border-brand/20 rounded-xl p-3 text-left">
            <div className="text-white/40 text-[10px] font-mono mb-1">Latest form feedback</div>
            <p className="text-white/80 text-sm">"Your scapular engagement is much cleaner. Pull elbows down and back harder in the top 20%. That's what's holding the muscle-up back."</p>
            <div className="text-brand text-xs mt-2 font-semibold">— Darius</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// VSL SECTION
// ─────────────────────────────────────────────
function VSL() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="vsl" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto reveal">
        <div className="relative bg-navy border border-white/10 rounded-3xl aspect-video flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, #1a0a08 0%, #000 70%)' }} />
          <div className="relative text-center">
            <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center mx-auto mb-5 cursor-pointer btn-magnetic red-glow">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
            <p className="text-white/40 text-sm font-mono">VSL_DARIUS_METHOD_V1.mp4</p>
            <p className="text-white/20 text-xs mt-1">Paste your Vimeo or YouTube embed here</p>
          </div>
          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand/30 rounded-br-lg" />
        </div>
        <p className="text-center text-white/40 mt-6 text-sm">Watch the full video, then apply below.</p>
        <div className="text-center mt-4">
          <a href="#apply" className="btn-magnetic inline-block bg-brand text-white font-bold px-10 py-4 rounded-full text-lg red-glow">Apply for Coaching →</a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// WHO IT'S FOR
// ─────────────────────────────────────────────
function WhoItsFor() {
  const ref = useRef(null)
  useReveal(ref)

  const forItems = [
    "You've been training for months but can't break past the basics",
    "You want to unlock muscle-ups, handstands, or front levers",
    "You're tired of random YouTube routines with no bigger plan",
    "You want a lean, muscular physique — not a bulky gym-bro look",
    "You're willing to train 4–5 days/week and follow a system",
    "You want someone to watch your form and tell you what to fix",
    "You've tried apps or programs and they didn't work",
  ]
  const notForItems = [
    "You want a quick fix or magic pill",
    "You won't train consistently (4 days/week minimum)",
    "You just want a cheap PDF to follow alone",
    "You're not open to coaching adjustments",
    "You're not ready to invest in your training",
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-navy/40 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center">
                <Check size={14} className="text-brand" />
              </div>
              <h2 className="text-xl font-bold text-white">This Is For You If...</h2>
            </div>
            <ul className="space-y-4">
              {forItems.map((item, i) => (
                <li key={i} className="reveal flex items-start gap-3 group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center shrink-0 group-hover:bg-brand/25 transition-colors">
                    <Check size={10} className="text-brand" />
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <X size={14} className="text-white/30" />
              </div>
              <h2 className="text-xl font-bold text-white/30">This Is NOT For You If...</h2>
            </div>
            <ul className="space-y-4">
              {notForItems.map((item, i) => (
                <li key={i} className="reveal flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    <X size={10} className="text-white/20" />
                  </span>
                  <span className="text-white/30 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// THE PROBLEM
// ─────────────────────────────────────────────
function TheProblem() {
  const ref = useRef(null)
  useReveal(ref)

  const problems = [
    { n: '01', icon: <Target size={20} />, title: 'A Plan Built For YOUR Body', body: "Generic programs don't account for your weak points, injury history, or missing prerequisites. They can't know what YOU need." },
    { n: '02', icon: <Eye size={20} />, title: 'Someone Watching YOUR Form', body: "Bad calisthenics form doesn't just slow progress. One bad muscle-up attempt can mean 6 weeks of shoulder recovery." },
    { n: '03', icon: <TrendingUp size={20} />, title: 'Weekly Adjustments', body: "Your body adapts every week. A static program can't keep up. Real coaching evolves with your real progress." },
  ]

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">The Real Problem</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Why You're Not Progressing
            <br />
            <span className="text-white/30">(It's Not Your Fault)</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">The calisthenics space is flooded with content. But none of it gives you the three things that actually create progress:</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map(p => (
            <div key={p.n} className="reveal bg-navy border border-white/8 rounded-3xl p-7 hover:border-brand/30 transition-all duration-300 group">
              <div className="text-brand/40 font-black text-5xl font-mono mb-5 group-hover:text-brand/60 transition-colors">{p.n}</div>
              <div className="w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 bg-brand/5 border border-brand/20 rounded-2xl p-5 text-center">
          <p className="text-white/60 text-sm">Without these three things, you're <span className="text-brand font-semibold">training blind</span>. And training blind is why most people quit calisthenics within 6 months.</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// THE DARIUS METHOD — 4 STEPS
// ─────────────────────────────────────────────
function DariusMethod() {
  const ref = useRef(null)
  useReveal(ref)

  const steps = [
    { n: '01', title: 'Assessment', desc: 'Evaluate pulling, pushing, core, and mobility across 4 dimensions. Pinpoint exactly what\'s holding you back.', icon: <Target size={18} /> },
    { n: '02', title: 'Custom Roadmap', desc: 'A phased program built from scratch for your level, goals, and schedule. Every exercise has a purpose.', icon: <TrendingUp size={18} /> },
    { n: '03', title: 'Weekly Coaching', desc: 'Video form reviews, program adjustments, and a 1-on-1 check-in call every single week.', icon: <Video size={18} /> },
    { n: '04', title: 'Monthly Recalibration', desc: 'Strength tests, skill attempts, physique comparisons every 4 weeks. The plan evolves as you do.', icon: <Calendar size={18} /> },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-navy/40 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">The System</p>
          <h2 className="text-4xl md:text-5xl font-black">
            The Darius Method:
            <br />
            <span className="text-brand">Your Personal Roadmap</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal bg-card border border-white/8 rounded-3xl p-7 hover:border-brand/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-4 right-4 text-white/[0.04] font-black text-8xl font-mono leading-none group-hover:text-white/[0.07] transition-colors">{s.n}</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <span className="font-mono text-xs text-white/30">Step {i + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal text-center mt-10">
          <a href="#apply" className="btn-magnetic inline-block bg-brand text-white font-bold px-10 py-4 rounded-full text-lg red-glow">Apply for Coaching →</a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// WHAT YOU GET — Bonus Stack (alternating)
// ─────────────────────────────────────────────
function BonusStack() {
  const ref = useRef(null)
  useReveal(ref)

  const items = [
    {
      label: 'Core Coaching',
      title: 'Custom Training Program',
      desc: 'Built from scratch for your level, goals, and schedule. Updated every week based on your real performance data.',
      checklist: ['Phased progressions tailored to you', 'Every exercise has a purpose', 'Adapts weekly — nothing static'],
      gradient: 'from-red-900/60 to-red-600/20',
      icon: <Dumbbell size={40} className="text-brand" />,
      tag: 'CORE DELIVERABLE',
      tagColor: 'text-brand',
    },
    {
      label: 'Weekly Touch Point',
      title: 'Video Form Reviews',
      desc: 'Film your key sets. Get frame-by-frame feedback on technique directly from Darius before your next session.',
      checklist: ['Catches form errors you can\'t see yourself', 'Prevents injury before it happens', 'Compounds over time into elite mechanics'],
      gradient: 'from-blue-900/60 to-blue-600/20',
      icon: <Video size={40} className="text-white/70" />,
      tag: 'WEEKLY',
      tagColor: 'text-blue-400',
    },
    {
      label: 'Direct Access',
      title: '1-on-1 Check-In Calls',
      desc: '15–20 minutes every week with Darius. Review progress, troubleshoot problems, plan the week ahead.',
      checklist: ['Real accountability, every 7 days', 'Discuss what\'s working and what\'s not', 'Adjust program in real time'],
      gradient: 'from-purple-900/60 to-purple-600/20',
      icon: <Phone size={40} className="text-white/70" />,
      tag: 'WEEKLY',
      tagColor: 'text-purple-400',
    },
    {
      label: 'Exclusive Bonus',
      title: 'Skill Unlock Library',
      desc: "Darius's personal progression sequences for every major calisthenics skill — the exact steps he used himself.",
      checklist: ['Muscle-up, Handstand, Front Lever, Planche', 'Prerequisites clearly mapped out', 'No guesswork on what to train next'],
      gradient: 'from-amber-900/60 to-amber-600/20',
      icon: <Award size={40} className="text-amber-400" />,
      tag: 'EXCLUSIVE BONUS',
      tagColor: 'text-amber-400',
    },
    {
      label: 'Exclusive Bonus',
      title: 'Quick Win Protocol',
      desc: '14-day jumpstart plan designed to deliver visible improvements in your first two weeks while your full program is built.',
      checklist: ['Immediate progress from day 1', 'Builds momentum and confidence', 'Designed for your current level'],
      gradient: 'from-green-900/60 to-green-600/20',
      icon: <Zap size={40} className="text-green-400" />,
      tag: 'EXCLUSIVE BONUS',
      tagColor: 'text-green-400',
    },
  ]

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">Everything You Get</p>
          <h2 className="text-4xl md:text-5xl font-black">
            Inside <span className="text-brand">The Darius Method</span>
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
            >
              {/* Text side */}
              <div className={`${i % 2 === 1 ? 'md:col-start-2 reveal-right' : 'reveal-left'} space-y-4`}>
                <span className={`font-mono text-xs tracking-widest uppercase ${item.tagColor}`}>{item.tag}</span>
                <h3 className="text-2xl md:text-3xl font-black">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.checklist.map((c, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                      <Check size={14} className="text-brand shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual card */}
              <div className={`${i % 2 === 1 ? 'md:col-start-1 md:row-start-1 reveal-left' : 'reveal-right'}`}>
                <div className={`rounded-3xl p-12 flex items-center justify-center aspect-video bg-gradient-to-br ${item.gradient} border border-white/8 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)' }} />
                  <div className="relative flex flex-col items-center gap-3">
                    {item.icon}
                    <span className="text-white/40 font-mono text-xs text-center">{item.title.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SOCIAL PROOF
// ─────────────────────────────────────────────
function SocialProof() {
  const ref = useRef(null)
  useReveal(ref)

  const testimonials = [
    { quote: "8 months stuck at 6 pull-ups. Darius found my bottleneck in the first assessment. 10 weeks later: first muscle-up.", name: "[Client Name]", loc: "Replace with real testimonial" },
    { quote: "Complete beginner. Couldn't do one pull-up. 6 weeks later: sets of 8. My physique completely changed.", name: "[Client Name]", loc: "Replace with real testimonial" },
    { quote: "Shoulder was bothering me on dips. Darius caught it on form review immediately. No other program would have caught that.", name: "[Client Name]", loc: "Replace with real testimonial" },
    { quote: "Didn't unlock my muscle-up in 90 days — but went from 4 pull-ups to 12 and lost 8 lbs. The transformation was worth it.", name: "[Client Name]", loc: "Replace with real testimonial" },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-navy/40 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">Client Results</p>
          <h2 className="text-4xl md:text-5xl font-black">Real Results From Real Clients</h2>
          <p className="text-white/30 mt-4 text-sm">Replace placeholders with Darius's actual client testimonials + photos.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal bg-card border border-white/8 rounded-3xl p-7 hover:border-brand/20 transition-all duration-300">
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#E8341E" className="text-brand" />)}
              </div>
              <p className="text-white/80 leading-relaxed mb-6 text-sm">"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
                  <Users size={14} className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal text-center mt-10">
          <a href="#apply" className="btn-magnetic inline-block bg-brand text-white font-bold px-10 py-4 rounded-full text-lg red-glow">Apply for Coaching →</a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ABOUT DARIUS
// ─────────────────────────────────────────────
function AboutDarius() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <div className="bg-navy border border-white/10 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 40% 40%, #1a0505 0%, #000 70%)' }} />
            <div className="relative text-center">
              <div className="text-6xl mb-3 opacity-20">📸</div>
              <p className="text-white/20 text-xs font-mono">Add Darius photo here</p>
            </div>
            {/* Frame accents */}
            <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-brand/30" />
            <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-brand/30" />
          </div>
        </div>
        <div className="reveal-right space-y-5">
          <p className="text-brand font-mono text-xs tracking-widest uppercase">Who's Coaching You</p>
          <h2 className="text-4xl font-black">Darius Pitu</h2>
          <p className="text-white/60 leading-relaxed">Started calisthenics at 13 years old. No coach. No gym. Just a pull-up bar and a decision to master his body.</p>
          <p className="text-white/60 leading-relaxed">7 years later — elite physique, mastered skills most people only dream of, and 394K followers watching every step of the journey.</p>
          <p className="text-white/60 leading-relaxed">He's not the oldest coach in the space. But he might be the only one who was in your exact position 5 years ago and can show you the documented proof of every step he took to get here.</p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[['394K+', 'Followers'], ['7+', 'Years'], ['15–20', 'Clients Max']].map(([n, l]) => (
              <div key={l} className="bg-navy/60 border border-white/8 rounded-2xl p-4 text-center">
                <div className="text-brand font-black text-2xl">{n}</div>
                <div className="text-white/30 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// VALUE STACK / PRICING
// ─────────────────────────────────────────────
function ValueStack() {
  const ref = useRef(null)
  useReveal(ref)

  const tiers = [
    { name: 'Foundation', dur: '3 Months', price: '$1,500', monthly: '$550/mo', desc: 'Solid foundations + first 1–2 skill unlocks.', highlight: false },
    { name: 'Transformation', dur: '6 Months', price: '$2,500', monthly: '$467/mo', desc: 'Full physique transformation + multiple skill unlocks.', highlight: true },
    { name: 'Mastery', dur: '12 Months', price: '$4,000', monthly: '$375/mo', desc: 'Complete calisthenics mastery. Advanced skills. Elite physique.', highlight: false },
  ]

  const stackItems = [
    { name: 'Custom Training Program', val: '$997' },
    { name: 'Weekly Video Form Reviews', val: '$800' },
    { name: 'Weekly 1-on-1 Check-In Calls', val: '$600' },
    { name: '24/7 Chat Access (WhatsApp)', val: '$400' },
    { name: 'Phased Skill Roadmap', val: '$297' },
    { name: 'Monthly Progress Assessments', val: '$297' },
    { name: 'BONUS: Skill Unlock Library', val: '$197' },
    { name: 'BONUS: Quick Win Protocol', val: '$97' },
    { name: 'BONUS: Mobility System', val: '$67' },
    { name: 'BONUS: Nutrition Cheat Sheet', val: '$47' },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-navy/40 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black">Three Options.<br /><span className="text-brand">Pick What Fits Your Goals.</span></h2>
          <p className="text-white/40 mt-4">All plans include everything. More time = more results.</p>
        </div>

        {/* Value stack card */}
        <div className="reveal bg-card border border-amber-500/30 rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <h3 className="font-bold text-lg mb-6 text-white/80">Everything included in your program:</h3>
          <div className="space-y-3 mb-8">
            {stackItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <Check size={14} className="text-brand shrink-0" />
                  <span className={`text-sm ${item.name.startsWith('BONUS') ? 'text-amber-400' : 'text-white/70'}`}>{item.name}</span>
                </div>
                <span className="text-white/30 font-mono text-sm">{item.val}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div>
              <p className="text-white/30 text-sm">Total value</p>
              <p className="text-2xl font-black text-white/20 line-through">$3,799</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm">Starting from</p>
              <p className="text-4xl font-black text-brand">$1,500</p>
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div className="reveal grid md:grid-cols-3 gap-5">
          {tiers.map(t => (
            <div
              key={t.name}
              className={`rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all duration-300
                ${t.highlight
                  ? 'bg-brand border-2 border-brand red-glow'
                  : 'bg-card border border-white/8 hover:border-brand/30'}`}
            >
              {t.highlight && (
                <div className="absolute -top-px left-0 right-0 flex justify-center">
                  <span className="bg-white text-brand text-[10px] font-black px-4 py-1 rounded-b-xl tracking-widest">RECOMMENDED</span>
                </div>
              )}
              <div className="mt-4 mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${t.highlight ? 'text-white/70' : 'text-brand'}`}>{t.name}</p>
                <p className={`text-3xl font-black mb-1 ${t.highlight ? 'text-white' : 'text-white'}`}>{t.price}</p>
                <p className={`text-sm ${t.highlight ? 'text-white/60' : 'text-white/40'}`}>or {t.monthly}</p>
              </div>
              <p className={`text-sm leading-relaxed flex-1 mb-6 ${t.highlight ? 'text-white/80' : 'text-white/50'}`}>{t.desc}</p>
              <a
                href="#apply"
                className={`btn-magnetic text-center font-bold py-3 rounded-full transition-all duration-300 block text-sm
                  ${t.highlight
                    ? 'bg-white text-brand hover:bg-white/90'
                    : 'border border-brand text-brand hover:bg-brand hover:text-white'}`}
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
        <p className="reveal text-center text-white/20 mt-5 text-sm font-mono">As low as $11/day — less than your daily coffee.</p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// GUARANTEE
// ─────────────────────────────────────────────
function Guarantee() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center reveal">
        <div className="relative bg-card border border-amber-500/20 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 50% 0%, #FFA500 0%, transparent 60%)' }} />
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-8">
              <Shield size={36} className="text-amber-400" />
            </div>
            <p className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-4">Zero Risk</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">The Skill Unlock Guarantee</h2>
            <p className="text-white/60 leading-relaxed mb-6">Follow the program for 90 days. Do every workout. Send your weekly form videos. Show up to your check-in calls.</p>
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-6 mb-6">
              <p className="text-white font-semibold text-lg">If you haven't unlocked at least one new calisthenics skill AND seen measurable strength improvements, Darius will keep coaching you for free until you do.</p>
            </div>
            <p className="text-white/30 text-sm">No time limit. No fine print. Plus a 7-day "right fit" window — walk away in the first week for any reason.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  useReveal(ref)

  const faqs = [
    { q: "I'm a complete beginner. Can I still apply?", a: "Yes. Some of Darius's best results come from beginners. The assessment figures out where you are and the program builds from there. If you can't do a single pull-up yet, that's fine — you'll be doing sets within weeks." },
    { q: "Do I need a gym or equipment?", a: "A pull-up bar is recommended (a park works too). A dip station is optional but helpful. No gym required. No weights. The entire program is built around bodyweight training." },
    { q: "How much time does this take per day?", a: "Training sessions are 45–60 minutes, 4–5 days per week. Plus a 15-minute mobility routine daily. Weekly check-in calls are 15–20 minutes. Total extra time beyond workouts: about 40 minutes per week." },
    { q: "What if I've tried other programs and they didn't work?", a: "Programs fail because they're generic. They don't know your weak points, watch your form, or adjust. This is fundamentally different — it's coaching built around you specifically." },
    { q: "Is there a payment plan?", a: "Yes. All three options have monthly payment plans. The specifics are discussed on your application call." },
    { q: "What's the application process?", a: "Fill out the short form below (2 minutes). Darius personally reviews every application. If it looks like a fit, you'll book a 15-minute call to discuss your goals. No pressure, no hard sell." },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-navy/40 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="text-4xl font-black">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal bg-card border border-white/8 rounded-2xl overflow-hidden hover:border-brand/20 transition-colors duration-300">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
              >
                <span className="font-semibold text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-brand shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`faq-body ${open === i ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// APPLICATION FORM
// ─────────────────────────────────────────────
function ApplicationForm() {
  const ref = useRef(null)
  useReveal(ref)

  const inputCls = "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_3px_rgba(232,52,30,0.15)]"
  const radioCls = "flex items-center gap-3 bg-black/40 border border-white/8 rounded-xl px-4 py-3 cursor-pointer hover:border-brand/40 transition-all duration-200"

  return (
    <section id="apply" ref={ref} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-brand font-mono text-xs tracking-widest uppercase mb-4">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to Stop Guessing?
          </h2>
          <p className="text-white/50">Spots are limited. Darius reviews every application personally.</p>
        </div>

        <div className="reveal bg-navy border border-white/8 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

          <form className="space-y-6" action="#" method="POST">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="reveal space-y-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">First Name *</label>
                <input type="text" name="first_name" required placeholder="Your first name" className={inputCls} />
              </div>
              <div className="reveal space-y-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email *</label>
                <input type="email" name="email" required placeholder="your@email.com" className={inputCls} />
              </div>
            </div>

            <div className="reveal space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Instagram Handle</label>
              <input type="text" name="instagram" placeholder="@yourhandle (so Darius can see your training)" className={inputCls} />
            </div>

            <div className="reveal space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">Experience Level *</label>
              <div className="grid grid-cols-2 gap-2">
                {[['beginner_new', 'Just starting (<3 months)'], ['beginner', 'Beginner (3–6 months)'], ['intermediate', 'Intermediate (6–12 months)'], ['experienced', 'Experienced (1+ year)']].map(([v, l]) => (
                  <label key={v} className={radioCls}>
                    <input type="radio" name="experience" value={v} className="accent-brand" required />
                    <span className="text-sm text-white/70">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="reveal space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">#1 Skill Goal *</label>
              <select name="goal_skill" required className={inputCls + ' appearance-none'}>
                <option value="" disabled defaultValue="">Select your goal</option>
                <option value="muscle_up">Muscle-up</option>
                <option value="handstand">Handstand</option>
                <option value="front_lever">Front Lever</option>
                <option value="back_lever">Back Lever</option>
                <option value="planche">Planche progressions</option>
                <option value="physique">Build a great physique</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="reveal space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">What have you tried that hasn't worked? *</label>
              <textarea name="what_tried" required rows={3} placeholder="YouTube videos, apps, programs... what happened?" className={inputCls + ' resize-none'} />
            </div>

            <div className="reveal space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">Why are you applying now? *</label>
              <textarea name="why_now" required rows={3} placeholder="Be honest. This helps Darius understand where you're at." className={inputCls + ' resize-none'} />
            </div>

            <div className="reveal space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">Program Interest *</label>
              <div className="space-y-2">
                {[
                  ['foundation', 'Foundation — 3 months ($1,500)', false],
                  ['transformation', 'Transformation — 6 months ($2,500) · RECOMMENDED', true],
                  ['mastery', 'Mastery — 12 months ($4,000)', false],
                  ['unsure', "Not sure yet — I'll decide on the call", false],
                ].map(([v, l, recommended]) => (
                  <label key={v} className={`${radioCls} ${recommended ? 'border-brand/20' : ''}`}>
                    <input type="radio" name="program" value={v} className="accent-brand" required />
                    <span className={`text-sm ${recommended ? 'text-brand font-semibold' : 'text-white/70'}`}>{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="reveal space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">Ready to start within 2 weeks? *</label>
              <div className="grid grid-cols-2 gap-2">
                {[['yes', "Yes, I'm ready"], ['soon', 'Need a bit of time']].map(([v, l]) => (
                  <label key={v} className={radioCls}>
                    <input type="radio" name="start_ready" value={v} className="accent-brand" required />
                    <span className="text-sm text-white/70">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="reveal pt-2">
              <button
                type="submit"
                className="btn-magnetic w-full bg-brand text-white font-black text-lg py-5 rounded-full red-glow"
              >
                Submit My Application →
              </button>
              <p className="text-center text-white/25 text-xs mt-4 font-mono">After you submit, you'll book a quick call with Darius. Spots are limited.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy/60 border-t border-white/5 py-12 px-6 rounded-t-[3rem]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-black text-xl mb-2 tracking-tight">THE <span className="text-brand">DARIUS</span> METHOD</p>
        <p className="text-white/30 text-sm mb-6">
          Questions? DM{' '}
          <a href="https://instagram.com/dariusworkout" target="_blank" rel="noreferrer" className="text-brand hover:underline">
            @dariusworkout
          </a>{' '}
          on Instagram.
        </p>
        <p className="text-white/15 text-xs font-mono">© 2025 The Darius Method. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <Hero />
      <VSL />
      <WhoItsFor />
      <TheProblem />
      <DariusMethod />
      <BonusStack />
      <SocialProof />
      <AboutDarius />
      <ValueStack />
      <Guarantee />
      <FAQ />
      <ApplicationForm />
      <Footer />
    </div>
  )
}
