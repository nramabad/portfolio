import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ─── Color palette ───────────────────────────────────────────────
const TEAL = '#00ffd2'
const GOLD = '#ffd700'
const MAGENTA = '#ff4d85'
const DARK_BG = '#0a0a0f'

// ─── Centerpiece: pulsing torus knot ─────────────────────────────
function TorusKnotCenter() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.12 + pointer.y * 0.15
      meshRef.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.25
      const pulse = 1 + Math.sin(clock.elapsedTime * 0.4) * 0.06
      meshRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.65, 0.25, 160, 32]} />
      <MeshDistortMaterial
        color={TEAL}
        roughness={0.1}
        metalness={0.95}
        distort={0.3}
        speed={2}
        emissive={TEAL}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// ─── Orbital trail rings (so 3D paths are visible immediately) ───
function OrbitalTrails() {
  const radii = [1.5, 2.0, 2.6]
  return (
    <>
      {radii.map((r, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[i * 0.3, i * 0.5, 0]}>
          <ringGeometry args={[r - 0.004, r + 0.004, 80]} />
          <meshBasicMaterial
            color={i === 1 ? TEAL : i === 0 ? MAGENTA : GOLD}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  )
}

// ─── Orbiting objects: large enough to read as 3D ────────────────
function OrbitingObjects() {
  const groupRef = useRef<THREE.Group>(null!)

  const objects = useMemo(() => [
    { radius: 1.5, speed: 0.6, offset: 0, size: 0.2, color: MAGENTA, alt: TEAL },
    { radius: 2.0, speed: -0.4, offset: Math.PI / 3, size: 0.25, color: TEAL, alt: GOLD },
    { radius: 2.6, speed: 0.3, offset: Math.PI, size: 0.22, color: GOLD, alt: MAGENTA },
  ], [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => {
        const x = Math.cos(obj.offset) * obj.radius
        const z = Math.sin(obj.offset) * obj.radius
        return (
          <group key={i}>
            {/* Main body */}
            <mesh position={[x, 0, z]}>
              <dodecahedronGeometry args={[obj.size, 0]} />
              <meshStandardMaterial
                color={obj.color}
                roughness={0.15}
                metalness={0.85}
                emissive={obj.color}
                emissiveIntensity={0.4}
              />
            </mesh>
            {/* Wireframe overlay to read as 3D instantly */}
            <mesh position={[x, 0, z]}>
              <dodecahedronGeometry args={[obj.size * 1.02, 0]} />
              <meshBasicMaterial
                color={obj.alt}
                wireframe
                transparent
                opacity={0.35}
              />
            </mesh>
            {/* Glow point at center of each orbit */}
            <pointLight position={[x, 0, z]} intensity={0.3} color={obj.color} distance={1.5} />
          </group>
        )
      })}
    </group>
  )
}

// ─── Background particle cloud ──────────────────────────────────
function ParticleField() {
  const count = 1500
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6 // flatten vertically
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const hue = 0.75 + Math.random() * 0.15 // purple-magenta range
      const c = new THREE.Color().setHSL(hue, 0.7, 0.35 + Math.random() * 0.25)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.012
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.006) * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors sizeAttenuation depthWrite={false} transparent opacity={0.6} />
    </points>
  )
}

// ─── Background ambient glow ─────────────────────────────────────
function AmbientGlow() {
  return (
    <>
      <Sparkles count={60} scale={8} size={0.6} speed={0.2} color={TEAL} opacity={0.1} />
      <Sparkles count={40} scale={6} size={0.4} speed={0.15} color={MAGENTA} opacity={0.08} />
    </>
  )
}

