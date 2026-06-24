import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-frame animation with HARD PAGE LOCK.
 * While frames 0→240 are playing, the page is frozen at the top.
 * Only after frame 240 does the user get normal scroll back.
 */
export function useScrollFrame(canvasRef, images, totalFrames = 240) {
  const containerRef = useRef(null)
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const rafRef = useRef(null)
  const animDoneRef = useRef(false)  // true once frame 240 is reached
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // ── Lock page scroll (freeze body at top) ──
    const lockPage = () => {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.right = '0'
    }

    // ── Unlock page scroll ──
    const unlockPage = () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
    }

    // Lock immediately when canvas activates
    lockPage()

    // ── Canvas resize ──
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(Math.round(currentFrameRef.current))
    }

    // ── Draw frame cover-fit ──
    const drawFrame = (index) => {
      const i = Math.max(0, Math.min(totalFrames - 1, index))
      const img = images[i]
      if (!img) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = canvas.width / canvas.height

      let drawW, drawH, drawX, drawY
      if (canvasRatio > imgRatio) {
        drawW = canvas.width
        drawH = canvas.width / imgRatio
        drawX = 0
        drawY = (canvas.height - drawH) / 2
      } else {
        drawH = canvas.height
        drawW = canvas.height * imgRatio
        drawX = (canvas.width - drawW) / 2
        drawY = 0
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    const SENSITIVITY = 0.6

    // ── Wheel handler ──
    const onWheel = (e) => {
      if (animDoneRef.current) return  // animation done, let page scroll freely

      e.preventDefault()

      if (e.deltaY > 0) {
        // Scroll down → advance frames
        targetFrameRef.current = Math.min(
          totalFrames - 1,
          targetFrameRef.current + e.deltaY * SENSITIVITY
        )
      } else if (e.deltaY < 0) {
        // Scroll up → go back frames
        targetFrameRef.current = Math.max(
          0,
          targetFrameRef.current + e.deltaY * SENSITIVITY
        )
      }
    }

    // ── Touch support ──
    let touchStartY = 0

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e) => {
      if (animDoneRef.current) return

      e.preventDefault()

      const deltaY = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY

      if (deltaY > 0) {
        targetFrameRef.current = Math.min(totalFrames - 1, targetFrameRef.current + deltaY * 1.5)
      } else {
        targetFrameRef.current = Math.max(0, targetFrameRef.current + deltaY * 1.5)
      }
    }

    // ── RAF loop ──
    const animate = () => {
      const current = currentFrameRef.current
      const target = targetFrameRef.current
      const lerp = 0.12
      const next = current + (target - current) * lerp

      if (Math.abs(next - current) > 0.05) {
        currentFrameRef.current = next
        drawFrame(Math.round(next))
      }

      const pct = (currentFrameRef.current / (totalFrames - 1)) * 100
      setProgress(Math.min(100, pct))

      // When frame 240 is reached → unlock page
      if (!animDoneRef.current && currentFrameRef.current >= totalFrames - 1.5) {
        animDoneRef.current = true
        unlockPage()
      }

      // When user scrolls back to start → re-lock
      if (animDoneRef.current && currentFrameRef.current <= 0.5 && targetFrameRef.current <= 0) {
        animDoneRef.current = false
        lockPage()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // ── Init ──
    resize()
    drawFrame(0)
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      unlockPage()  // always unlock on unmount
      window.removeEventListener('resize', resize)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [images, totalFrames, canvasRef])

  return { containerRef, progress }
}