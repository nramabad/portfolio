const skillCategories = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Clojure', 'Rust', 'C#', 'Ruby', 'Java', 'C++', 'SQL', 'Gremlin', 'MATLAB'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Redux', 'Preact', 'Canvas', 'Material-UI', 'Tailwind CSS', 'HTML5/CSS3', 'D3.js'],
  },
  {
    label: 'Backend & API',
    skills: ['Node.js', 'Express', 'Nest.js', 'Apollo', 'GraphQL', 'gRPC', 'Rails', 'Django', 'ASP.NET'],
  },
  {
    label: 'Datastores',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'DynamoDB', 'Redis', 'AWS Neptune', 'CosmosDB', 'S3', 'SQLite'],
  },
  {
    label: 'DevOps & Infra',
    skills: ['Docker', 'Kubernetes', 'EKS', 'Fargate', 'CircleCI', 'Jenkins', 'Terraform', 'AWS EC2/EMR', 'Datadog', 'Grafana'],
  },
  {
    label: 'Data Science & ML',
    skills: ['Pandas', 'SciKit-Learn', 'Hadoop MapReduce', 'Spark', 'Jupyter', 'Six Sigma Green Belt', 'FMEA', 'Optimizely'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: '#12121a' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffd700' }}>Skills</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #ffd700, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-5 rounded-lg border"
              style={{ background: '#1a1a28', borderColor: '#2a2a3a' }}>
              <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: idx % 2 === 0 ? '#00ffd2' : '#ffd700' }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, i) => (
                  <span key={i} className="font-mono text-xs px-2.5 py-1 rounded transition-colors duration-150"
                    style={{ background: '#08080c', color: '#b0b0c0' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#2a2a3a'; e.currentTarget.style.color = '#e8e8ee' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#08080c'; e.currentTarget.style.color = '#b0b0c0' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
