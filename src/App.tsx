import { useEffect, lazy, Suspense } from 'react'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

const Hero = lazy(() => import('./components/Hero'))

export default function App() {
  useEffect(() => {
    // Dynamic GSAP + ScrollTrigger — only on non-mobile
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    if (isMobile) return

    ;(async () => {
      const mod = await import('gsap')
      const gsap = mod.default
      const stMod = await import('gsap/ScrollTrigger')
      const ScrollTrigger = stMod.default
      gsap.registerPlugin(ScrollTrigger)

      // 1. Hero canvas scroll dispersion — fade + scale out as you scroll past hero
      const heroCanvas = document.querySelector('[data-hero-canvas]') as HTMLElement | null
      if (heroCanvas) {
        gsap.to(heroCanvas, {
          opacity: 0,
          scale: 0.92,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // 2. Section reveal animations (staggered entrance)
      document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      // 3. Timeline card stagger
      document.querySelectorAll('[data-timeline-card]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })

      // 4. Project card stagger
      document.querySelectorAll('[data-project-card]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })

      ScrollTrigger.refresh()
    })()
  }, [])

  return (
    <div>
      {/* Fixed header nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(8,8,12,0.85)', borderBottom: '1px solid #2a2a3a' }}>
        <nav className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
          <a href="#hero" className="font-mono text-sm font-bold tracking-wider" style={{ color: '#00ffd2' }}>NR</a>
          <ul className="flex gap-6 font-mono text-xs" style={{ color: '#6b6b7b' }}>
            <li><a href="#about" className="hover:text-cyan transition-colors">About</a></li>
            <li><a href="#experience" className="hover:text-gold transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-cyan transition-colors">Projects</a></li>
            <li><a href="#skills" className="hover:text-gold transition-colors">Skills</a></li>
            <li><a href="#contact" className="hover:text-cyan transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Lazy-loaded Hero with Three.js canvas scroll target */}
      <div data-hero-canvas>
        <Suspense fallback={
          <section className="w-full h-screen flex items-center justify-center" style={{ background: '#08080c' }}>
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <span className="font-mono text-sm" style={{ color: '#6b6b7b' }}>Loading...</span>
            </div>
          </section>
        }>
          <Hero />
        </Suspense>
      </div>

      <main>
        <div data-reveal><About /></div>
        <div data-reveal><Experience /></div>
        <div data-reveal><Projects /></div>
        <div data-reveal><Skills /></div>
        <Contact />
      </main>
    </div>
  )
}
