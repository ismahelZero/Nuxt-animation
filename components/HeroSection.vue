<template>
  <section
    id="hero"
    class="relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <!-- Content -->
    <div class="container relative z-10 mx-auto px-6 text-center">
      <div class="mx-auto max-w-4xl">
        <!-- Main Title -->
        <h1 class="reveal mb-6 text-6xl font-bold md:text-8xl">
          <span class="gradient-text animate-text">Creative</span>
          <br />
          <span class="animate-text text-white">Developer</span>
        </h1>

        <!-- Subtitle -->
        <p
          class="reveal mb-8 text-xl text-gray-300 md:text-2xl"
          style="animation-delay: 0.3s"
        >
          Bringing ideas to life through innovative web experiences
        </p>

        <!-- Description -->
        <p
          class="reveal mx-auto mb-12 max-w-2xl text-lg text-gray-400"
          style="animation-delay: 0.6s"
        >
          Passionate full-stack developer specializing in modern web
          technologies, creating stunning visual experiences with seamless
          functionality.
        </p>

        <!-- CTA Buttons -->
        <div
          class="reveal flex flex-col justify-center gap-4 sm:flex-row"
          style="animation-delay: 0.9s"
        >
          <button
            class="transform animate-glow rounded-lg bg-accent px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-accent-light hover:shadow-xl"
            @click="scrollToProjects"
          >
            View My Work
          </button>
          <button
            class="glass transform rounded-lg px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:bg-opacity-10"
            @click="scrollToContact"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="pointer-events-none absolute inset-0">
        <div
          class="floating-element absolute left-10 top-20 h-4 w-4 animate-float rounded-full bg-accent opacity-60"
          style="animation-delay: 0s"
        />
        <div
          class="floating-element absolute right-20 top-40 h-6 w-6 animate-float rounded-full bg-accent-light opacity-40"
          style="animation-delay: 1s"
        />
        <div
          class="floating-element absolute bottom-40 left-20 h-3 w-3 animate-float rounded-full bg-white opacity-50"
          style="animation-delay: 2s"
        />
        <div
          class="floating-element absolute bottom-20 right-10 h-5 w-5 animate-float rounded-full bg-accent opacity-30"
          style="animation-delay: 0.5s"
        />
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce"
    >
      <div
        class="flex h-10 w-6 justify-center rounded-full border-2 border-white"
      >
        <div class="mt-2 h-3 w-1 animate-pulse rounded-full bg-white" />
      </div>
      <p class="mt-2 text-sm text-white">Scroll Down</p>
    </div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            white 1px,
            transparent 0
          );
          background-size: 50px 50px;
        "
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useLenis } from '../composables/useLenis'

const { scrollTo } = useLenis()

const scrollToProjects = () => {
  scrollTo('#projects', {
    offset: -80,
    duration: 1.5
  })
}

const scrollToContact = () => {
  scrollTo('#contact', {
    offset: -80,
    duration: 1.5
  })
}
</script>

<style scoped>
.floating-element {
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>
