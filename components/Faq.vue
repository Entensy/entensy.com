<script setup>
import { heading, subheading, list } from '~/assets/contents/faqs.json';
import { inject, ref, reactive, onMounted, watch, nextTick } from 'vue';

// Inject locale
const __ = inject('locale');

// Make faqs reactive
const faqs = reactive(
  list.map((faq) => ({
    ...faq,
    collapsed: false, // Initialize collapsed state for each FAQ
    contentHeight: 0, // Store height for each FAQ
  }))
);

// Refs for content divs (one per FAQ)
const contentRefs = ref([]);

// Measure height for a specific FAQ
const setContentHeight = (index) => {
  const contentDiv = contentRefs.value[index];
  if (contentDiv) {
    const originalHeight = contentDiv.style.height;
    contentDiv.style.height = 'auto';
    nextTick(() => {
      faqs[index].contentHeight = contentDiv.scrollHeight;
      contentDiv.style.height = originalHeight; // Reset to original for transition
    });
  }
};

// Measure heights when mounted and when content changes
onMounted(() => {
  faqs.forEach((_, index) => setContentHeight(index));
});

watch(
  () => faqs.map((faq) => faq.content), // Watch for content changes
  () => {
    faqs.forEach((_, index) => setContentHeight(index));
  },
  { deep: true }
);
</script>

<template>
  <section
    id="faq"
    class="relative flex w-full flex-col items-center gap-8 px-4 pb-48 pt-24"
  >
    <div class="flex flex-col gap-16">
      <div class="flex w-full flex-col items-center justify-center gap-3">
        <span class="text-base font-medium capitalize text-primary lg:text-2xl">
          {{ __.translate(subheading) }}
        </span>
        <h1 class="w-full text-center text-xl text-white lg:w-2/3 lg:text-3xl">
          {{ __.translate(heading) }}
        </h1>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-2">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="g:p-6 bg-card-gradient flex max-w-3xl gap-2 rounded-2xl p-4 text-primary dark:text-white"
      >
        <div class="flex w-full flex-col justify-between">
          <h1
            class="cursor-pointer select-none text-base lg:text-lg"
            @click="faq.collapsed = !faq.collapsed"
          >
            {{ __.translate(faq.title) }}
          </h1>
          <div
            ref="contentRefs"
            class="ease-in-out-sine overflow-hidden transition-all duration-500"
            :style="{
              height: faq.collapsed ? `${faq.contentHeight}px` : '0px',
              opacity: faq.collapsed ? 1 : 0,
            }"
          >
            <span class="mt-4 block text-sm text-accent-light lg:text-base">
              {{ __.translate(faq.content) }}
            </span>
          </div>
        </div>
        <button
          @click="faq.collapsed = !faq.collapsed"
          class="ease-in-out-sine self-center font-mono text-2xl font-bold transition-transform duration-500"
          :class="{ 'rotate-45': faq.collapsed }"
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

    <div
      class="absolute bottom-0 h-32 w-full bg-gradient-to-t from-primary/50 lg:block"
    ></div>
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
