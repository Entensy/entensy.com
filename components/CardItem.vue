<template>
  <component
    :is="as"
    ref="refElement"
    :class="[$props.class]"
    style="transition: transform 0.1s ease-in-out"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useMouseState } from '~/composables/useMouseState';
import { inject, ref, watch } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  class: String,
  translateX: { type: [Number, String], default: 0 },
  translateY: { type: [Number, String], default: 0 },
  translateZ: { type: [Number, String], default: 0 },
  rotateX: { type: [Number, String], default: 0 },
  rotateY: { type: [Number, String], default: 0 },
  rotateZ: { type: [Number, String], default: 0 },
});

const refElement = ref<HTMLElement | null>(null);
const mouseState = inject('use3DCardMouseState') as ReturnType<
  typeof useMouseState
>;

function handleAnimation(isMouseEntered: boolean) {
  if (!refElement.value) return;
  if (isMouseEntered) {
    refElement.value.style.transform = `translateX(${props.translateX}px) translateY(${props.translateY}px) translateZ(${props.translateZ}px) rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg) rotateZ(${props.rotateZ}deg)`;
  } else {
    refElement.value.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  }
}

watch(mouseState.isMouseEntered, handleAnimation, { immediate: true });
</script>
