import Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  let lenis: Lenis | null = null

  const initLenis = (onScroll?: (e: any) => void) => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    })

    // GSAP integration
    lenis.on('scroll', (e: any) => {
      onScroll?.(e)
    })

    // RAF loop
    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return lenis
  }

  const scrollTo = (target: string | number, options?: any) => {
    lenis?.scrollTo(target, options)
  }

  const destroy = () => {
    lenis?.destroy()
    lenis = null
  }

  const stop = () => {
    lenis?.stop()
  }

  const start = () => {
    lenis?.start()
  }

  return {
    initLenis,
    scrollTo,
    destroy,
    stop,
    start,
    get lenis() {
      return lenis
    }
  }
}
