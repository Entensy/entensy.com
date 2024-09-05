<script setup>
import { wwa, hww, wu } from '~/assets/contents/about.json';
import { inject } from 'vue';

const __ = inject('locale');
</script>



<template>
  <div class="container flex flex-col items-center justify-center py-4 mx-auto">

    <div class="flex flex-col gap-8 p-4 max-w-7xl">
      <h1 class="text-3xl text-white lg:text-5xl">
        {{ __.translate(wwa.title) }}
      </h1>
      <span class="text-sm text-gray-300">
        {{ __.translate(wwa.content) }}
      </span>
    </div>

    <div class="flex flex-col gap-8 p-4 max-w-7xl">
      <h1 class="text-3xl text-white lg:text-5xl">
        {{ __.translate(hww.title) }}
      </h1>
      <span class="text-sm text-gray-300">
        {{ __.translate(hww.content) }}
      </span>
    </div>

    <div class="flex flex-col gap-8 p-4 max-w-7xl">
      <h1 class="text-3xl text-white lg:text-5xl">
        {{ __.translate(wu.title) }}
      </h1>
      <span class="text-sm text-gray-300">
        {{ __.translate(wu.content) }}
      </span>
    </div>


  </div>
</template>
