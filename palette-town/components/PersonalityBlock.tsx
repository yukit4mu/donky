'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface PersonalityBlockProps {
  personality: string
}

export default function PersonalityBlock({ personality }: PersonalityBlockProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(100, 100)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      color: getColorFromPersonality(personality),
      specular: 0xffffff,
      shininess: 100,
      flatShading: true,
    })
    const cube = new THREE.Mesh(geometry, material)

    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))
    cube.add(line)

    scene.add(cube)
    camera.position.z = 2

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [personality])

  return <div ref={mountRef} className="w-24 h-24 mx-auto" />
}

function getColorFromPersonality(personality: string): number {
  const colors: { [key: string]: number } = {
    '外向性': 0xFF9AA2,
    '内向性': 0xC7CEEA,
    '誠実性': 0xB5EAD7,
    '開放性': 0xFFDACB,
    '協調性': 0xE2F0CB,
    '神経質': 0xFDFFB6,
    'リーダーシップ': 0xA0CED9,
    '創造性': 0xFFC3A0,
    '感情表現性': 0xFFAEBC,
    '柔軟性': 0xBDE4A7,
    '怠惰性': 0xD0D0D0,
    '直感性': 0xFCE38A,
  }
  return colors[personality] || 0xffffff
}

