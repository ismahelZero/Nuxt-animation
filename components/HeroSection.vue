<template>
  <section
    id="hero"
    class="relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 z-0">
      <img
        alt="Animated background"
        class="h-full w-full object-cover"
        src="@/assets/images/anime.gif"
      />
      <div class="bg-black absolute inset-0 bg-opacity-70"></div>
    </div>

    <!-- Content -->
    <div class="container relative z-10 mx-auto px-6 text-center">
      <div class="mx-auto max-w-4xl">
        <!-- Main Title -->
        <h1 class="reveal mb-6 text-6xl font-bold md:text-8xl">
          <span class="animate-text text-white">Developer</span>
          <span
            class="name-animation text-white ml-4 inline-block overflow-hidden"
          >
            <span class="name-block">Ismahel</span>
            <span class="name-block">Zero</span>
            <span class="name-block">Sadradin</span>
          </span>
        </h1>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col items-center justify-center gap-6 p-8 sm:flex-row"
        >
          <!-- Primary Button with default arrow icon -->
          <AButton label="Let's talk" type="primary" />

          <!-- Secondary Button with default accent color -->
          <AButton label="Explore our journey" type="secondary" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import AButton from '@/components/common/AButton.vue'

onMounted(() => {
  const nameBlocks = gsap.utils.toArray('.name-block') as HTMLElement[]
  let tl = gsap.timeline({
    repeat: -1,
    defaults: { duration: 0.7, ease: 'power2.inOut' }
  })

  nameBlocks.forEach((block, index) => {
    tl.to(block, { y: '0%', opacity: 1 }).to(
      block,
      { y: '-100%', opacity: 0, delay: 0.5, display: 'none' },
      '+=0.5'
    )
  })
})
</script>

<style scoped>
.name-animation {
  height: 1.2em;
  vertical-align: bottom;
  overflow: hidden;
  color: theme('colors.accent');
}

.name-block {
  display: block;
  transform: translateY(100%);
  opacity: 0;
}

.btn-arrow,
.btn-text-overlap {
  min-width: 200px;
}

.dot {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.text-new {
  color: theme('colors.accent');
}
</style>
