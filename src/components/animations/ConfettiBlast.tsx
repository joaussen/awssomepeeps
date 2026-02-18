import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  life: number
}

const COLORS = ['#FFB700', '#0e82f9', '#02ae70', '#f36dc8', '#ffc933', '#ff8c00']

export function ConfettiBlast({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const count = 150

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: -Math.random() * 25 - 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1,
      })
    }

    let animId: number
    const gravity = 0.5

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      for (const p of particles) {
        if (p.life <= 0) continue
        alive = true

        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.life -= 0.008
        p.vx *= 0.99

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }

      if (alive) {
        animId = requestAnimationFrame(animate)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  )
}
