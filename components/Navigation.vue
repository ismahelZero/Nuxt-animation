<template>
  <nav
    :class="navClasses"
    class="fixed left-0 right-0 top-0 z-40 transform transition-transform duration-500 ease-in-out"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-light"
          >
            <span class="text-lg font-bold text-white">P</span>
          </div>
          <span class="gradient-text text-xl font-bold">Portfolio</span>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden items-center space-x-8 md:flex">
          <li v-for="item in menuItems" :key="item.id">
            <a
              :href="item.href"
              class="group relative text-white transition-colors duration-300 hover:text-accent"
              @click="scrollToSection(item.href, $event)"
            >
              {{ item.label }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </a>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          class="group flex h-8 w-8 flex-col items-center justify-center space-y-1 md:hidden"
          @click="toggleMobileMenu"
        >
          <span
            :class="{ 'translate-y-2 rotate-45': isMobileMenuOpen }"
            class="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-accent"
          />
          <span
            :class="{ 'opacity-0': isMobileMenuOpen }"
            class="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-accent"
          />
          <span
            :class="{ '-translate-y-2 -rotate-45': isMobileMenuOpen }"
            class="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-accent"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        :class="isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
        class="overflow-hidden transition-all duration-300 md:hidden"
      >
        <ul class="space-y-4 pt-4">
          <li v-for="item in menuItems" :key="item.id">
            <a
              :href="item.href"
              class="block text-white transition-colors duration-300 hover:text-accent"
              @click="
                e => {
                  scrollToSection(item.href, e)
                  toggleMobileMenu()
                }
              "
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLenis } from '@/composables/useLenis'

const { scrollTo } = useLenis()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const isNavVisible = ref(true)
const lastScrollY = ref(0)

const menuItems = [
  { id: 1, label: 'Home', href: '#hero' },
  { id: 2, label: 'About', href: '#about' },
  { id: 3, label: 'Projects', href: '#projects' },
  { id: 4, label: 'Skills', href: '#skills' },
  { id: 5, label: 'Contact', href: '#contact' }
]

const navClasses = computed(() => ({
  'bg-transparent': !isScrolled.value,
  'translate-y-0': isNavVisible.value,
  '-translate-y-full': !isNavVisible.value
}))

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (href: string, event: Event) => {
  event.preventDefault()
  const target = href.substring(1)
  scrollTo(`#${target}`, {
    offset: -100,
    duration: 100
  })
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  const currentScroll = window.scrollY
  isScrolled.value = currentScroll > 50
  isNavVisible.value = !(
    currentScroll > lastScrollY.value && currentScroll > 100
  )
  lastScrollY.value = currentScroll
}

const handleVisible = () => {
  setTimeout(() => {
    isNavVisible.value = true
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  isNavVisible.value = false
  handleVisible()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
