<template>
  <section id="about" class="relative py-20">
    <div class="container mx-auto px-6">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <!-- Text Content -->
        <div class="space-y-8">
          <div ref="titleContainer" class="reveal">
            <h2 class="mb-6 text-5xl font-bold">
              <span ref="aboutText" class="gradient-text">About</span>
              <span ref="meText" class="text-white"> Me</span>
            </h2>
          </div>

          <div
            ref="textContent"
            class="reveal space-y-6 text-lg leading-relaxed text-gray-300"
          >
            <p ref="paragraph1">
              I'm a passionate full-stack developer with over 5 years of
              experience creating exceptional digital experiences. My journey
              began with a curiosity about how things work on the web, which
              evolved into a deep love for crafting beautiful, functional
              applications.
            </p>

            <p ref="paragraph2">
              I specialize in modern web technologies including React, Vue.js,
              Node.js, and various database systems. My approach combines
              technical expertise with creative problem-solving to deliver
              solutions that not only work flawlessly but also provide
              delightful user experiences.
            </p>

            <p ref="paragraph3">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community through blog posts and tutorials.
            </p>
          </div>

          <div ref="statsContainer" class="reveal flex flex-wrap gap-4">
            <div ref="stat1" class="glass rounded-lg px-4 py-2">
              <span class="font-semibold text-accent">5+</span>
              <span class="ml-2 text-gray-300">Years Experience</span>
            </div>
            <div ref="stat2" class="glass rounded-lg px-4 py-2">
              <span class="font-semibold text-accent">100+</span>
              <span class="ml-2 text-gray-300">Projects Completed</span>
            </div>
            <div ref="stat3" class="glass rounded-lg px-4 py-2">
              <span class="font-semibold text-accent">50+</span>
              <span class="ml-2 text-gray-300">Happy Clients</span>
            </div>
          </div>
        </div>

        <!-- Profile Image & Stats -->
        <div ref="profileContainer" class="reveal relative">
          <div class="relative z-10">
            <!-- Profile Image Container -->
            <div ref="profileImage" class="relative mx-auto h-80 w-80">
              <div
                class="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-accent to-accent-light opacity-20"
              />
              <div class="glass absolute inset-4 overflow-hidden rounded-full">
                <div
                  class="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent-light/20"
                >
                  <!-- Placeholder for profile image -->
                  <div class="text-8xl text-accent opacity-50">
                    <Icon name="ph:user-bold" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Skills -->
            <div
              ref="skill1"
              class="glass skill-tag absolute -left-4 -top-4 rounded-lg px-4 py-2"
            >
              <span class="font-semibold text-accent">Vue.js</span>
            </div>
            <div
              ref="skill2"
              class="glass skill-tag absolute -right-8 top-8 rounded-lg px-4 py-2"
            >
              <span class="font-semibold text-accent">Three.js</span>
            </div>
            <div
              ref="skill3"
              class="glass skill-tag absolute -bottom-8 left-8 rounded-lg px-4 py-2"
            >
              <span class="font-semibold text-accent">Node.js</span>
            </div>
            <div
              ref="skill4"
              class="glass skill-tag absolute -right-12 bottom-0 rounded-lg px-4 py-2"
            >
              <span class="font-semibold text-accent">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue'
import { useLenis } from '@/composables/useLenis' // Register ScrollTrigger plugin

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Refs for DOM elements
const titleContainer = ref<HTMLElement | null>(null)
const aboutText = ref<HTMLElement | null>(null)
const meText = ref<HTMLElement | null>(null)
const textContent = ref<HTMLElement | null>(null)
const paragraph1 = ref<HTMLElement | null>(null)
const paragraph2 = ref<HTMLElement | null>(null)
const paragraph3 = ref<HTMLElement | null>(null)
const statsContainer = ref<HTMLElement | null>(null)
const stat1 = ref<HTMLElement | null>(null)
const stat2 = ref<HTMLElement | null>(null)
const stat3 = ref<HTMLElement | null>(null)
const profileContainer = ref<HTMLElement | null>(null)
const profileImage = ref<HTMLElement | null>(null)
const skill1 = ref<HTMLElement | null>(null)
const skill2 = ref<HTMLElement | null>(null)
const skill3 = ref<HTMLElement | null>(null)
const skill4 = ref<HTMLElement | null>(null)

const { initLenis } = useLenis()

onMounted(() => {
  // Initialize Lenis smooth scrolling
  const lenis = initLenis((e: any) => {
    ScrollTrigger.update()
  })

  // Set up animations
  setupAnimations()

  // Refresh ScrollTrigger when images load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })
})

function setupAnimations() {
  // Title animation
  if (aboutText.value && meText.value) {
    gsap.fromTo(
      [aboutText.value, meText.value],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: titleContainer.value,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Paragraph animations
  if (paragraph1.value && paragraph2.value && paragraph3.value) {
    gsap.fromTo(
      [paragraph1.value, paragraph2.value, paragraph3.value],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: textContent.value,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Stats container animation
  if (statsContainer.value) {
    gsap.fromTo(
      statsContainer.value,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: statsContainer.value,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Individual stats animations
  if (stat1.value && stat2.value && stat3.value) {
    gsap.fromTo(
      [stat1.value, stat2.value, stat3.value],
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsContainer.value,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Profile container animation
  if (profileContainer.value) {
    gsap.fromTo(
      profileContainer.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: profileContainer.value,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Profile image animation
  if (profileImage.value) {
    gsap.fromTo(
      profileImage.value,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: profileImage.value,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Skill tags shooting animation
  if (
    skill1.value &&
    skill2.value &&
    skill3.value &&
    skill4.value &&
    profileImage.value
  ) {
    // Get the center of the profile image
    const profileRect = profileImage.value.getBoundingClientRect()
    const centerX = profileRect.width / 2
    const centerY = profileRect.height / 2

    // Set initial positions (centered behind the avatar)
    gsap.set([skill1.value], {
      x: centerX,
      y: centerY,
      opacity: 0,
      transformOrigin: 'center center'
    })
    gsap.set([skill2.value], {
      x: centerX - 400,
      y: centerY - 100,
      opacity: 0,
      transformOrigin: 'center center'
    })
    gsap.set([skill3.value], {
      x: centerX + 100,
      y: centerY - 300,
      opacity: 0,
      transformOrigin: 'center center'
    })
    gsap.set([skill4.value], {
      x: centerX - 400,
      y: centerY - 300,
      opacity: 0,
      transformOrigin: 'center center'
    })

    // Animate skills from center to their positions
    gsap.to(skill1.value, {
      x: -40,
      y: -40,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: profileContainer.value,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(skill2.value, {
      x: -20,
      y: -80,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: profileContainer.value,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(skill3.value, {
      x: 40,
      y: 40,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: profileContainer.value,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(skill4.value, {
      x: -30,
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: profileContainer.value,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })
  }
}
</script>

<style scoped>
.skill-tag {
  position: absolute;
  z-index: 0;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
  will-change: transform, opacity;
}

.scroll-trigger .skill-tag {
  z-index: 2;
}
</style>
