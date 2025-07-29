<!-- ~/components/ReviewsSection.vue -->
<template>
  <div
    class="relative flex w-full flex-col items-center justify-center overflow-hidden bg-primary/50 lg:h-[500px]"
  >
    <!-- First Marquee -->
    <ClientOnly>
      <Marquee pause-on-hover class="[--duration:20s]">
        <ClientCard
          v-for="review in firstRow"
          :key="review.img"
          :img="review.img"
        />
      </Marquee>
    </ClientOnly>

    <!-- Second Marquee (reverse) -->
    <ClientOnly>
      <Marquee reverse pause-on-hover class="[--duration:20s]">
        <ClientCard
          v-for="review in secondRow"
          :key="review.img"
          :img="review.img"
        />
      </Marquee>
    </ClientOnly>

    <!-- Left Gradient -->
    <!-- <div
      class="absolute inset-y-0 left-0 w-1/2 pointer-events-none bg-gradient-to-r from-primary/60 dark:from-background"
    /> -->

    <!-- Top Gradient
    <div
      class="absolute inset-y-0 top-0 w-full pointer-events-none bg-gradient-to-b from-[#111214] dark:from-background"
    /> -->

    <!--  bottoom -->
    <!-- <div
      class="absolute  -bottom-10 top-0 right-0 w-1/2 pointer-events-none bg-gradient-to-t from-[#111214] dark:from-background"
    /> -->

    <!-- bottoom -->
    <!-- <div
      class="absolute -inset-0 -bottom-10 top-0 w-1/2 pointer-events-none bg-gradient-to-t from-[#111214] dark:from-background"
    /> -->

    <!-- Right Gradient -->
    <!-- <div
      class="absolute inset-y-0 right-0 w-1/2 pointer-events-none bg-gradient-to-l from-primary/20 dark:from-background"
    /> -->
  </div>
</template>

<script setup lang="ts">
import Marquee from '~/components/Marquee.vue';
import ClientCard from '~/components/ClientCard.vue';

// Reviews data
const reviews = [
  { img: 'https://avatar.vercel.sh/jack' },
  { img: 'https://avatar.vercel.sh/jill' },
  { img: 'https://avatar.vercel.sh/john' },
  { img: 'https://avatar.vercel.sh/jane' },
  { img: 'https://avatar.vercel.sh/jenny' },
  { img: 'https://avatar.vercel.sh/james' },
];

// Split reviews into two rows
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
</script>
