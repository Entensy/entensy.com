<script setup>
import { heading, subheading, list } from '~/assets/contents/faqs.json';
import { inject } from 'vue';

const faqs = reactive(list);
const __ = inject('locale');
</script>

<template>
  <section
    id="faq"
    class="flex w-full flex-col items-center gap-8 px-4 py-24 pb-16"
  >
    <div class="flex flex-col gap-16">
      <div class="flex w-full flex-col items-center justify-center gap-3">
        <span class="font-medium capitalize text-primary">{{
          __.translate(subheading)
        }}</span>
        <h1 class="w-full text-center text-4xl text-white lg:w-2/3 lg:text-5xl">
          {{ __.translate(heading) }}
        </h1>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-2">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="bg-card-gradient flex max-w-3xl gap-2 rounded-2xl p-6 text-white"
      >
        <div class="flex flex-col justify-between">
          <h1
            class="cursor-pointer select-none text-xl"
            @click="faq.collapsed = !faq.collapsed"
          >
            {{ __.translate(faq.title) }}
          </h1>
          <span
            class="invisible h-0 text-base text-accent-light"
            :class="{ 'roll-down !visible mt-4 h-auto': faq.collapsed }"
          >
            {{ __.translate(faq.content) }}
          </span>
        </div>
        <button
          @click="faq.collapsed = !faq.collapsed"
          class="self-start font-mono text-2xl font-bold"
        >
          <svg
            fill="#ffffff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16"
            height="16"
            viewBox="0 0 45.402 45.402"
            xml:space="preserve"
          >
            <g>
              <path
                d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style>
.roll-down {
  animation: rolldown 400ms ease;
}

@keyframes rolldown {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: auto;
    opacity: 1;
  }
}
</style>
