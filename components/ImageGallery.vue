<template>
  <div class="font-sans text-white">
    <section
      ref="animationContainer"
      class="animation-container relative h-[800vh]"
    >
      <div
        ref="stickyContainer"
        class="sticky-container sticky top-0 h-screen w-full overflow-hidden"
      >
        <div ref="imageCanvas" class="image-canvas relative h-full w-full">
          <!-- Center text element -->
          <div
            ref="centerText"
            class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center opacity-0"
          >
            <h2 class="mb-4 text-4xl font-bold md:text-6xl">Discover More</h2>
            <p class="text-xl md:text-2xl">Explore our collection</p>
          </div>

          <!-- Final zoom text elements (now multiple for scroll effects) -->
          <div ref="zoomTextContainer" class="absolute inset-0 z-20 opacity-0">
            <div
              ref="zoomText1"
              class="absolute left-1/2 top-1/3 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center"
            >
              <h2
                class="mb-4 translate-y-20 transform text-4xl font-bold md:text-6xl"
              >
                Featured Item
              </h2>
            </div>
            <div
              ref="zoomText2"
              class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center"
            >
              <p class="translate-y-20 transform text-xl md:text-2xl">
                Special selection just for you
              </p>
            </div>
            <div
              ref="zoomText3"
              class="absolute left-1/2 top-2/3 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center"
            >
              <button
                class="translate-y-20 transform rounded-full bg-white px-8 py-3 text-lg font-bold text-black"
              >
                Explore Now
              </button>
            </div>
          </div>

          <div
            v-for="i in 14"
            :key="i"
            class="image-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              :alt="`Cinematic Image ${i}`"
              :src="`https://picsum.photos/id/${i + 105}/300/200`"
              class="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

const animationContainer = ref<HTMLElement | null>(null)
const stickyContainer = ref<HTMLElement | null>(null)
const imageCanvas = ref<HTMLElement | null>(null)
const nextSection = ref<HTMLElement | null>(null)
const centerText = ref<HTMLElement | null>(null)
const zoomTextContainer = ref<HTMLElement | null>(null)
const zoomText1 = ref<HTMLElement | null>(null)
const zoomText2 = ref<HTMLElement | null>(null)
const zoomText3 = ref<HTMLElement | null>(null)

let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.8,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => {
    lenis?.raf(time * 1000)
  })

  setTimeout(setupCinematicAnimation, 100)
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach(st => st.kill())
})

const setupCinematicAnimation = () => {
  if (
    !imageCanvas.value ||
    !animationContainer.value ||
    !centerText.value ||
    !zoomTextContainer.value
  )
    return

  const images = Array.from(
    imageCanvas.value.querySelectorAll('.image-wrapper')
  ) as HTMLElement[]
  const totalImages = images.length
  const chosenImageIndex = 7
  const chosenImage = images[chosenImageIndex]
  const circleRadius = Math.min(window.innerWidth, window.innerHeight) * 0.8

  // Initial random positions
  images.forEach(img => {
    gsap.set(img, {
      x: gsap.utils.random(-800, 800, 1),
      y: gsap.utils.random(-500, 500, 1),
      scale: 0.7,
      opacity: 1,
      rotation: 0
    })
  })

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: animationContainer.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      pin: stickyContainer.value,
      invalidateOnRefresh: true
    }
  })

  // Stage 1: Chaos to horizontal line
  masterTl.to(
    images,
    {
      x: i => {
        if (i < 11) {
          return i * (window.innerWidth / 10) - window.innerWidth / 2
        } else {
          return i % 2 === 0
            ? window.innerWidth + 200
            : -window.innerWidth - 200
        }
      },
      y: 0,
      duration: 2,
      ease: 'power2.inOut'
    },
    'start'
  )

  // Stage 2: Line to complete circle
  masterTl.addLabel('toCircle')

  images.forEach((img, i) => {
    const angle = (i / totalImages) * Math.PI * 2
    const x = Math.cos(angle) * circleRadius
    const y = Math.sin(angle) * circleRadius

    masterTl.to(
      img,
      {
        x,
        y,
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut'
      },
      'toCircle'
    )
  })

  // Show center text
  masterTl.to(
    centerText.value,
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    },
    'toCircle+=0.5'
  )

  // Stage 3: Scale and position to show upper half
  masterTl.addLabel('showUpperCircle')

  masterTl.to(
    imageCanvas.value,
    {
      scale: 0.8,
      y: window.innerHeight * 0.25,
      duration: 1.5,
      ease: 'power2.inOut'
    },
    'showUpperCircle'
  )

  // Stage 4: Rotation while maintaining upper half view
  masterTl.addLabel('rotateCircle')

  const originalAngles = images.map((_, i) => (i / totalImages) * Math.PI * 2)

  masterTl.to(
    {},
    {
      duration: 5,
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress()
        const currentRotation = progress * 1.5

        images.forEach((img, i) => {
          const newAngle = originalAngles[i] + currentRotation
          const x = Math.cos(newAngle) * circleRadius
          const y = Math.sin(newAngle) * circleRadius

          gsap.set(img, { x, y })
        })
      }
    },
    'rotateCircle'
  )

  // Stage 5: Full-screen zoom
  masterTl.addLabel('zoomChosen')

  // Scale down other images but keep visible
  images.forEach((img, i) => {
    if (i !== chosenImageIndex) {
      masterTl.to(
        img,
        {
          scale: 0.2,
          opacity: 0.3,
          duration: 1,
          ease: 'power2.in'
        },
        'zoomChosen'
      )
    }
  })

  // Hide center text during zoom
  masterTl.to(
    centerText.value,
    {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    },
    'zoomChosen'
  )

  // Full-screen zoom with cover effect
  masterTl.to(
    chosenImage,
    {
      scale: 13,
      duration: 3,
      ease: 'power3.inOut',
      onStart: () => {
        // Make sure the image covers the screen completely
        gsap.set(chosenImage, {
          zIndex: 3,
          borderRadius: 0
        })
      }
    },
    'zoomChosen'
  )

  // Show text container only after full zoom
  masterTl.to(
    zoomTextContainer.value,
    {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        // Animate text elements in sequence with scroll
        if (zoomText1.value && zoomText2.value && zoomText3.value) {
          gsap.to(zoomText1.value, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: animationContainer.value,
              start: '80% top',
              end: '85% top',
              scrub: true
            }
          })

          gsap.to(zoomText2.value, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: animationContainer.value,
              start: '85% top',
              end: '90% top',
              scrub: true
            }
          })

          gsap.to(zoomText3.value, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: animationContainer.value,
              start: '90% top',
              end: '95% top',
              scrub: true
            }
          })
        }
      }
    },
    'zoomChosen+=2.5' // Wait until zoom is mostly complete
  )

  // Background transition
  masterTl.call(
    () => {
      if (nextSection.value && chosenImage) {
        const imgElement = chosenImage.querySelector('img')
        if (imgElement) {
          nextSection.value.style.backgroundImage = `url(${imgElement.src})`
        }
      }
    },
    [],
    '>-0.1'
  )
}
</script>

<style>
.image-wrapper {
  width: 12vw;
  height: 16vw;
  will-change: transform;
  transform-style: preserve-3d;
  transition: border-radius 0.5s ease;
}

.image-wrapper img {
  transform: rotate(0deg) !important;
}

.center-text,
.zoom-text-container {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.image-canvas {
  transform-origin: center center;
  will-change: transform;
}

.zoom-text-container h2,
.zoom-text-container p,
.zoom-text-container button {
  will-change: transform, opacity;
  opacity: 0;
}
</style>
