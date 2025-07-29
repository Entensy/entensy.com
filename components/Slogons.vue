<!-- pages/index.vue -->
<template>
  <section class="container mx-auto p-4">
    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- Enhance Ripple -->
      <div
        class="bg-background ease translate-z-0 flex h-[300px] w-full transform flex-col items-center justify-center overflow-hidden rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] will-change-[height,transform] lg:h-[500px]"
      >
        <p
          class="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white lg:text-3xl"
        >
          Enhance
        </p>
        <Ripple shapeType="circle" />
      </div>
      <!-- Efficiency Ripple -->
      <div
        class="bg-background ease translate-z-0 flex h-[300px] w-full transform flex-col items-center justify-center overflow-hidden rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] will-change-[height,transform] lg:h-[500px]"
      >
        <p
          class="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white lg:text-3xl"
        >
          Efficiency
        </p>
        <Ripple shapeType="all" />
      </div>

      <!-- Extensive Ripple -->
      <div
        class="bg-background ease translate-z-0 flex h-[300px] w-full transform flex-col items-center justify-center overflow-hidden rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-4 py-2 shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] will-change-[height,transform] lg:h-[500px]"
      >
        <p
          class="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white lg:text-3xl"
        >
          Extensive
        </p>
        <Ripple shapeType="square" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Ripple from '~/components/Ripple.vue';
</script>
