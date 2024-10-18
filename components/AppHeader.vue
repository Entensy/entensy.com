<script setup>
import { inject } from 'vue';
import { navigations, languages } from '~/assets/contents/main.json';

const navigation = inject('navigation');
const __ = inject('locale');
</script>

<template>
  <div
    v-motion
    :initial="{ y: -50, opacity: 0.15 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 25, duration: 500 } }"
    class="ease translate-z-0 sticky top-0 z-50 flex w-full transform items-center justify-between bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] lg:px-12 lg:py-6 p-4 shadow-[inset_0_0_15px_0_hsla(0,0%,100%,0.10)] backdrop-blur-[5px] transition-[height,transform] duration-300 will-change-[height,transform] lg:bg-none lg:shadow-none lg:backdrop-blur-0"
  >
    <NuxtLink to="/">
      <img
        src="/images/logo.png"
        class="w-16 h-10"
        alt="Entensy Logo"
      />
    </NuxtLink>
    <div
      class="ease translate-z-0 hidden transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] text-white shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-[height,transform] duration-300 will-change-[height,transform] lg:block"
    >
      <div class="flex items-center justify-center gap-8 px-12 py-4 capitalize text-md">
        <NuxtLink
          to="/"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.home) }}</NuxtLink>
        <NuxtLink
          to="/about"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.about) }}</NuxtLink>
        <NuxtLink
          to="#services"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.services) }}</NuxtLink>
        <NuxtLink
          to="#portfolio"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.portfolio) }}</NuxtLink>
        <NuxtLink
          to="#questions"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.questions) }}</NuxtLink>
        <NuxtLink
          to="/#contact"
          class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
        >{{ __.translate(navigations.contact) }}</NuxtLink>

      </div>
    </div>
    <div>
      <NuxtLink to="#contact-us">
        <button
          class="ease translate-z-0 hidden transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] p-4 text-sm capitalize text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-colors duration-300 will-change-[height,transform] hover:text-white lg:block"
        >
          {{ __.translate(navigations.contact) }}
        </button>
      </NuxtLink>
    </div>
    <div class="flex lg:hidden">
      <button
        @click="navigation.toggle()"
        class="ease translate-z-0 transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] p-2 capitalize text-white shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-[height,transform] duration-300 will-change-[height,transform]"
      >
        <Transition
          name="rotation"
          mode="out-in"
        >
          <svg
            v-if="navigation.state"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="32"
            height="32"
            color="var(--token-9ba5df47-566d-4cce-965a-b909bddf5adc, rgb(204, 204, 204))"
            class="transition-all duration-150"
            style="width: 100%; height: 100%"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            v-else-if="!navigation.state"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="32"
            height="32"
            color="var(--token-9ba5df47-566d-4cce-965a-b909bddf5adc, rgb(204, 204, 204))"
            style="width: 100%; height: 100%"
            class="transition-all duration-150"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Transition>
      </button>

      <Transition
        name="bounce"
        mode="out-in"
      >
        <div
          v-if="navigation.state"
          class="ease translate-z-0 absolute left-12 right-12 top-24 block transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] text-white shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-[height,transform] duration-300 will-change-[height,transform] lg:hidden"
        >
          <div class="flex flex-col items-center justify-center gap-8 px-12 py-4 capitalize text-md">
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="/"
            >{{ __.translate(navigations.home) }}</NuxtLink>
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="/about"
            >{{ __.translate(navigations.about) }}</NuxtLink>
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="#services"
            >{{ __.translate(navigations.services) }}</NuxtLink>
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="#portfolio"
            >{{ __.translate(navigations.portfolio) }}</NuxtLink>
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="#contact-us"
            >{{ __.translate(navigations.questions) }}</NuxtLink>
            <NuxtLink
              class="text-sm text-gray-300 capitalize transition-colors hover:text-white"
              to="#contact-us"
            >{{ __.translate(navigations.contact) }}</NuxtLink>
            <div class="flex gap-2">
              <button
                class="ease translate-z-0 transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 text-sm capitalize text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-colors duration-300 will-change-[height,transform] hover:text-white"
                @click="__.setLocale('en')"
              >
                {{ __.translate(languages.en) }}
              </button>
              <button
                class="ease translate-z-0 transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 text-sm capitalize text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-colors duration-300 will-change-[height,transform] hover:text-white"
                @click="__.setLocale('ckb')"
              >
                {{ __.translate(languages.ckb) }}
              </button>
            </div>
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
    transform: scale(1.1);
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
