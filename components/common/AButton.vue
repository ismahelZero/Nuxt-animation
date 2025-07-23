<template>
  <button
    v-if="type === 'primary'"
    :class="[
      'btn-arrow text-black group relative flex h-[44px] items-center justify-center overflow-hidden rounded-full border-2 border-none transition-all duration-500',
      `bg-${color || 'primary'}`
    ]"
  >
    <span
      class="dot bg-white absolute left-6 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:left-5 group-hover:h-6 group-hover:w-6"
    />
    <span
      class="arrow absolute left-6 top-3 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:left-3 group-hover:w-6 group-hover:opacity-100"
    >
      <Icon :name="icon || 'solar:arrow-right'" class="text-black h-4 w-4" />
    </span>
    <span class="text ms-2">{{ label }}</span>
  </button>

  <button
    v-else-if="type === 'secondary'"
    :class="[
      'btn-text-overlap bg-transparent text-white group relative flex h-[44px] items-center justify-center overflow-hidden rounded-full border-2 px-8 py-4 font-semibold transition-all duration-500',
      `border-${color}`
    ]"
  >
    <span
      :class="[`group-hover:bg-${color}`]"
      class="dot bg-white absolute left-4 h-1.5 w-1.5 rounded-full transition-all duration-300"
    />
    <div :class="[`text-${color}`]" class="relative overflow-hidden">
      <span
        class="text-current block transition-all duration-500 group-hover:-translate-y-full"
        >{{ label }}</span
      >
      <span
        class="text-new absolute left-0 top-full block w-full transition-all duration-500 group-hover:-translate-y-full"
        >{{ label }}</span
      >
    </div>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'mdi:arrow-right'
  },
  color: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  }
})
</script>

<style scoped>
.btn-arrow .dot {
  transform: translateX(0);
}

.btn-arrow:hover .dot {
  transform: translateX(-0.5rem);
}

.btn-arrow .arrow {
  right: -1.5rem;
}

.btn-arrow:hover .arrow {
  right: 1.5rem;
}

.btn-text-overlap .text-new {
  transform: translateY(100%);
}

.btn-text-overlap:hover .text-new {
  transform: translateY(-100%);
}

.btn-text-overlap:hover .text-current {
  transform: translateY(-100%);
}
</style>
