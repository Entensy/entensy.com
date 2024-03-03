<script setup>
import { inject } from "vue";
import { navigations } from '~/assets/contents/main.json'

const navigation = inject('navigation')
</script>

<template>
  <div v-motion :initial="{ y: -50, opacity: 0.15, }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 25, duration: 500, } }"
    class="sticky top-0 z-50 flex items-center justify-between w-full px-16 pt-12 ">
    <NuxtLink to="/">
      <img src="/images/logo.png" class="w-16 h-10" alt="logo">
    </NuxtLink>
    <div class="hidden text-white border rounded-full lg:block border-white/15 drop-shadow backdrop-blur-lg">
      <div class="flex items-center justify-center gap-8 px-12 py-4 capitalize text-md">
        <NuxtLink to="/">{{ navigations.home }}</NuxtLink>
        <NuxtLink to="#about">{{ navigations.about }}</NuxtLink>
        <NuxtLink to="#services">{{ navigations.services }}</NuxtLink>
        <NuxtLink to="#portfolio">{{ navigations.portfolio }}</NuxtLink>
      </div>
    </div>
    <div>
      <NuxtLink to="#contact-us">
        <button class="hidden p-4 text-white capitalize border rounded-full lg:block border-white/15 bg-blur">
          {{ navigations.contact }}
        </button>
      </NuxtLink>
    </div>
    <div class="flex lg:hidden">
      <button @click="navigation.toggle()"
        class="p-4 text-white capitalize border rounded-full border-white/15 bg-blur">
        <Transition name="rotation" mode="out-in">
          <svg v-if="navigation.state" viewBox="0 0 20 20" fill="currentColor" width="32" height="32"
            color="var(--token-9ba5df47-566d-4cce-965a-b909bddf5adc, rgb(204, 204, 204))"
            class="transition-all duration-150" style="width: 100%; height: 100%;">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="!navigation.state" viewBox="0 0 20 20" fill="currentColor" width="32" height="32"
            color="var(--token-9ba5df47-566d-4cce-965a-b909bddf5adc, rgb(204, 204, 204))"
            style="width: 100%; height: 100%;" class="transition-all duration-150">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </Transition>
      </button>

      <Transition name="bounce" mode="out-in">
        <div v-if="navigation.state"
          class="block lg:hidden absolute top-32 left-12 right-12 text-white border rounded-2xl border-white/15 drop-shadow backdrop-blur-lg">
          <div class="flex flex-col items-center justify-center gap-8 px-12 py-4 capitalize text-md">
            <NuxtLink to="/">{{ navigations.home }}</NuxtLink>
            <NuxtLink to="#about">{{ navigations.about }}</NuxtLink>
            <NuxtLink to="#services">{{ navigations.services }}</NuxtLink>
            <NuxtLink to="#portfolio">{{ navigations.portfolio }}</NuxtLink>
            <NuxtLink to="#contact-us">{{ navigations.contact }}</NuxtLink>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 400ms;
}

.bounce-leave-active {
  animation: bounce-in 400ms reverse;
}

.rotation-enter-active {
  animation: rotate 300ms;
}

.rotation-leave-active {
  animation: rotate 300ms reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.10);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(180deg);
  }
}
</style>
