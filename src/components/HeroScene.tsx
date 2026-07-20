import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function LetterBlocks() {
  const groupRef = useRef<THREE.Group>(null!)
  const letters = useMemo(() => [
    { char: 'N', position: [-0.8, 0.2, 0], color: '#00ffd2' },
    { char: 'R', position: [0.8, -0.2, 0], color: '#ffd700' },
  ], [])

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.3
      groupRef.current.rotation.x = pointer.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {letters.map((l, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[l.position[0], l.position[1], l.position[2]]}>
            <boxGeometry args={[0.8, 0.9, 0.3]} />
            <MeshDistortMaterial
              color={l.color}
              roughness={0.2}
              metalness={0.8}
              distort={0.15}
              speed={1.5}
            />
          </mesh>
          <mesh position={[l.position[0], l.position[1] - 0.7, l.position[2]]}>
            <torusGeometry args={[0.4, 0.04, 16, 32]} />
            <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
      {/* Decorative dots / particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`dot-${i}`}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3 - 1,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00ffd2' : '#ffd700'}
            emissive={i % 2 === 0 ? '#00ffd2' : '#ffd700'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.3
    meshRef.current.rotation.z = clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={meshRef} position={[2.5, -1, -3]}>
      <icosahedronGeometry args={[0.3, 1]} />
      <MeshDistortMaterial color="#00ffd2" wireframe emissive="#00ffd2" emissiveIntensity={0.1} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00ffd2" />
        <pointLight position={[3, -2, 2]} intensity={0.5} color="#ffd700" />
        <LetterBlocks />
        <FloatingOrb />
      </Canvas>
    </div>
  )
}
