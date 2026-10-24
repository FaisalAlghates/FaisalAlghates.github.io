import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile, stats, experience, skills, projects } from './data.js'

const Scene = lazy(() => import('./Scene.jsx'))

const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
)
const LinkedinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
)
const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M8 7h9v9"/></svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
}

function Reveal({ children, i = 0, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      {children}
    </motion.div>
  )
}

function SectionTitle({ index, title, sub }) {
  return (
    <Reveal className="mb-14">
      <p className="font-display text-sm tracking-[0.3em] text-neon/80">{index} — {sub}</p>
      <h2 className="font-display mt-3 text-4xl font-bold sm:text-6xl">{title}</h2>
    </Reveal>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const links = ['About', 'Experience', 'Skills', 'Work', 'Contact']
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div style={{ scaleX: w }} className="h-[2px] origin-left bg-gradient-to-r from-neon via-violet to-gold" />
      <nav className="glass mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-full px-5 py-3 sm:px-7">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {profile.name}<span className="text-neon">.</span>
        </a>
        <ul className="hidden gap-8 text-sm text-zinc-300 sm:flex">
          {links.map((l) => (
            <li key={l}><a className="transition hover:text-neon" href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-zinc-300 transition hover:text-white"><GithubIcon className="h-5 w-5" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-zinc-300 transition hover:text-white"><LinkedinIcon className="h-5 w-5" /></a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="ml-1 flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden">
            <span className={`h-px w-5 bg-white transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-white transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>
      {open && (
        <ul className="glass mx-4 mt-2 rounded-3xl p-3 sm:hidden">
          {links.map((l) => (
            <li key={l}><a onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-zinc-200 active:bg-white/10" href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}

function Typewriter({ words }) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const t = setTimeout(() => {
      if (!del) {
        setTxt(w.slice(0, txt.length + 1))
        if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1200)
      } else {
        setTxt(w.slice(0, txt.length - 1))
        if (txt.length - 1 === 0) { setDel(false); setI(i + 1) }
      }
    }, del ? 40 : 85)
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return <span className="text-grad">{txt}<span className="animate-pulse text-neon">|</span></span>
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center px-6 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-zinc-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon" /> AVAILABLE FOR WORK
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }} className="font-display text-5xl font-bold leading-[1.02] sm:text-7xl lg:text-8xl">
          Hi, I'm <br className="sm:hidden" /><span className="text-grad">{profile.name}</span>
          <br />
          <span className="text-3xl font-medium text-zinc-200 sm:text-5xl lg:text-6xl"><Typewriter words={profile.roles} /></span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 max-w-xl text-lg font-light text-zinc-400">
          {profile.tagline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-black transition hover:bg-neon">
            View my work <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 transition hover:border-white/30"><GithubIcon className="h-5 w-5" /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 transition hover:border-white/30"><LinkedinIcon className="h-5 w-5" /> LinkedIn</a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-zinc-500 sm:flex">
        SCROLL
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-neon to-transparent" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="01" sub="ABOUT" title="Engineering with purpose." />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-lg font-light leading-relaxed text-zinc-300">
            {profile.about.map((p, i) => <Reveal key={i} i={i}><p>{p}</p></Reveal>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} i={i}>
                <div className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-neon/40">
                  <div className="font-display text-4xl font-bold text-grad sm:text-5xl">{s.value}</div>
                  <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="02" sub="EXPERIENCE" title="Where I've worked." />
        <div className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} i={i}>
              <div className="glass relative rounded-3xl p-7 transition hover:border-neon/40">
                <span className="absolute -left-[33px] top-9 h-3 w-3 rounded-full bg-neon shadow-[0_0_14px_#5eead4] sm:-left-[49px]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold">{e.role} <span className="text-grad">@ {e.company}</span></h3>
                  <span className="text-sm text-zinc-400">{e.period}</span>
                </div>
                <p className="mt-1 text-xs tracking-widest text-neon/80">{e.type.toUpperCase()}</p>
                <ul className="mt-5 space-y-2 text-sm font-light leading-relaxed text-zinc-300">
                  {e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="03" sub="SKILLS" title="My toolkit." />
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((g, i) => (
            <Reveal key={g.group} i={i}>
              <div className="glass h-full rounded-3xl p-7">
                <h3 className="font-display text-xl font-medium text-white">{g.group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 transition hover:border-neon/60 hover:text-neon">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ p, i }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0, x: 50, y: 50 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setT({ rx: (0.5 - y) * 14, ry: (x - 0.5) * 14, x: x * 100, y: y * 100 })
  }
  return (
    <Reveal i={i % 3} className="[perspective:1000px]">
      <a
        ref={ref}
        href={p.private ? undefined : p.link}
        target="_blank"
        rel="noreferrer"
        onMouseMove={move}
        onMouseLeave={() => setT({ rx: 0, ry: 0, x: 50, y: 50 })}
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: 'transform .15s ease-out' }}
        className={`glass group relative block h-full overflow-hidden rounded-3xl p-7 [transform-style:preserve-3d] ${p.private ? 'cursor-default' : ''}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(400px circle at ${t.x}% ${t.y}%, ${p.color}26, transparent 60%)` }} />
        <div className="relative [transform:translateZ(40px)]">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-widest" style={{ color: p.color }}>{p.tag.toUpperCase()}</span>
            {p.private ? <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] tracking-widest text-zinc-300">🔒 PRIVATE</span> : <ArrowIcon className="h-5 w-5 text-zinc-500 transition group-hover:text-white" />}
          </div>
          <div className="my-8 h-24 rounded-2xl" style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}55, transparent 60%), linear-gradient(135deg, ${p.color}22, transparent)`, border: `1px solid ${p.color}33` }}>
            <div className="flex h-full items-center justify-center font-display text-3xl font-bold tracking-tight" style={{ color: p.color }}>{p.title.slice(0, 2).toUpperCase()}</div>
          </div>
          <h3 className="font-display text-2xl font-bold">{p.title}</h3>
          <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">{s}</span>)}
            {p.live && <span className="rounded-full px-3 py-1 text-xs" style={{ background: p.color + '22', color: p.color }}>● Live demo</span>}
          </div>
        </div>
      </a>
    </Reveal>
  )
}

function Work() {
  return (
    <section id="work" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="04" sub="SELECTED WORK" title="Projects I'm proud of." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <TiltCard key={p.title} p={p} i={i} />)}
          <Reveal i={2} className="[perspective:1000px]"><a href={profile.github + '?tab=repositories'} target="_blank" rel="noreferrer" className="glass group flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-3xl p-7 text-center transition hover:border-neon/40"><GithubIcon className="h-10 w-10 text-zinc-300 transition group-hover:text-neon" /><span className="font-display text-2xl font-bold">All repositories</span><span className="inline-flex items-center gap-1 text-sm text-zinc-400">See everything on GitHub <ArrowIcon className="h-4 w-4" /></span></a></Reveal>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="px-6 pb-16 pt-32 sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-display text-sm tracking-[0.3em] text-neon/80">05 — CONTACT</p>
          <h2 className="font-display mt-4 text-5xl font-bold sm:text-7xl">Let's build something <span className="text-grad">extraordinary.</span></h2>
          <p className="mx-auto mt-6 max-w-xl font-light text-zinc-400">Have a project, an idea, or just want to say hi? My inbox is always open.</p>
        </Reveal>
        <Reveal i={2} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={`mailto:${profile.email}`} className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-neon">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-6 py-4 transition hover:border-white/30"><GithubIcon className="h-5 w-5" /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-6 py-4 transition hover:border-white/30"><LinkedinIcon className="h-5 w-5" /> LinkedIn</a>
        </Reveal>
        <p className="mt-24 text-xs text-zinc-600">© {new Date().getFullYear()} {profile.fullName}. Built with React, Three.js & Tailwind.</p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="grain relative">
      <Suspense fallback={null}><Scene /></Suspense>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
    </div>
  )
}



