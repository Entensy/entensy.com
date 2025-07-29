<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import { navigations, languages } from '~/assets/contents/main.json';
import { useColorMode } from '@vueuse/core';

// Injections
const navigation = inject('navigation');
const __ = inject('locale');

// Theme management
const colorMode = useColorMode({
  attribute: 'class',
  modes: { light: 'light', dark: 'dark' },
  storage: localStorage,
  storageKey: 'entensy-theme-preference',
  emitAuto: true,
});

// Computed properties for reusable class logic
const bgGradient = computed(() => ({
  dark: 'bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(11,12,14,0.9)] text-white shadow-[inset_0_0_15px_0_hsla(0,0%,100%,0.10)]',
  light:
    'bg-gradient-to-br from-[rgba(248,249,250,0.75)] to-[rgba(233,236,239,0.9)] text-gray-900 shadow-[inset_0_0_15px_0_hsla(0,0%,0%,0.05)]',
}));

const buttonGradient = computed(() => ({
  dark: 'bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)]',
  light:
    'bg-gradient-to-br from-[rgba(248,249,250,0.75)] to-[rgba(233,236,239,0.9)] shadow-[inset_0_1px_1px_0_hsla(0,0%,0%,0.05)]',
}));

const textHover = computed(() => ({
  dark: 'text-gray-300 hover:text-white focus:text-white',
  light: 'text-gray-600 hover:text-gray-900 focus:text-gray-900',
}));

// Functions
function toggleTheme() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
}

function closeMobileMenu() {
  if (navigation.state) navigation.toggle();
}

