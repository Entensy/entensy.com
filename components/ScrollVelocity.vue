<template>
  <section>
    <div
      v-for="(text, index) in texts"
      :key="index"
      class="relative overflow-hidden"
      :class="parallaxClassName"
      :style="parallaxStyle"
    >
      <div
        ref="scrollerRefs"
        class="flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-tight drop-shadow md:text-5xl md:leading-[5rem]"
        :class="scrollerClassName"
        :style="{
          ...scrollerStyle,
          transform: `translateX(${xValues[index]}px)`,
        }"
      >
        <span
          v-for="i in numCopies"
          :key="i"
          class="flex-shrink-0"
          :class="className"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';
import { useScroll, useRafFn, useResizeObserver } from '@vueuse/core';

const props = defineProps({
  texts: {
    type: Array,
    default: () => ['Vue Bits', 'Scroll Down'],
  },
  velocity: {
    type: Number,
    default: 100,
  },
  className: {
    type: String,
    default: '',
  },
  damping: {
    type: Number,
    default: 0.1,
  },
  numCopies: {
    type: Number,
    default: 6,
  },
  velocityMapping: {
    type: Object,
    default: () => ({ input: [0, 1000], output: [0, 5] }),
  },
  parallaxClassName: {
    type: String,
    default: '',
  },
  scrollerClassName: {
    type: String,
    default: '',
  },
  parallaxStyle: {
    type: Object,
    default: () => ({}),
  },
  scrollerStyle: {
    type: Object,
    default: () => ({}),
  },
});

const scrollerRefs = ref([]);
const state = reactive({
  xValues: Array(props.texts.length).fill(0),
  baseXs: Array(props.texts.length).fill(0),
  directionFactors: props.texts.map((_, i) => (i % 2 === 0 ? 1 : -1)),
  copyWidths: Array(props.texts.length).fill(0),
  rawScrollVelocity: 0,
  smoothVelocity: 0,
  lastScrollY: 0,
  lastTimestamp: 0,
});

// For template binding
const xValues = computed(() => state.xValues);

const { y: scrollY } = useScroll(window, {
  throttle: 10, // Add throttling to improve performance
  passive: true, // Use passive event listener for better scrolling performance
});

// Calculate velocity factor
const velocityFactor = computed(() => {
  const { input, output } = props.velocityMapping;
  const [minIn, maxIn] = input;
  const [minOut, maxOut] = output;
  const value = Math.abs(state.smoothVelocity);
  const clamped = Math.max(minIn, Math.min(maxIn, value));
  return minOut + ((clamped - minIn) * (maxOut - minOut)) / (maxIn - minIn);
});

// Function to keep value within range (wrapping)
const wrap = (min, max, v) => {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
};

// Update velocity calculation
const updateVelocity = (timestamp) => {
  if (state.lastTimestamp) {
    const deltaTime = (timestamp - state.lastTimestamp) / 1000;
    if (deltaTime > 0) {
      // Prevent division by zero
      const deltaY = scrollY.value - state.lastScrollY;
      state.rawScrollVelocity = deltaY / deltaTime;

      // Apply damping - smoother transition
      state.smoothVelocity +=
        (state.rawScrollVelocity - state.smoothVelocity) * props.damping;
    }
  }
  state.lastScrollY = scrollY.value;
  state.lastTimestamp = timestamp;
};

// Update the widths of all text elements
const updateWidths = () => {
  if (!scrollerRefs.value.length) return;

  scrollerRefs.value.forEach((el, index) => {
    if (el && el.children.length > 0) {
      state.copyWidths[index] = el.children[0].offsetWidth;
    }
  });
};

// Animation frame handler
const animate = (timestamp) => {
  updateVelocity(timestamp);

  props.texts.forEach((_, index) => {
    // Base movement rate
    let moveBy = state.directionFactors[index] * props.velocity * (1 / 60);

    // Determine direction based on scroll velocity
    if (state.smoothVelocity < -1) state.directionFactors[index] = -1;
    else if (state.smoothVelocity > 1) state.directionFactors[index] = 1;

    // Apply velocity factor to movement
    moveBy +=
      state.directionFactors[index] * Math.abs(moveBy) * velocityFactor.value;
    state.baseXs[index] += moveBy;

    // Apply wrapping if width is known
    if (state.copyWidths[index]) {
      state.xValues[index] = wrap(
        -state.copyWidths[index],
        0,
        state.baseXs[index]
      );
    }
  });
};

// Use VueUse's RAF utility for better performance
const { pause, resume } = useRafFn(animate);

// Watch for changes in the texts array
watch(
  () => props.texts,
  (newTexts) => {
    const currentLength = state.xValues.length;
    const newLength = newTexts.length;

    if (newLength > currentLength) {
      state.xValues.push(...Array(newLength - currentLength).fill(0));
      state.baseXs.push(...Array(newLength - currentLength).fill(0));
      state.directionFactors.push(
        ...Array(newLength - currentLength)
          .fill(1)
          .map((_, i) => ((currentLength + i) % 2 === 0 ? 1 : -1))
      );
      state.copyWidths.push(...Array(newLength - currentLength).fill(0));
    } else if (newLength < currentLength) {
      state.xValues.splice(newLength);
      state.baseXs.splice(newLength);
      state.directionFactors.splice(newLength);
      state.copyWidths.splice(newLength);
    }

    // Re-measure widths after DOM update
    nextTick(updateWidths);
  },
  { deep: true }
);

// Use ResizeObserver for more efficient resize handling
onMounted(() => {
  updateWidths();

  // Use IntersectionObserver to pause animation when not in viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resume();
          } else {
            pause();
          }
        });
      },
      { threshold: 0 }
    );

    // Observe the section element
    observer.observe(scrollerRefs.value[0]?.parentNode?.parentNode);
  }

  // Set up resize handling for responsive behavior
  useResizeObserver(scrollerRefs, () => {
    updateWidths();
  });
});
</script>
