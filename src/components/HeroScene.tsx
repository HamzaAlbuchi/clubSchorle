'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function CentralTorus() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.12
    ref.current.rotation.z = clock.elapsedTime * 0.07
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={ref} scale={1.6}>
        <torusGeometry args={[1.2, 0.26, 32, 120]} />
        <meshStandardMaterial
          color="#c5385c"
          roughness={0.08}
          metalness={0.9}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

function FloatingGem({
  position,
  size,
  color,
  speed,
}: {
  position: [number, number, number]
  size: number
  color: string
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * speed
    ref.current.rotation.x = clock.elapsedTime * speed * 0.6
  })

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  )
}

function SmallRing({
  position,
  rotationOffset,
  color,
}: {
  position: [number, number, number]
  rotationOffset: [number, number, number]
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = rotationOffset[1] + clock.elapsedTime * 0.25
    ref.current.rotation.x = rotationOffset[0] + clock.elapsedTime * 0.12
  })

  return (
    <Float speed={0.9} rotationIntensity={0.35} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={0.38}>
        <torusGeometry args={[1, 0.38, 16, 60]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} color="#f5e8d0" />
      <pointLight position={[4, 4, 4]} intensity={3} color="#c5385c" />
      <pointLight position={[-4, -2, 2]} intensity={2} color="#8b1a4a" />
      <pointLight position={[1, -4, 3]} intensity={1.5} color="#c9a96e" />
      <pointLight position={[-2, 3, -2]} intensity={1} color="#f5e8d0" />

      <CentralTorus />

      <FloatingGem position={[-3.2, 1.6, -1.5]} size={0.32} color="#c9a96e" speed={1.3} />
      <FloatingGem position={[3.0, -0.8, -2]} size={0.42} color="#8b1a4a" speed={0.9} />
      <FloatingGem position={[2.2, 2.4, -1.8]} size={0.22} color="#c5385c" speed={1.6} />
      <FloatingGem position={[-2.8, -1.8, -0.8]} size={0.28} color="#c9a96e" speed={1.1} />
      <FloatingGem position={[0.5, 3.0, -2.5]} size={0.18} color="#f5e8d0" speed={1.8} />

      <SmallRing position={[-2.4, 0.4, -3]} rotationOffset={[1, 0, 0.5]} color="#c5385c" />
      <SmallRing position={[2.6, 1.4, -3.5]} rotationOffset={[0.5, 0, 1]} color="#c9a96e" />
      <SmallRing position={[0.2, -2.6, -2.2]} rotationOffset={[0, 1, 0.4]} color="#8b1a4a" />

      <Sparkles
        count={100}
        scale={10}
        size={1.2}
        speed={0.25}
        opacity={0.5}
        color="#c9a96e"
      />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
