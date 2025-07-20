import { gsap } from 'gsap'

export const useScrollAnimations = () => {
  const initScrollAnimations = () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    reveals.forEach(reveal => {
      observer.observe(reveal)
    })

    // Parallax elements
    const parallaxElements = document.querySelectorAll('[data-parallax]')

    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || '0.5'
      gsap.set(element, { y: 0 })
    })

    // Text animations
    animateTextElements()

    // Stagger animations
    animateStaggerElements()

    return observer
  }

  const animateTextElements = () => {
    const textElements = document.querySelectorAll('.animate-text')

    textElements.forEach(element => {
      const text = element.textContent || ''
      element.innerHTML = ''

      // Split text into spans
      text.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.transform = 'translateY(100px)'
        span.style.opacity = '0'
        element.appendChild(span)

        gsap.to(span, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.02,
          ease: 'power2.out'
        })
      })
    })
  }

  const animateStaggerElements = () => {
    const staggerGroups = document.querySelectorAll('[data-stagger]')

    staggerGroups.forEach(group => {
      const children = group.children
      const delay = parseFloat(group.getAttribute('data-stagger') || '0.1')

      gsap.fromTo(
        children,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }

  const createParallaxEffect = (element: Element, speed: number = 0.5) => {
    gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  const createFadeInEffect = (element: Element, direction: string = 'up') => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 }
    }

    gsap.fromTo(
      element,
      {
        ...directions[direction as keyof typeof directions],
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  const createScaleEffect = (element: Element) => {
    gsap.fromTo(
      element,
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  return {
    initScrollAnimations,
    createParallaxEffect,
    createFadeInEffect,
    createScaleEffect
  }
}
