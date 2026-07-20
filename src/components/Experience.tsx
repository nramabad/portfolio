const experience = [
  {
    role: 'Software Engineer (Health & Life Sciences)',
    company: 'DocuSign',
    period: '2023 – Present',
    highlights: [
      'Architected inline authentication for Part 11 rapid sign envelopes — user, OAuth, SMS, and ID verification auth in a single flow',
      'Migrated validation report creation/management out of monolith into a dedicated microservice',
      'Coordinated between monolithic API and microservices to enable collaborative fields for Part 11 customers',
    ],
    tech: ['C#', '.NET', 'TypeScript', 'React', 'Nest.js', 'Node.js', 'CosmosDB', 'Azure Pipelines'],
  },
  {
    role: 'Sr Software Engineer (Growth / Extensibility)',
    company: 'CircleCI',
    period: '2021 – 2023',
    highlights: [
      'Led initiative to securely persist IDs bucketed by org for out-of-app, cross-subdomain growth experiments',
      'Re-architected CircleCI CLI commands to support loosely-coupled, standalone VCS-agnostic organizations',
    ],
    tech: ['Go', 'Clojure (JVM)', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'EKS'],
  },
  {
    role: 'Software Engineer (ToFu Marketing)',
    company: 'Ancestry.com',
    period: '2019 – 2021',
    highlights: [
      'Spearheaded adoption of AWS Neptune graph database, Gremlin & GraphQL across the organization',
      'Improved Core Web Vitals & server perf — saved $12K/yr via autoscaling optimization',
      'Architected microservice to cache & expire sensitive data in Cassandra, serving person links performantly',
      'Tripled Googlebot traffic exposing millions of previously uncrawled Historical Person pages',
    ],
    tech: ['React', 'Express', 'Node.js', 'MySQL', 'Cassandra', 'DynamoDB', 'AWS Neptune', 'Gremlin', 'GraphQL', 'Redis', 'K8s', 'Docker'],
  },
  {
    role: 'Data Engineer',
    company: 'QuSwami',
    period: '2017 – 2019',
    highlights: [
      'Streamlined technical data workflow with Python, VBA, DynamoDB dashboards — reduced intake analysis time',
      'Automated chemical deposition of devices with a programmable robot arm to increase throughput',
    ],
    tech: ['Python', 'VBA', 'DynamoDB', 'Robotics'],
  },
  {
    role: 'Electrochemical Engineer',
    company: 'Innovation Economy Laboratory',
    period: '2015 – 2017',
    highlights: [
      'Early-stage CleanTech battery R&D — equivalent-circuit modeling, graphene oxide composites',
    ],
    tech: ['MATLAB', 'Python', 'LabVIEW'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: '#12121a' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffd700' }}>Experience</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #ffd700, transparent)' }} />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px" style={{ background: '#2a2a3a' }} />

          {experience.map((item, idx) => (
            <div key={idx} className="relative pl-0 md:pl-20 pb-12 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] md:left-[27px] top-1.5 w-3 h-3 rounded-full border-2"
                style={{
                  background: '#08080c',
                  borderColor: idx === 0 ? '#00ffd2' : '#ffd700',
                }}
              />

              <div data-timeline-card className="ml-6 md:ml-0 p-5 rounded-lg border"
                style={{
                  background: '#1a1a28',
                  borderColor: '#2a2a3a',
                }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#e8e8ee' }}>{item.role}</h3>
                    <span className="font-mono text-sm" style={{ color: '#00ffd2' }}>{item.company}</span>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full border self-start"
                    style={{
                      color: '#6b6b7b',
                      borderColor: '#2a2a3a',
                      background: '#12121a',
                    }}>
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: '#b0b0c0' }}>
                      <span style={{ color: '#ffd700' }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t, i) => (
                    <span key={i} className="font-mono text-xs px-2 py-1 rounded"
                      style={{ background: '#12121a', color: '#6b6b7b' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
