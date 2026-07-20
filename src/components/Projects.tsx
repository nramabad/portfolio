const projects = [
  {
    name: 'signal-serve',
    description: 'Secure lightweight RIIR server for integrating Signal Messenger API with Hermes self-improving AI agent in low-resource environments. Links secondary devices via QR code, listens for messages, reactions, and attachments.',
    tech: ['Rust', 'Tokio', 'Axum', 'SQLite', 'Presage'],
    url: 'https://github.com/nramabad/signal-serve',
  },
  {
    name: 'aud.io',
    description: 'Standalone API to process & normalize MP3s for Alexa with cached responses, configurable options (bitrate, loudness normalization). Accepts download URL, file stream or form data POST — responds with file stream or pre-signed S3 URL.',
    tech: ['Node.js', 'HTTP/HTTPS', 'AWS S3', 'FFmpeg'],
    url: 'https://github.com/nramabad/aud.io',
  },
  {
    name: 'FlexJobs',
    description: 'Job portal matching software developers with openings by parsing resumes & listings for keywords. Uses Dice Coefficient string comparison to generate match percentages between resumes and job descriptions.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'D3.js'],
    url: 'https://github.com/nramabad/FlexJobs',
  },
  {
    name: 'Clone-ify',
    description: 'Feature-rich clone of Spotify Web Player with user profiles, artists, albums, playlists, and seed music data hosted in S3. Reduced audio frequency buffer overload & improved rendering latency by over 80%.',
    tech: ['PostgreSQL', 'Ruby on Rails', 'React', 'Redux', 'AWS S3'],
    url: 'https://github.com/nramabad/clone-ify',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: '#08080c' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#00ffd2' }}>Projects</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #00ffd2, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border transition-all duration-200 hover:-translate-y-1"
              style={{
                background: '#12121a',
                borderColor: '#2a2a3a',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = idx % 2 === 0 ? '#00ffd2' : '#ffd700'
                e.currentTarget.style.boxShadow = `0 0 20px ${idx % 2 === 0 ? 'rgba(0,255,210,0.1)' : 'rgba(255,215,0,0.1)'}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a3a'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 className="text-lg font-semibold mb-2 font-mono" style={{ color: idx % 2 === 0 ? '#00ffd2' : '#ffd700' }}>
                {p.name}
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#b0b0c0' }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 rounded"
                    style={{ background: '#08080c', color: '#6b6b7b' }}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/nramabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm px-6 py-3 rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: '#2a2a3a',
              color: '#e8e8ee',
              background: '#1a1a28',
            }}
          >
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
