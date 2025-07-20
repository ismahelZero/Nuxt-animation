<template>
  <section id="projects" class="relative py-20">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal mb-16 text-center">
        <h2 class="mb-6 text-5xl font-bold">
          <span class="text-white">Featured </span>
          <span class="gradient-text">Projects</span>
        </h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-300">
          A showcase of my recent work, ranging from web applications to
          creative experiments
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-stagger="0.1">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="glass group relative transform overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:bg-opacity-10"
        >
          <!-- Project Image -->
          <div
            class="from-accent/20 to-accent-light/20 relative aspect-video overflow-hidden bg-gradient-to-br"
          >
            <div
              class="from-dark/80 absolute inset-0 bg-gradient-to-t to-transparent"
            ></div>

            <!-- Project Preview -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-accent text-6xl opacity-50">
                <Icon :name="project.icon" />
              </div>
            </div>

            <!-- Hover Overlay -->
            <div
              class="bg-accent/90 absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <div class="flex space-x-4">
                <button
                  class="text-accent rounded-full bg-white p-3 transition-colors hover:bg-gray-100"
                >
                  <Icon class="h-6 w-6" name="ph:eye-bold" />
                </button>
                <button
                  class="text-accent rounded-full bg-white p-3 transition-colors hover:bg-gray-100"
                >
                  <Icon class="h-6 w-6" name="ph:github-logo-bold" />
                </button>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3
              class="group-hover:text-accent mb-2 text-xl font-semibold text-white transition-colors"
            >
              {{ project.title }}
            </h3>
            <p class="mb-4 text-gray-400">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mb-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="bg-accent/20 text-accent border-accent/30 rounded-full border px-3 py-1 text-xs"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Project Stats -->
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ project.year }}</span>
              <span>{{ project.category }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View More Button -->
      <div class="reveal mt-12 text-center" style="animation-delay: 0.5s">
        <button
          class="glass transform rounded-lg px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:bg-opacity-10"
        >
          View All Projects
          <Icon class="ml-2 inline h-5 w-5" name="ph:arrow-right-bold" />
        </button>
      </div>
    </div>

    <!-- Background Decoration -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="border-accent/20 absolute -left-32 top-1/4 h-64 w-64 rounded-full border"
      ></div>
      <div
        class="border-accent-light/20 absolute -right-32 bottom-1/4 h-80 w-80 rounded-full border"
      ></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce solution with real-time inventory management and secure payment processing.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    year: '2024',
    category: 'Web App',
    icon: 'ph:shopping-cart-bold'
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description:
      'An interactive portfolio featuring Three.js animations and smooth scrolling effects.',
    technologies: ['Three.js', 'GSAP', 'WebGL', 'Nuxt'],
    year: '2024',
    category: 'Portfolio',
    icon: 'ph:cube-bold'
  },
  {
    id: 3,
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates and team features.',
    technologies: ['React', 'Firebase', 'Tailwind', 'PWA'],
    year: '2023',
    category: 'Mobile App',
    icon: 'ph:list-checks-bold'
  },
  {
    id: 4,
    title: 'Data Visualization Dashboard',
    description:
      'Interactive dashboard for complex data analysis with dynamic charts and filters.',
    technologies: ['D3.js', 'Chart.js', 'Python', 'Flask'],
    year: '2023',
    category: 'Dashboard',
    icon: 'ph:chart-bar-bold'
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description:
      'A social networking platform with real-time messaging and content sharing features.',
    technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    year: '2023',
    category: 'Social',
    icon: 'ph:users-bold'
  },
  {
    id: 6,
    title: 'AI-Powered Chatbot',
    description:
      'An intelligent chatbot using natural language processing for customer support.',
    technologies: ['Python', 'TensorFlow', 'API', 'Docker'],
    year: '2024',
    category: 'AI/ML',
    icon: 'ph:robot-bold'
  }
]
</script>
