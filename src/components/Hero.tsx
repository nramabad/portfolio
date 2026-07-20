import { useState, useEffect } from 'react'

function useDeviceTier() {
  const [tier, setTier] = useState<'mobile' | 'low' | 'high'>('high')

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    const lowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4
    if (isMobile) setTier('mobile')
    else if (lowCores) setTier('low')
    else setTier('high')
  }, [])

  return tier
}

function LightScene() {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    let frame: number
    const animate = () => {
      setRotation(r => r + 0.005)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: '#08080c' }}>
      {/* Gradient orbs */}
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00ffd2, transparent)',
          top: '30%', left: '20%',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      />
      <div className="absolute w-[250px] h-[250px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #ffd700, transparent)',
          top: '60%', right: '20%',
          transform: `translate(50%, -50%) rotate(${-rotation}deg)`,
        }}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00ffd2 1px, transparent 1px), linear-gradient(90deg, #00ffd2 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

function ThreeScene() {
  // Only import Three.js on non-mobile
  const [Scene, setScene] = useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import('./HeroScene').then(mod => {
      setScene(() => mod.default)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <LightScene />
  }

  return Scene ? <Scene /> : <LightScene />
}

export default function Hero() {
  const tier = useDeviceTier()
  const isMobile = tier === 'mobile'

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#08080c' }}
    >
      {isMobile ? <LightScene /> : <ThreeScene />}

      {/* Overlay text */}
      <div className="relative z-10 text-center pointer-events-none px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-sans tracking-tight"
          style={{ color: '#e8e8ee' }}>
          Navaneet
          <br />
          <span className="text-cyan">Ramabadran</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl font-mono" style={{ color: '#6b6b7b' }}>
          Full-Stack & Systems Engineer
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-mono text-xs sm:text-sm" style={{ color: '#4a4a5a' }}>scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