// Theme setup on mount
onMounted(() => {
  if (!localStorage.getItem('entensy-theme-preference')) {
    colorMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
});
</script>

<template>
  <header
    v-motion
    :initial="{ y: -50, opacity: 0 }"
    :enter="{
      y: 0,
      opacity: 1,
      transition: {
        delay: 100, // Slightly increased for polish
        duration: 500, // Reduced from 900 for snappier feel
        ease: 'ease-in-out', // Smoother than 'ease'
      },
    }"
    class="sticky top-0 z-50 flex w-full items-center justify-between transition-all duration-300"
    :class="[
      bgGradient[colorMode],
      'p-4 backdrop-blur-[8px] lg:bg-none lg:px-12 lg:py-6 lg:shadow-none lg:backdrop-blur-0',
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <!-- Logo -->
    <NuxtLink to="/" @click="closeMobileMenu">
      <img
        src="/images/logo.png"
        class="h-10 w-16 outline-none transition-transform duration-200 hover:scale-105 focus:scale-105"
        alt="Entensy Logo"
      />
    </NuxtLink>

    <!-- Desktop Navigation -->
    <nav
      class="hidden rounded-[16px] backdrop-blur-[5px] transition-all duration-300 lg:block"
      :class="buttonGradient[colorMode]"
    >
      <div
        class="text-md flex items-center justify-center gap-8 px-12 py-4 capitalize"
      >
        <NuxtLink
          v-for="(value, key) in navigations"
          :key="key"
          :to="key === 'home' ? '/' : key === 'about' ? '/about' : `#${key}`"
          class="text-sm capitalize opacity-90 transition-all duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          :class="textHover[colorMode]"
          @click="closeMobileMenu"
        >
          {{ __.translate(value) }}
        </NuxtLink>
      </div>
    </nav>

    <!-- Theme toggle and contact button container -->
    <div class="flex items-center gap-3">
      <!-- Theme Toggle Button -->
      <!-- <button
        @click="toggleTheme"
        class="hidden lg:block rounded-[16px] p-4 text-sm capitalize transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        :class="buttonGradient[colorMode]"
        aria-label="Toggle between light and dark theme"
      >
        <Transition
          name="theme-toggle"
          mode="out-in"
        >
          <svg
            v-if="colorMode === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-all duration-200"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
            />
            <line
              x1="12"
              y1="1"
              x2="12"
              y2="3"
            />
            <line
              x1="12"
              y1="21"
              x2="12"
              y2="23"
            />
            <line
              x1="4.22"
              y1="4.22"
              x2="5.64"
              y2="5.64"
            />
            <line
              x1="18.36"
              y1="18.36"
              x2="19.78"
              y2="19.78"
            />
            <line
              x1="1"
              y1="12"
              x2="3"
              y2="12"
            />
            <line
              x1="21"
              y1="12"
              x2="23"
              y2="12"
            />
            <line
              x1="4.22"
              y1="19.78"
              x2="5.64"
              y2="18.36"
            />
            <line
              x1="18.36"
              y1="5.64"
              x2="19.78"
              y2="4.22"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-all duration-200"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </Transition>
      </button> -->

      <!-- Contact Button -->
      <NuxtLink to="#contact-us" class="hidden lg:block">
        <button
          class="rounded-[16px] p-4 text-sm capitalize transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          :class="[buttonGradient[colorMode], textHover[colorMode]]"
        >
          {{ __.translate(navigations.contact) }}
        </button>
      </NuxtLink>
    </div>

    <!-- Mobile Menu Button -->
    <div class="flex lg:hidden">
      <button
        @click="navigation.toggle()"
        class="rounded-[16px] p-2 shadow-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        :class="buttonGradient[colorMode]"
        aria-label="Toggle mobile menu"
        aria-expanded="navigation.state"
      >
        <Transition name="rotation" mode="out-in">
          <svg
            v-if="navigation.state"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="32"
            height="32"
            class="transition-all duration-200"
            style="width: 100%; height: 100%"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 20 20"
            fill="currentColor"
            width="32"
            height="32"
            class="transition-all duration-200"
            style="width: 100%; height: 100%"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </Transition>
      </button>

      <!-- Mobile Menu -->
      <Transition name="bounce" mode="out-in">
        <div
          v-if="navigation.state"
          class="absolute left-8 right-8 top-24 block rounded-[16px] backdrop-blur-[5px] transition-all duration-300 lg:hidden"
          :class="buttonGradient[colorMode]"
        >
          <div
            class="text-md flex flex-col items-center justify-center gap-8 px-12 py-4 capitalize"
          >
            <NuxtLink
              v-for="(value, key) in navigations"
              :key="key"
              :to="
                key === 'home' ? '/' : key === 'about' ? '/about' : `#${key}`
              "
              class="text-sm capitalize transition-all duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              :class="textHover[colorMode]"
              @click="closeMobileMenu"
            >
              {{ __.translate(value) }}
            </NuxtLink>

            <!-- Theme Toggle in Mobile Menu -->
            <div class="flex items-center gap-2">
              <span
                class="text-sm transition-all duration-200"
                :class="
                  colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                "
              >
                {{ colorMode === 'dark' ? 'Dark' : 'Light' }} Mode
              </span>
              <button
                @click="toggleTheme"
                class="rounded-[16px] p-2 shadow-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                :class="buttonGradient[colorMode]"
                aria-label="Toggle theme in mobile menu"
              >
                <Transition name="theme-toggle" mode="out-in">
                  <svg
                    v-if="colorMode === 'dark'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </Transition>
              </button>
            </div>

            <!-- Language Buttons -->
            <div class="flex gap-2">
              <button
                class="rounded-[16px] px-4 py-2 text-sm capitalize transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                :class="[buttonGradient[colorMode], textHover[colorMode]]"
                @click="__.setLocale('en')"
              >
                {{ __.translate(languages.en) }}
              </button>
              <button
                class="rounded-[16px] px-4 py-2 text-sm capitalize transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                :class="[buttonGradient[colorMode], textHover[colorMode]]"
                @click="__.setLocale('ckb')"
              >
                {{ __.translate(languages.ckb) }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Scoped styles to avoid global pollution */

/* Mobile menu slide animation */
.bounce-enter-active {
  animation: slide-in 0.3s ease-in-out;
}

.bounce-leave-active {
  animation: slide-in 0.3s ease-in-out reverse;
}

@keyframes slide-in {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile menu toggle animation */
.rotation-enter-active,
.rotation-leave-active {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.rotation-enter-from,
.rotation-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

/* Theme toggle animation */
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.theme-toggle-enter-from,
.theme-toggle-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>
