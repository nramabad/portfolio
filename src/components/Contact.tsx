export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#08080c' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, #2a2a3a, transparent)' }} />
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#00ffd2' }}>Contact</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #2a2a3a, transparent)' }} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let's <span style={{ color: '#00ffd2' }}>connect</span>
        </h2>
        <p className="mb-10 max-w-lg mx-auto" style={{ color: '#6b6b7b' }}>
          If you're hiring, collaborating, or just want to talk distributed systems, graph databases, or battery tech — reach out.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="https://linkedin.com/in/nramabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: '#00ffd2',
              color: '#00ffd2',
              background: 'rgba(0,255,210,0.05)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/nramabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: '#2a2a3a',
              color: '#e8e8ee',
              background: '#1a1a28',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="mailto:nramabad@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: '#ffd700',
              color: '#ffd700',
              background: 'rgba(255,215,0,0.05)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            nramabad@gmail.com
          </a>
        </div>

        {/* Publications */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: '#2a2a3a' }}>
          <div className="flex items-center gap-3 mb-6 justify-center">
            <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#6b6b7b' }}>Publications</span>
          </div>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="p-4 rounded-lg border" style={{ background: '#1a1a28', borderColor: '#2a2a3a' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#b0b0c0' }}>
                <strong style={{ color: '#e8e8ee' }}>Machine Learning for Non-linear Equivalent-Circuit Cell Model for Li-Ion Battery State of Charge Estimation</strong>
              </p>
            </div>
            <div className="p-4 rounded-lg border" style={{ background: '#1a1a28', borderColor: '#2a2a3a' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#b0b0c0' }}>
                <strong style={{ color: '#e8e8ee' }}>Microwave Exfoliated Graphene Oxide/TiO₂ Nanowire Hybrid for High Performance Lithium Ion Battery</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 font-mono text-xs" style={{ color: '#4a4a5a' }}>
          Navaneet Ramabadran &middot; Built with React + Three.js
        </div>
      </div>
    </section>
  )
}
