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

// ─── Solar Corona effect — GLSL shader-based ─────────────────────
const CORONA_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const CORONA_FRAG = /* glsl */`
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(st);
      st *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);

    // Angular noise for organic corona streams
    float angle = atan(center.y, center.x);
    float n1 = fbm(vec2(angle * 3.0 + uTime * 0.4, dist * 4.0 - uTime * 0.6));
    float n2 = fbm(vec2(angle * 6.0 - uTime * 0.3, dist * 8.0 + uTime * 0.5));

    // Pulsation — layered sine waves for breathing feel
    float p1 = sin(uTime * 1.2) * 0.5 + 0.5;
    float p2 = sin(uTime * 2.3 + 1.0) * 0.5 + 0.5;
    float p3 = sin(uTime * 0.7 + 2.0) * 0.5 + 0.5;
    float pulse = (p1 * 0.5 + p2 * 0.3 + p3 * 0.2);

    // Radial falloff — corona fades softly
    float innerEdge = 0.18 + n1 * 0.04;
    float outerEdge = 0.52 + p2 * 0.06;
    float radial = smoothstep(innerEdge, outerEdge, dist);
    float coreGlow = 1.0 - smoothstep(0.0, innerEdge + 0.05, dist);

    // Corona stream intensity
    float streams = (n1 * 0.7 + n2 * 0.3) * pulse;
    float alpha = (1.0 - radial) * streams * 0.85;

    // Core glow brightening
    alpha += coreGlow * (1.0 - radial) * 0.6;

    // Brighten the center, cool at edges
    vec3 brightColor = uColor * 1.8;
    vec3 edgeColor = mix(uColor, vec3(0.1, 0.5, 1.0), radial * 0.5);
    vec3 finalColor = mix(brightColor, edgeColor, radial * 0.6);

    // Subtle brightness pulse
    finalColor *= 0.85 + pulse * 0.25;

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
  }
`

function SolarCorona() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(TEAL) },
    },
    vertexShader: CORONA_VERT,
    fragmentShader: CORONA_FRAG,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [])

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <group>
      {/* Billboarded corona plane — always faces camera */}
      <mesh rotation={[0, 0, 0]} material={material}>
        <planeGeometry args={[3.5, 3.5]} />
      </mesh>

      {/* Tight radial bloom at center */}
      <mesh>
        <circleGeometry args={[0.35, 64]} />
        <meshBasicMaterial
          color={TEAL}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
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