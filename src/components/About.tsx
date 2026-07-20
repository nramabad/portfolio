export default function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#08080c' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#00ffd2' }}>About</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #00ffd2, transparent)' }} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          From&nbsp;<span style={{ color: '#ffd700' }}>Electrochemical Engineering</span>
          &nbsp;to&nbsp;<span style={{ color: '#00ffd2' }}>Full-Stack & Systems</span>
        </h2>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: '#b0b0c0' }}>
          <p>
            I started in battery technology research — building equivalent-circuit models,
            synthesizing graphene oxide composites, and automating chemical deposition with robot arms.
            Somewhere along the way, I realized I cared more about the <em>systems</em> that process data
            than the materials that store it.
          </p>
          <p>
            Since then, I've shipped authentication infrastructure at <strong style={{ color: '#e8e8ee' }}>DocuSign</strong>,
            architected growth experiments from the CLI up at <strong style={{ color: '#e8e8ee' }}>CircleCI</strong>,
            and led the adoption of graph databases at <strong style={{ color: '#e8e8ee' }}>Ancestry.com</strong>.
            My work lives at the intersection of distributed systems, developer tooling, and clean API design.
          </p>
          <p>
            I write TypeScript, React, Go, Clojure, Rust, and Python —
            and I still read battery literature for fun.
          </p>
        </div>
      </div>
    </section>
  )
}
