<template>
  <section id="about" class="relative py-20">
    <div class="container mx-auto px-6">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <!-- Text Content -->
        <div class="space-y-8">
          <div class="reveal">
            <h2 class="mb-6 text-5xl font-bold">
              <span class="gradient-text">About</span>
              <span class="text-white"> Me</span>
            </h2>
          </div>

          <div
            class="reveal space-y-6 text-lg leading-relaxed text-gray-300"
            style="animation-delay: 0.2s"
          >
            <p>
              I'm a passionate full-stack developer with over 5 years of
              experience creating exceptional digital experiences. My journey
              began with a curiosity about how things work on the web, which
              evolved into a deep love for crafting beautiful, functional
              applications.
            </p>

            <p>
              I specialize in modern web technologies including React, Vue.js,
              Node.js, and various database systems. My approach combines
              technical expertise with creative problem-solving to deliver
              solutions that not only work flawlessly but also provide
              delightful user experiences.
            </p>

            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community through blog posts and tutorials.
            </p>
          </div>

          <div
            class="reveal flex flex-wrap gap-4"
            style="animation-delay: 0.4s"
          >
            <div class="glass rounded-lg px-4 py-2">
              <span class="text-accent font-semibold">5+</span>
              <span class="ml-2 text-gray-300">Years Experience</span>
            </div>
            <div class="glass rounded-lg px-4 py-2">
              <span class="text-accent font-semibold">100+</span>
              <span class="ml-2 text-gray-300">Projects Completed</span>
            </div>
            <div class="glass rounded-lg px-4 py-2">
              <span class="text-accent font-semibold">50+</span>
              <span class="ml-2 text-gray-300">Happy Clients</span>
            </div>
          </div>
        </div>

        <!-- Profile Image & Stats -->
        <div class="reveal relative" style="animation-delay: 0.3s">
          <div class="relative z-10">
            <!-- Profile Image Container -->
            <div class="relative mx-auto h-80 w-80">
              <div
                class="from-accent to-accent-light absolute inset-0 animate-pulse rounded-full bg-gradient-to-r opacity-20"
              ></div>
              <div class="glass absolute inset-4 overflow-hidden rounded-full">
                <div
                  class="from-accent/20 to-accent-light/20 flex h-full w-full items-center justify-center bg-gradient-to-br"
                >
                  <!-- Placeholder for profile image -->
                  <div class="text-accent text-8xl opacity-50">
                    <Icon name="ph:user-bold" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Skills -->
            <div
              class="glass animate-float absolute -left-4 -top-4 rounded-lg px-4 py-2"
              style="animation-delay: 0s"
            >
              <span class="text-accent font-semibold">Vue.js</span>
            </div>
            <div
              class="glass animate-float absolute -right-8 top-8 rounded-lg px-4 py-2"
              style="animation-delay: 1s"
            >
              <span class="text-accent font-semibold">Three.js</span>
            </div>
            <div
              class="glass animate-float absolute -bottom-8 left-8 rounded-lg px-4 py-2"
              style="animation-delay: 2s"
            >
              <span class="text-accent font-semibold">Node.js</span>
            </div>
            <div
              class="glass animate-float absolute -right-12 bottom-0 rounded-lg px-4 py-2"
              style="animation-delay: 0.5s"
            >
              <span class="text-accent font-semibold">TypeScript</span>
            </div>
          </div>

          <!-- Background Decoration -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="border-accent absolute left-0 top-0 h-32 w-32 rounded-full border-4"
            ></div>
            <div
              class="border-accent-light absolute bottom-0 right-0 h-24 w-24 rounded-full border-4"
            ></div>
            <div
              class="absolute left-1/4 top-1/2 h-16 w-16 rounded-full border-2 border-white"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="bg-accent absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-5 blur-3xl"
      ></div>
      <div
        class="bg-accent-light absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-5 blur-3xl"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic here
</script>
