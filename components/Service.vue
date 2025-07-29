<template>
  <section class="relative flex flex-col justify-center py-24 lg:gap-8">
    <div
      class="absolute top-0 h-52 w-full bg-gradient-to-b from-black/50 lg:block"
    ></div>
    <div class="flex w-full flex-col items-center justify-center gap-3">
      <span class="text-base font-medium capitalize text-primary lg:text-2xl">
        subheading
      </span>
      <span class="text-center text-xl text-white lg:text-start lg:text-3xl">
        heading
      </span>
    </div>
    <ul
      class="container mx-auto grid grid-cols-1 grid-rows-none gap-4 overflow-auto p-4 md:grid-cols-10 md:grid-rows-3 lg:gap-4 xl:max-h-[56rem] xl:grid-rows-2"
    >
      <li
        v-for="item in gridItems"
        :key="item.title"
        :class="cn('min-h-[14rem] list-none', item.area)"
      >
        <div class="relative h-full rounded-lg">
          <GlowingEffect
            :spread="40"
            :glow="true"
            :disabled="false"
            :proximity="64"
            :inactive-zone="0.01"
          />
          <div
            class="border-0.75 ease translate-z-0 relative flex h-full transform flex-col justify-between gap-6 overflow-hidden rounded-lg bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] p-6 text-gray-300 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-[height,transform,background-color] duration-300 will-change-[height,transform] hover:text-white md:p-6 lg:block"
          >
            <div
              class="relative flex flex-1 flex-col justify-between gap-1 lg:gap-3"
            >
              <div class="w-fit rounded-lg border border-gray-600 p-2">
                <Icon
                  class="size-4 text-black dark:text-neutral-500"
                  :name="item.icon"
                ></Icon>
              </div>
              <div class="space-y-3">
                <h3
                  class="-tracking-4 text-balance pt-0.5 text-base font-semibold text-black md:text-2xl/[1.875rem] lg:text-lg dark:text-white"
                >
                  {{ item.title }}
                </h3>
                <h2
                  class="text-sm text-black md:text-base/[1.375rem] lg:text-base dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold"
                >
                  {{ item.description }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div
      class="flex w-3/4 flex-wrap items-center justify-center gap-4 self-center lg:w-3/5"
    >
      <button
        v-for="tag in tags"
        class="main-btn ease translate-z-0 transform rounded-full px-8 py-4 font-medium uppercase text-gray-300 duration-300 will-change-[height,transform]"
      >
        {{ __.translate(tag) }}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const __ = inject('locale');
import {
  heading,
  subheading,
  hlist,
  vlist,
  tags,
} from '~/assets/contents/services.json';
import { cn } from '@/lib/utils';

const gridItems = [
  {
    area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]',
    icon: 'lucide:box',
    title: 'Unbox Endless Possibilities',
    description:
      'Open up Inspira UI to discover so many features, you’ll wonder if you’ve wandered into a magical subscription for infinite goodies.',
  },
  {
    area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]',
    icon: 'lucide:settings',
    title: 'Crank the Dials to Eleven',
    description:
      'We packed Inspira UI with enough customizable settings to keep you tweaking forever. If it’s broken, you probably forgot to flip one more switch!',
  },
  {
    area: 'md:[grid-area:2/1/3/7] lg:[grid-area:1/5/3/8]',
    icon: 'lucide:music',
    title: 'Dance Your Way to Better UI',
    description:
      'Forget dull interfaces—Inspira UI brings your Vue and Nuxt apps to life with animations so smooth, you’ll wonder!',
  },
  {
    area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]',
    icon: 'lucide:sparkles',
    title: 'Spark a Little Magic',
    description:
      'Make your interface shine brighter than your future. Inspira UI turns that dull design into an enchanting experience—fairy dust included!',
  },
  {
    area: 'md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]',
    icon: 'lucide:search',
    title: 'Seek and You Shall Find',
    description:
      'Our search is so advanced it might unearth your lost socks. Just don’t blame us when you realize they don’t match!',
  },
];
</script>
