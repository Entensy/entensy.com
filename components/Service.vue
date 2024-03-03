<script setup>
import { heading, subheading, hlist, vlist, tags } from '~/assets/contents/services.json'
import { inject } from 'vue'

const __ = inject('locale')
</script>

<template>
  <section id="services" class="relative w-full">
    <div class="absolute top-0 hidden w-full h-52 bg-gradient-to-b from-black/50 lg:block">
    </div>

    <div class="flex flex-col items-center justify-center gap-16 py-24 pb-16 pt-28">
      <div class="flex flex-col items-center justify-center w-full gap-3">

        <span class="font-medium capitalize text-primary">{{ __.translate(subheading) }}</span>
        <h1 class="w-full text-4xl text-center text-white lg:text-5xl lg:w-1/2">
          {{ __.translate(heading) }}
        </h1>

      </div>

      <div class="flex flex-col gap-12 p-4">

        <div class="flex flex-col gap-8 lg:flex-row">

          <div v-for="service in vlist" class="flex flex-col gap-8 p-10 rounded-3xl bg-card-gradient">
            <img class="object-cover w-full h-64 rounded-2xl" src="/images/1.webp" alt="">
            <div class="flex flex-col gap-2">
              <h1 class="text-3xl text-white">
                {{ __.translate(service.title) }}
              </h1>
              <span class="text-white "> {{ __.translate(service.content) }} </span>
            </div>
          </div>

        </div>


        <div class="flex flex-col gap-8 lg:flex-row">

          <div v-for="service in hlist" class="flex w-full gap-4 text-white lg:w-1/2 rounded-3xl bg-card-gradient h-52">
            <div class="flex flex-col items-start justify-center w-1/2 gap-2 p-10">
              <h1 class="text-2xl"> {{ __.translate(service.title) }}
              </h1>
              <span class="text-white "> {{ __.translate(service.content) }} </span>
            </div>
            <div class="w-1/2">
              <img class="object-cover w-full h-full rounded-r-2xl" src="/images/1.webp" alt="images">
            </div>
          </div>

        </div>

        <div class="flex flex-wrap items-center self-center justify-center w-3/4 gap-4 lg:w-3/5">
          <div v-for="tag in tags"
            class="px-6 py-3 font-medium text-white uppercase border rounded-full border-white/15 bg-blur">
            <span class="text-secondery-light">{{ __.translate(tag) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
