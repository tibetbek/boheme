'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vert = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const frag = /* glsl */`
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float wave(vec2 p, float freq, float speed, float phase) {
    return sin(p.x * freq + sin(p.y * freq * 0.7 + uTime * speed * 0.5) + uTime * speed + phase);
  }

  void main() {
    vec2 uv = vUv;

    // Subtle mouse warp
    vec2 m = (uMouse - 0.5) * 0.04;
    uv += m * (1.0 - length(vUv - 0.5));

    float n  = wave(uv, 3.0, 0.25, 0.0)   * 0.40;
    n       += wave(uv, 5.5, 0.18, 1.57)  * 0.25;
    n       += wave(uv, 1.8, 0.12, 3.14)  * 0.20;
    n       += wave(uv, 8.0, 0.30, 0.80)  * 0.10;
    n = n * 0.5 + 0.5;

    vec3 sand  = vec3(0.910, 0.867, 0.816);
    vec3 linen = vec3(0.961, 0.941, 0.910);
    vec3 cream = vec3(0.980, 0.969, 0.949);

    vec3 col = mix(sand, linen, n);
    col = mix(col, cream, n * n * 0.6);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    } catch {
      return
    }

    const setSize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }
    setSize()

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: vert,
      fragmentShader: frag,
    })
    scene.add(new THREE.Mesh(geo, mat))

    const targetMouse = { x: 0.5, y: 0.5 }
    const onMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth
      targetMouse.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const mu = mat.uniforms.uMouse.value as THREE.Vector2
      mu.x += (targetMouse.x - mu.x) * 0.04
      mu.y += (targetMouse.y - mu.y) * 0.04
      mat.uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
