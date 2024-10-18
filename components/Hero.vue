<script setup>
import { hero } from '~/assets/contents/main.json';
import { inject } from 'vue';

const __ = inject('locale');
</script>

<template>
  <section class="relative flex justify-center px-16 pt-24">
    <div class="relative flex flex-col items-center justify-center w-full gap-3 h-min max-w-7xl">
      <div class="relative flex flex-col items-center justify-center max-w-3xl gap-8 h-min">
        <h1
          v-motion
          :initial="{
            scale: 0.75,
            opacity: 0.15,
          }"
          :enter="{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 25,
              duration: 1000,
            },
          }"
          class="text-2xl text-center text-white uppercase lg:text-6xl"
        >
          {{ __.translate(hero.heading) }}
        </h1>
        <h2
          v-motion
          :initial="{
            y: 25,
            opacity: 0.15,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: {
              delay: 25,
              duration: 1000,
            },
          }"
          class="text-sm text-center text-gray-300 capitalize lg:text-base w-fulltext-lg lg:w-1/2"
        >
          {{ __.translate(hero.subheading) }}
        </h2>
        <div>
          <div class="flex gap-4">
            <button
              class="ease translate-z-0 transform rounded-full bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] lg:px-8 lg:py-4 px-4 py-2 text-sm  lg:text-base font-medium uppercase text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] duration-300 will-change-[height,transform]"
            >
              {{ __.translate(hero.left_action) }}
            </button>
            <button
              class="main-btn ease translate-z-0 transform rounded-full lg:py-4 px-4 py-2 text-sm  lg:text-base font-medium uppercase text-gray-300 duration-300 will-change-[height,transform]"
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
      <div class="relative hidden h-[350px] w-full items-end justify-between lg:flex">
        <img
          class="absolute object-cover w-56 shadow-2xl h-w-56 -left-64 -top-56 rounded-3xl lg:-left-16"
          src="/images/1.webp"
          alt=""
        />
        <img
          class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl"
          src="/images/2.webp"
          alt=""
        />
        <img
          class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl"
          src="/images/3.webp"
          alt=""
        />
        <img
          class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl"
          src="/images/4.webp"
          alt=""
        />
        <img
          class="absolute object-cover w-56 shadow-2xl h-w-56 -right-64 -top-56 rounded-3xl lg:right-8"
          src="/images/5.webp"
          alt=""
        />
      </div>
    </div>

    <div class="absolute bottom-0 hidden w-full h-52 bg-gradient-to-t from-black/50 lg:block"></div>
  </section>
</template>
