<template>
  <div id="app" class="overflow-hidden">
    <!-- Three.js Canvas -->
    <canvas id="three-canvas" ref="threeCanvas"></canvas>

    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" @loaded="handleLoaded" />

    <!-- Main Content -->
    <div
      v-show="!isLoading"
      :class="{ 'opacity-0': isLoading }"
      class="relative z-10 transition-opacity duration-1000 ease-in-out"
    >
      <!-- Navigation -->
      <Navigation />
      <!-- Hero Section -->
      <HeroSection />
      <!-- About Section -->
      <AboutSection />
      <!-- Projects Section -->
      <ProjectsSection />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLenis } from '@/composables/useLenis'
import { useThreeScene } from '@/composables/useThreeScene'
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Navigation from '@/components/Navigation.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import { useSeoMeta } from 'nuxt/app'

const isLoading = ref(true)
const threeCanvas = ref<HTMLCanvasElement>()
const { initLenis } = useLenis()
const { initScene, updateScrollProgress, dispose } = useThreeScene()
const { initScrollAnimations } = useScrollAnimations()

let scrollObserver: IntersectionObserver | null = null

const handleLoaded = () => {
  setTimeout(() => {
    isLoading.value = false
    nextTick(() => {
      initializeApp()
    })
  }, 500)
}

const initializeApp = () => {
  // Initialize Three.js scene
  if (threeCanvas.value) {
    initScene(threeCanvas.value)
  }

  // Initialize Lenis smooth scroll
  const lenis = initLenis((e: any) => {
    const progress = e.progress || 0
    updateScrollProgress(progress)
  })

  // Initialize scroll animations
  scrollObserver = initScrollAnimations()
}

onMounted(() => {
  setTimeout(() => {
    if (isLoading.value) {
      handleLoaded()
    }
  }, 8000)
})

onUnmounted(() => {
  dispose()
  scrollObserver?.disconnect()
})

// SEO Meta
useSeoMeta({
  title: 'Animated Portfolio - Creative Developer',
  description:
    'A stunning animated portfolio showcasing creative web development with Three.js and smooth scrolling effects.',
  ogTitle: 'Animated Portfolio',
  ogDescription: 'Creative developer portfolio with amazing animations',
  ogImage: '../assets/transparent-logo.png',
  twitterCard: 'summary_large_image'
})
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
}

/* Ensure smooth transitions */
#three-canvas {
  transition: opacity 0.5s ease-in-out;
}
</style>
