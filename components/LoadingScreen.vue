<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-dark">
    <div class="text-center">
      <!-- Animated Logo -->
      <div class="relative mb-8">
        <div
          class="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-accent"
        >
          <div
            class="animate-spin-slow absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-20"
          />
          <div
            class="absolute inset-2 flex items-center justify-center rounded-full bg-dark"
          >
            <div class="text-xl font-bold text-accent">P</div>
          </div>
        </div>
      </div>

      <!-- Loading Text -->
      <h1 class="loading-text mb-4 text-4xl font-bold">
        {{ loadingText }}
      </h1>

      <!-- Progress Bar -->
      <div
        class="mx-auto mb-4 h-1 w-64 overflow-hidden rounded-full bg-dark-secondary"
      >
        <div
          :style="{ width: `${progress}%` }"
          class="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-300 ease-out"
        />
      </div>

      <!-- Progress Percentage -->
      <div class="text-sm text-gray-400">{{ Math.round(progress) }}%</div>
    </div>

    <!-- Background Animation -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        v-for="i in 20"
        :key="i"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 2 + 's',
          animationDuration: Math.random() * 2 + 2 + 's'
        }"
        class="absolute h-2 w-2 animate-float rounded-full bg-accent opacity-20"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  loaded: []
}>()

const progress = ref(0)
const loadingText = ref<string | undefined>('Initializing...')

const loadingStages = [
  { text: 'Initializing...', duration: 500 },
  { text: 'Loading Assets...', duration: 800 },
  { text: 'Setting up Scene...', duration: 600 },
  { text: 'Preparing Animations...', duration: 700 },
  { text: 'Almost Ready...', duration: 400 }
]

onMounted(() => {
  simulateLoading()
})

const simulateLoading = () => {
  let currentStage = 0
  let currentProgress = 0

  const progressInterval = setInterval(() => {
    if (currentStage < loadingStages.length) {
      const stage = loadingStages[currentStage]
      const stageProgress = 100 / loadingStages.length
      const targetProgress = (currentStage + 1) * stageProgress

      loadingText.value = stage?.text

      if (currentProgress < targetProgress) {
        currentProgress += Math.random() * 3 + 1
        progress.value = Math.min(currentProgress, targetProgress)
      } else {
        currentStage++
        if (currentStage >= loadingStages.length) {
          progress.value = 100
          clearInterval(progressInterval)
          setTimeout(() => {
            emit('loaded')
          }, 500)
        }
      }
    }
  }, 50)
}
</script>
