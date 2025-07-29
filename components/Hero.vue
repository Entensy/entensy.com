<script setup>
import { hero } from '~/assets/contents/main.json';
import { inject } from 'vue';
import CardContainer from '~/components/CardContainer.vue';
import CardBody from '~/components/CardBody.vue';
import CardItem from '~/components/CardItem.vue';

const __ = inject('locale');
</script>

<template>
  <ClientOnly>
    <section class="relative flex justify-center px-16 py-24 lg:pb-0">
      <div
        class="max-w-9xl relative flex h-min w-full flex-col items-center justify-center gap-3"
      >
        <div
          class="relative flex h-min max-w-3xl flex-col items-center justify-center gap-8"
        >
          <h1
            v-motion
            :initial="{ scale: 0.75, opacity: 0.15 }"
            :enter="{
              scale: 1,
              opacity: 1,
              transition: {
                delay: 50,
                duration: 1200,
                ease: 'ease-in-out',
              },
            }"
            class="text-center text-2xl uppercase text-white lg:text-6xl"
          >
            {{ __.translate(hero.heading) }}
          </h1>
          <h2
            v-motion
            :initial="{ y: 25, opacity: 0.15 }"
            :enter="{
              y: 0,
              opacity: 1,
              transition: {
                delay: 100,
                duration: 1000,
                ease: 'ease-in-out',
              },
            }"
            class="w-full text-center text-sm capitalize text-gray-300 lg:w-1/2 lg:text-base"
          >
            {{ __.translate(hero.subheading) }}
          </h2>
          <div>
            <div class="flex gap-4">
              <button
                class="ease translate-z-0 transform rounded-full bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 text-xs font-medium uppercase text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-transform duration-300 will-change-[height,transform] hover:scale-105 lg:px-8 lg:py-4"
              >
                {{ __.translate(hero.left_action) }}
              </button>
              <button
                class="main-btn ease translate-z-0 transform rounded-full px-4 py-2 text-xs font-medium uppercase text-gray-300 transition-transform duration-300 will-change-[height,transform] hover:scale-105 lg:py-4 lg:text-base"
              >
                {{ __.translate(hero.right_action) }}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="relative hidden h-[350px] w-full items-end justify-between lg:flex"
        >
          <CardContainer class="absolute -top-[19rem]">
            <CardBody
              class="relative h-60 w-60 overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-black"
            >
              <CardItem
                :translate-z="100"
                class="h-full w-full transition-transform duration-500 ease-in-out"
              >
                <img
                  src="/public/images/1.webp"
                  alt=""
                  class="h-full w-full object-cover"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
          <div class="flex w-full justify-evenly">
            <CardContainer class="relative">
              <CardBody
                class="relative h-56 w-56 overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-black"
              >
                <CardItem
                  :translate-z="100"
                  class="h-full w-full transition-transform duration-500 ease-in-out"
                >
                  <img
                    src="/public/images/2.webp"
                    alt=""
                    class="h-full w-full object-cover"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer class="relative">
              <CardBody
                class="relative h-56 w-56 overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-black"
              >
                <CardItem
                  :translate-z="100"
                  class="h-full w-full transition-transform duration-500 ease-in-out"
                >
                  <img
                    src="/public/images/3.webp"
                    alt=""
                    class="h-full w-full object-cover"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer class="relative">
              <CardBody
                class="relative h-56 w-56 overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-black"
              >
                <CardItem
                  :translate-z="100"
                  class="h-full w-full transition-transform duration-500 ease-in-out"
                >
                  <img
                    src="/public/images/4.webp"
                    alt=""
                    class="h-full w-full object-cover"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <CardContainer class="absolute -top-[19rem]">
            <CardBody
              class="relative h-60 w-60 overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-black"
            >
              <CardItem
                :translate-z="100"
                class="h-full w-full transition-transform duration-500 ease-in-out"
              >
                <img
                  src="/public/images/5.webp"
                  alt=""
                  class="h-full w-full object-cover"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      <div
        class="absolute bottom-0 hidden h-52 w-full bg-gradient-to-t from-black/50 lg:block"
      ></div>
    </section>
  </ClientOnly>
</template>