// ─── Solar Corona effect ──────────────────────────────────────────
function CoronaRing({ index, baseRadius }: { index: number; baseRadius: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const colors = [TEAL, '#00bfff', '#4d8aff', '#00e5ff']
  const color = colors[index % colors.length]
  const speed = 0.25 + index * 0.12
  const phase = index * 1.5

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime
      const pulse = 1 + Math.sin(t * speed + phase) * 0.25
      const opacity = 0.08 + Math.sin(t * speed * 0.6 + phase) * 0.06 + 0.06
      meshRef.current.scale.setScalar(pulse)
      meshRef.current.rotation.z = Math.sin(t * 0.2 + phase) * 0.2
      meshRef.current.rotation.x = Math.sin(t * 0.15 + phase * 0.7) * 0.15
      ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0.03, opacity)
    }
  })

  const ringWidth = 0.06 + index * 0.02

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[index * 0.35, index * 0.25, 0]}
    >
      <ringGeometry args={[baseRadius - ringWidth, baseRadius + ringWidth, 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function CoronaRays() {
  const count = 400
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const r = 0.35 + Math.random() * 0.15
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5
      pos[i * 3 + 2] = r * Math.cos(phi)

      const colorVal = new THREE.Color(TEAL).lerp(new THREE.Color('#4d8aff'), Math.random() * 0.6)
      col[i * 3] = colorVal.r
      col[i * 3 + 1] = colorVal.g
      col[i * 3 + 2] = colorVal.b
    }
    return { positions: pos, colors: col }
  }, [])

  const pointsRef = useRef<THREE.Points>(null!)
  const dirsRef = useRef<{ dir: THREE.Vector3; speed: number; length: number }[]>([])

  useMemo(() => {
    const dirs: { dir: THREE.Vector3; speed: number; length: number }[] = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      dirs.push({
        dir: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta) * 0.5,
          Math.cos(phi)
        ).normalize(),
        speed: 0.08 + Math.random() * 0.25,
        length: 0.5 + Math.random() * 1.5,
      })
    }
    dirsRef.current = dirs
  }, [])

  const progress = useRef(new Float32Array(count).map(() => Math.random()))

  useFrame(({ clock }) => {
    if (pointsRef.current && dirsRef.current.length) {
      const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      const positions = positionAttr.array as Float32Array
      const t = clock.elapsedTime
      for (let i = 0; i < count; i++) {
        const p = (progress.current[i] + 0.003 * dirsRef.current[i].speed) % 1
        progress.current[i] = p
        const r = 0.35 + p * dirsRef.current[i].length
        positions[i * 3] = dirsRef.current[i].dir.x * r
        positions[i * 3 + 1] = dirsRef.current[i].dir.y * r
        positions[i * 3 + 2] = dirsRef.current[i].dir.z * r
      }
      positionAttr.needsUpdate = true

      const pulse = 0.2 + Math.sin(t * 0.35) * 0.12
      ;(pointsRef.current.material as THREE.PointsMaterial).opacity = Math.max(0.05, pulse)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function SolarCorona() {
  return (
    <group>
      {/* Central intense blue glow sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial
          color={TEAL}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Mid glow — blue-cyan gradient */}
      <mesh>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer diffuse glow */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial
          color="#0044ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Pulsing corona rings — tighter, more visible */}
      <CoronaRing index={0} baseRadius={0.75} />
      <CoronaRing index={1} baseRadius={1.0} />
      <CoronaRing index={2} baseRadius={1.25} />
      <CoronaRing index={3} baseRadius={1.55} />

      {/* Radiating particle rays */}
      <CoronaRays />
    </group>
  )
}

// ─── Scene root: mouse parallax on everything ────────────────────
function SceneContent() {
  const { pointer } = useThree()
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.1
      groupRef.current.rotation.x = pointer.y * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <OrbitalTrails />
      <SolarCorona />
      <TorusKnotCenter />
      <OrbitingObjects />
      <ParticleField />
      <AmbientGlow />
    </group>
  )
}

// ─── Exported canvas wrapper ─────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 48 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ background: DARK_BG }}
      >
        {/* Strong contrast lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 6, 3]} intensity={0.5} />
        <directionalLight position={[-4, -3, 2]} intensity={0.4} color={MAGENTA} />
        <directionalLight position={[0, -5, -2]} intensity={0.3} color={TEAL} />
        <pointLight position={[3, 4, 3]} intensity={0.8} color={TEAL} />
        <pointLight position={[-3, -4, 2]} intensity={0.6} color={MAGENTA} />
        <pointLight position={[0, 0, 3]} intensity={0.4} color={GOLD} />
        <SceneContent />
      </Canvas>
    </div>
  )
}