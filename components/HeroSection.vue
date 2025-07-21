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
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
    </div>

    <!-- Content -->
    <div class="container relative z-10 mx-auto px-6 text-center">
      <div class="mx-auto max-w-4xl">
        <!-- Main Title -->
        <h1 class="reveal mb-6 text-6xl font-bold md:text-8xl">
          <span class="animate-text text-white">Developer</span>
          <span
            class="name-animation ml-4 inline-block overflow-hidden text-white"
          >
            <span class="name-block">Ismahel</span>
            <span class="name-block">Zero</span>
            <span class="name-block">Sadradin</span>
          </span>
        </h1>

        <!-- CTA Buttons -->
        <div
          class="reveal flex flex-col items-center justify-center gap-6 sm:flex-row"
          style="animation-delay: 0.9s"
        >
          <!-- First Button with arrow transformation -->
          <button
            class="btn-arrow group relative flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all duration-500 hover:border-accent hover:bg-accent hover:pe-6 hover:ps-12"
          >
            <span
              class="dot absolute left-4 h-3 w-3 rounded-full bg-white transition-all duration-300 group-hover:left-6 group-hover:h-5 group-hover:w-5"
            />
            <span class="text ms-2">Explore our journey</span>
            <span
              class="arrow absolute left-6 opacity-0 transition-all duration-300 group-hover:right-6 group-hover:opacity-100"
            >
              <svg
                class="h-5 w-5"
                fill="black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          <!-- Second Button with text animation -->
          <button
            class="btn-text-overlap group relative flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all duration-500 hover:border-accent"
          >
            <span
              class="dot absolute left-4 h-3 w-3 rounded-full bg-white transition-all duration-300 group-hover:bg-accent"
            />
            <div class="relative overflow-hidden">
              <span
                class="block text-current transition-all duration-500 group-hover:-translate-y-full"
                >Let's talk</span
              >
              <span
                class="text-new absolute left-0 top-full block w-full transition-all duration-500 group-hover:-translate-y-full"
                >Let's talk</span
              >
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

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
