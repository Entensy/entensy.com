<script setup>
import { hero } from '~/assets/contents/main.json'
</script>

<template>
  <section class="relative flex justify-center px-16 pt-24">
    <div class="relative flex flex-col items-center justify-center w-full gap-3 max-w-7xl h-min">
      <div class="relative flex flex-col items-center justify-center max-w-3xl gap-8 h-min">
        <h1 v-motion :initial="{
          scale: .75,
          opacity: 0.15,

        }" :enter="{
          scale: 1,
          opacity: 1,
          transition: {
            delay: 25,
            duration: 1000,
          },
        }" class="text-5xl text-center text-white uppercase lg:text-7xl">
          {{ hero.heading }}
        </h1>
        <h2 v-motion :initial="{
          y: 25,
          opacity: 0.15,

        }" :enter="{
          y: 0,
          opacity: 1,
          transition: {
            delay: 25,
            duration: 1000,
          },
        }" class="text-center text-white w-fulltext-lg lg:w-1/2">
          {{ hero.subheading }}
        </h2>
        <div>
          <div class="flex gap-4">
            <button class="px-8 py-4 font-medium text-white uppercase border rounded-full border-white/15 bg-blur">
              Contact US
            </button>
            <button
              class="px-8 py-4 font-medium text-white uppercase bg-primary border rounded-full shadow-2xl border-white/15 shadow-primary">
              contact us
            </button>
          </div>
        </div>
      </div>
      <div class="relative lg:flex items-end justify-between w-full h-[350px] hidden">
        <img class="absolute object-cover w-56 shadow-2xl h-w-56 rounded-3xl -top-56 -left-64 lg:-left-16"
          src="/images/1.webp" alt="">
        <img class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl" src="/images/2.webp" alt="">
        <img class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl" src="/images/3.webp" alt="">
        <img class="object-cover w-56 shadow-2xl h-w-56 rounded-3xl" src="/images/4.webp" alt="">
        <img class="absolute object-cover w-56 shadow-2xl h-w-56 rounded-3xl -top-56 -right-64 lg:right-8"
          src="/images/5.webp" alt="">
      </div>
    </div>

    <!-- hero footer effect -->
    <div class="absolute bottom-0 hidden w-full h-52 bg-gradient-to-t from-black/50 lg:block">
    </div>
  </section>
</template>
