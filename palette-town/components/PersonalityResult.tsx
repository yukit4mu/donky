'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface PersonalityResultProps {
  personalities: string[]
  userName: string
}

export default function PersonalityResult({ personalities, userName }: PersonalityResultProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xE6F7FF) // Light blue background
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const blocks: THREE.Mesh[] = []
    const targetPositions: THREE.Vector3[] = []
    personalities.forEach((personality, index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshPhongMaterial({ 
        color: getColorFromPersonality(personality),
        shininess: 100,
        specular: 0xffffff
      })
      const block = new THREE.Mesh(geometry, material)
      block.position.set(0, personalities.length + 5, 0) // Start position above the screen
      block.visible = false // Hide the block initially
      targetPositions.push(new THREE.Vector3(0, index, 0)) // Target position in the tower
      scene.add(block)
      blocks.push(block)
    })

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    camera.position.set(0, personalities.length / 2, 10)

    let currentBlockIndex = 0;
    let isCurrentBlockFalling = false;

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      if (currentBlockIndex < blocks.length) {
        const block = blocks[currentBlockIndex];
        const targetPosition = targetPositions[currentBlockIndex];

        if (!isCurrentBlockFalling) {
          block.visible = true;
          isCurrentBlockFalling = true;
        }

        if (block.position.y > targetPosition.y) {
          // Block is still falling
          const fallSpeed = 0.08 // Increased fall speed
          block.position.y = Math.max(targetPosition.y, block.position.y - fallSpeed);
          block.rotation.y += 0.02;
        } else {
          // Block has reached the target
          block.position.y = targetPosition.y;
          isCurrentBlockFalling = false;
          currentBlockIndex++;

          // Wait for a short time before dropping the next block
          if (currentBlockIndex < blocks.length) {
            setTimeout(() => {}, 500); // 0.5 second delay
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [personalities])

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-card bg-opacity-90 p-6 rounded-t-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">{userName}さんのパーソナリティタワー</h2>
        <div className="flex justify-between">
          {personalities.map((personality, index) => (
            <div key={index} className="text-center">
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: `#${getColorFromPersonality(personality).toString(16)}` }}
                aria-label={personality}
              />
              <p className="text-sm font-bold">{personality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getColorFromPersonality(personality: string): number {
  const colors: { [key: string]: number } = {
    '外向性': 0x66B2FF,
    '内向性': 0x99CCFF,
    '誠実性': 0x3399FF,
    '開放性': 0xCCE5FF,
    '協調性': 0x80BFFF,
    '神経質': 0x4DA6FF,
    'リーダーシップ': 0x1A8CFF,
    '創造性': 0xB3D9FF,
    '感情表現性': 0xE6F2FF,
    '柔軟性': 0x0080FF,
    '怠惰性': 0xA6CFFF,
    '直感性': 0x0059B3,
  }
  return colors[personality] || 0xffffff
}

