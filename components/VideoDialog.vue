<template>
  <div :class="['relative', className]">
    <div class="group relative cursor-pointer" @click="isVideoOpen = true">
      <img
        :src="thumbnailSrc"
        :alt="thumbnailAlt"
        width="1920"
        height="1080"
        class="ease translate-z-0 w-full transform rounded-xl shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] brightness-[0.8] transition-all duration-200 ease-out will-change-[height,transform] group-hover:brightness-[1]"
      />
      <div
        class="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100"
      >
        <div
          class="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md"
        >
          <div
            class="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
          >
            <PlayIcon
              class="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
              style="
                filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
                  drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
              "
            />
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isVideoOpen"
          @click="isVideoOpen = false"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <Transition
            :enter-active-class="getEnterActiveClass"
            :leave-active-class="getLeaveActiveClass"
            :enter-from-class="getEnterFromClass"
            :leave-to-class="getLeaveToClass"
          >
            <div
              v-if="isVideoOpen"
              class="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              @click.stop
            >
              <button
                class="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
                @click="isVideoOpen = false"
              >
                <XIcon class="size-5" />
              </button>
              <div
                class="relative isolate z-[1] size-full overflow-hidden rounded-2xl"
              >
                <iframe
                  :src="videoSrc"
                  class="size-full rounded-2xl"
                  allowfullscreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PlayIcon, XIcon } from 'lucide-vue-next';

const props = defineProps({
  animationStyle: {
    type: String,
    default: 'from-center',
    validator: (value) =>
      [
        'from-bottom',
        'from-center',
        'from-top',
        'from-left',
        'from-right',
        'fade',
        'top-in-bottom-out',
        'left-in-right-out',
      ].includes(value),
  },
  videoSrc: {
    type: String,
    required: true,
  },
  thumbnailSrc: {
    type: String,
    required: true,
  },
  thumbnailAlt: {
    type: String,
    default: 'Video thumbnail',
  },
  className: {
    type: String,
    default: '',
  },
});

const isVideoOpen = ref(false);

// Animation classes based on animation style
const getEnterActiveClass = computed(() => {
  const baseClass = 'transition duration-300 ease-out';
  return baseClass;
});

const getLeaveActiveClass = computed(() => {
  const baseClass = 'transition duration-200 ease-in';
  return baseClass;
});

const getEnterFromClass = computed(() => {
  switch (props.animationStyle) {
    case 'from-bottom':
      return 'opacity-0 translate-y-full';
    case 'from-center':
      return 'opacity-0 scale-50';
    case 'from-top':
      return 'opacity-0 -translate-y-full';
    case 'from-left':
      return 'opacity-0 -translate-x-full';
    case 'from-right':
      return 'opacity-0 translate-x-full';
    case 'fade':
      return 'opacity-0';
    case 'top-in-bottom-out':
      return 'opacity-0 -translate-y-full';
    case 'left-in-right-out':
      return 'opacity-0 -translate-x-full';
    default:
      return 'opacity-0';
  }
});

const getLeaveToClass = computed(() => {
  switch (props.animationStyle) {
    case 'from-bottom':
      return 'opacity-0 translate-y-full';
    case 'from-center':
      return 'opacity-0 scale-50';
    case 'from-top':
      return 'opacity-0 -translate-y-full';
    case 'from-left':
      return 'opacity-0 -translate-x-full';
    case 'from-right':
      return 'opacity-0 translate-x-full';
    case 'fade':
      return 'opacity-0';
    case 'top-in-bottom-out':
      return 'opacity-0 translate-y-full';
    case 'left-in-right-out':
      return 'opacity-0 translate-x-full';
    default:
      return 'opacity-0';
  }
});
</script>
