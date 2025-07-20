<template>
  <div
    :style="backgroundStyle"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
  >
    <!-- Logo Container -->
    <div class="flex flex-1 flex-col items-center justify-center">
      <div
        :style="logoContainerStyle"
        class="fixed inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out"
      >
        <div
          :class="logoMaskClass"
          class="relative select-none transition-all duration-1000 ease-in-out"
        />
      </div>
    </div>

    <!-- Bottom Section with Loading and Progress -->
    <div class="absolute bottom-0 left-0 right-0 pb-16">
      <!-- Loading Text -->
      <div
        :class="{ 'opacity-0': isCompleting }"
        class="mb-8 flex justify-between px-16 font-light tracking-widest text-white transition-opacity duration-500"
      >
        <h2 class="text-lg">LOADING</h2>

        <h2 class="text-3xl">{{ animatedProgress }}%</h2>
      </div>

      <!-- Progress Container -->
      <div
        v-if="showProgressBar"
        :class="{ 'opacity-0': isCompleting }"
        class="px-16 transition-opacity duration-500"
      >
        <!-- Progress Bar -->
        <div class="relative mb-6">
          <div class="h-1 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              :style="{ width: `${displayProgress}%` }"
              class="h-full rounded-full bg-white transition-all duration-300 ease-out"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

const emit = defineEmits<{
  loaded: []
}>()

// State
const displayProgress = ref(0)
const animatedProgress = ref(0)
const isLogoGrowing = ref(false)
const isLogoExpanded = ref(false)
const showProgressBar = ref(false)
const isCompleting = ref(false)
const showGif = ref(false)
const isProgressAnimating = ref(false)

// Background & logo scaling
const backgroundColor = ref('white')
const logoScale = ref(2)

// Computed background style
const backgroundStyle = computed(() => ({
  backgroundColor: backgroundColor.value,
  transition: 'background-color 1s ease-in-out'
}))

const logoContainerStyle = computed(() => ({
  transform: `scale(${logoScale.value})`,
  transition: isCompleting.value
    ? 'transform 2s cubic-bezier(0.2, 1, 0.3, 1)'
    : 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
}))

const logoMaskClass = computed(() => {
  const classes = ['logo-masked']

  if (isCompleting.value) {
    classes.push('logo-completing')
  } else if (isLogoExpanded.value) {
    classes.push('logo-expanded')
  } else if (isLogoGrowing.value && showGif.value) {
    classes.push('logo-growing')
  }

  return classes.join(' ')
})

// Animate progress bar
watch(displayProgress, (newVal, oldVal) => {
  if (newVal > oldVal && newVal % 10 === 0) {
    isProgressAnimating.value = true
    setTimeout(() => {
      isProgressAnimating.value = false
    }, 300)
  }
})

onMounted(() => {
  simulateLoading()
})

const simulateLoading = () => {
  // Phase 1: Show logo & white background
  setTimeout(() => {
    isLogoGrowing.value = true
    showGif.value = true
  }, 100)

  // Phase 2: Dark background + expand logo + show progress
  setTimeout(() => {
    backgroundColor.value = '#0f0f0f'
    logoScale.value = 2.5
    isLogoExpanded.value = true
    showProgressBar.value = true
    startProgressAnimation()
  }, 1000)
}

const startProgressAnimation = () => {
  const duration = 3000
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min((elapsed / duration) * 100, 100)

    displayProgress.value = progress
    animatedProgress.value = Math.floor(progress)

    if (progress < 100) {
      requestAnimationFrame(animate)
    } else {
      completeLoading()
    }
  }

  requestAnimationFrame(animate)
}

const completeLoading = () => {
  displayProgress.value = 100
  animatedProgress.value = 100

  setTimeout(() => {
    isCompleting.value = true

    setTimeout(() => {
      emit('loaded')
    }, 100)
  }, 100)
}
</script>

<style scoped>
.logo-masked {
  background: url('@/assets/images/anime.gif') center center / cover no-repeat;
  mask-image: url('@/assets/images/logo.png');
  -webkit-mask-image: url('@/assets/images/logo.png');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  mask-size: cover;
  -webkit-mask-size: cover;
}

.logo-growing {
  width: 120px;
  height: 120px;
}

.logo-expanded {
  width: 180px;
  height: 180px;
}

.logo-completing {
  width: 1000vw;
  height: 1000vw;
}

.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
