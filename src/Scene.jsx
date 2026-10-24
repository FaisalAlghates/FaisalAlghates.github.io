import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars, Sparkles, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const scrollState = { p: 0 }
if (typeof window !== 'undefined') {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollState.p = max > 0 ? window.scrollY / max : 0
  }
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
}

function Core() {
  const group = useRef()
  const wire = useRef()
  const rings = useRef([])
  const size = useThree((s) => s.size)
  const mobile = size.width < 900

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = scrollState.p
    // slide across the page as you scroll
    const targetX = mobile ? 0 : Math.cos(p * Math.PI * 3.2) * 2.6
    const targetY = mobile ? 1.9 - p * 2.5 : Math.sin(p * Math.PI * 2) * 0.6
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, dt)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, dt)
    group.current.rotation.y = t * 0.15 + p * Math.PI * 4
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15 + p * 1.2
    wire.current.rotation.y = -t * 0.2
    wire.current.rotation.z = t * 0.1
    rings.current.forEach((r, i) => {
      if (!r) return
      r.rotation.x = t * (0.25 + i * 0.12) + i
      r.rotation.y = t * (0.18 - i * 0.05)
    })
  })

  return (
    <group ref={group} scale={mobile ? 0.55 : 0.9}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.25, 24]} />
          <MeshDistortMaterial color="#2a3550" metalness={1} roughness={0.18} distort={0.42} speed={2.2} envMapIntensity={1.6} />
        </mesh>
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.35} />
        </mesh>
        {[2.2, 2.65, 3.1].map((r, i) => (
          <mesh key={r} ref={(el) => (rings.current[i] = el)}>
            <torusGeometry args={[r, 0.012 + i * 0.004, 16, 160]} />
            <meshBasicMaterial color={['#5eead4', '#8b5cf6', '#fbbf24'][i]} />
          </mesh>
        ))}
        {[0, 1, 2].map((i) => (
          <Orbiter key={i} radius={2.2 + i * 0.45} speed={0.6 + i * 0.25} offset={i * 2.1} color={['#5eead4', '#8b5cf6', '#fbbf24'][i]} />
        ))}
      </Float>
    </group>
  )
}

function Orbiter({ radius, speed, offset, color }) {
  const ref = useRef()
  useFrame((s) => {
    const a = s.clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(a) * radius, Math.sin(a * 1.3) * radius * 0.45, Math.sin(a) * radius)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 24, 24]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )
}

const shapeDefs = [
  ['box', [-5.5, 2.4, -3], 0.55, '#8b5cf6'],
  ['octa', [5.8, -1.8, -2.5], 0.6, '#5eead4'],
  ['tetra', [-4.8, -3, -1.5], 0.55, '#fbbf24'],
  ['torus', [4.6, 3.2, -4], 0.45, '#f472b6'],
  ['dodeca', [-2.2, 4.2, -5], 0.5, '#38bdf8'],
  ['cone', [2.4, -4.2, -3], 0.5, '#a3e635'],
  ['octa', [-7, 0, -5], 0.4, '#fbbf24'],
  ['box', [7.2, 1, -6], 0.4, '#8b5cf6'],
]

function Shape({ type, position, size, color }) {
  const geo = {
    box: <boxGeometry args={[1, 1, 1]} />,
    octa: <octahedronGeometry args={[0.8]} />,
    tetra: <tetrahedronGeometry args={[0.85]} />,
    torus: <torusGeometry args={[0.6, 0.22, 24, 64]} />,
    dodeca: <dodecahedronGeometry args={[0.75]} />,
    cone: <coneGeometry args={[0.6, 1.2, 6]} />,
  }[type]
  return (
    <Float speed={1.2 + size} rotationIntensity={1.6} floatIntensity={1.8} position={position}>
      <mesh scale={size}>
        {geo}
        <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.15} clearcoat={1} envMapIntensity={1.4} />
      </mesh>
    </Float>
  )
}

function Rig({ children }) {
  useFrame((state, dt) => {
    const { x, y } = state.pointer
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x * 0.8, 2.5, dt)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, y * 0.5, 2.5, dt)
    state.camera.lookAt(0, 0, 0)
  })
  return children
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#05060a']} />
        <fog attach="fog" args={['#05060a', 10, 24]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 5, 4]} intensity={60} color="#8b5cf6" />
        <pointLight position={[-6, -3, 3]} intensity={50} color="#5eead4" />
        <Environment resolution={256}>
          <Lightformer intensity={4} position={[0, 5, -6]} scale={[12, 4, 1]} color="#ffffff" />
          <Lightformer intensity={3} position={[-6, 0, 2]} scale={[1, 8, 1]} color="#5eead4" />
          <Lightformer intensity={3} position={[6, 0, 2]} scale={[1, 8, 1]} color="#8b5cf6" />
          <Lightformer intensity={2} form="ring" position={[0, 0, 6]} scale={6} color="#fbbf24" />
        </Environment>
        <Rig>
          <Core />
          {shapeDefs.map(([type, pos, size, color], i) => (
            <Shape key={i} type={type} position={pos} size={size} color={color} />
          ))}
        </Rig>
        <Stars radius={60} depth={50} count={3500} factor={4} saturation={0} fade speed={0.8} />
        <Sparkles count={90} scale={[16, 10, 10]} size={2.2} speed={0.4} color="#5eead4" opacity={0.7} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,10,.75)_100%)]" />
    </div>
  )
}


