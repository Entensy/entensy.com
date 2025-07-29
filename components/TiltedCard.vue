<template>
  <figure
    ref="cardRef"
    class="relative flex h-full w-full flex-col items-center justify-center"
    :style="{ height: containerHeight, width: containerWidth }"
    @mousemove="handleMouse"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="showMobileWarning"
      class="absolute top-4 block text-center text-sm sm:hidden"
    >
      This effect is not optimized for mobile. Check on desktop.
    </div>

    <motion-div
      class="relative [transform-style:preserve-3d]"
      :style="{
        width: imageWidth,
        height: imageHeight,
        rotateX: rotateX.value,
        rotateY: rotateY.value,
        scale: scale.value,
      }"
    >
      <motion-img
        :src="imageSrc"
        :alt="altText"
        class="absolute left-0 top-0 rounded-[15px] object-cover will-change-transform"
        :style="{ width: imageWidth, height: imageHeight }"
      />

      <motion-div
        v-if="displayOverlayContent && overlayContent"
        class="absolute left-0 top-0 z-[2] will-change-transform"
      >
        <div v-html="overlayContent" />
      </motion-div>
    </motion-div>

    <motion-figcaption
      v-if="showTooltip"
      class="pointer-events-none absolute left-0 top-0 z-[3] hidden rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 sm:block"
      :style="{
        x: x.value,
        y: y.value,
        opacity: opacity.value,
        rotate: rotateFigcaption.value,
      }"
    >
      {{ captionText }}
    </motion-figcaption>
  </figure>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default {
  props: {
    imageSrc: String,
    altText: {
      type: String,
      default: 'Tilted card image',
    },
    captionText: {
      type: String,
      default: '',
    },
    containerHeight: {
      type: String,
      default: '300px',
    },
    containerWidth: {
      type: String,
      default: '300px',
    },
    imageHeight: {
      type: String,
      default: '300px',
    },
    imageWidth: {
      type: String,
      default: '300px',
    },
    scaleOnHover: {
      type: Number,
      default: 1.1,
    },
    rotateAmplitude: {
      type: Number,
      default: 14,
    },
    showMobileWarning: {
      type: Boolean,
      default: true,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    overlayContent: {
      type: String,
      default: '',
    },
    displayOverlayContent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const cardRef = ref(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), {
      damping: 30,
      stiffness: 100,
      mass: 2,
    });
    const rotateY = useSpring(useMotionValue(0), {
      damping: 30,
      stiffness: 100,
      mass: 2,
    });
    const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
      stiffness: 350,
      damping: 30,
      mass: 1,
    });

    let lastY = 0;

    function handleMouse(e) {
      if (!cardRef.value) return;

      const rect = cardRef.value.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.height / 2)) * -props.rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * props.rotateAmplitude;

      rotateX.set(rotationX);
      rotateY.set(rotationY);

      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);

      const velocityY = offsetY - lastY;
      rotateFigcaption.set(-velocityY * 0.6);
      lastY = offsetY;
    }

    function handleMouseEnter() {
      scale.set(props.scaleOnHover);
      opacity.set(1);
    }

    function handleMouseLeave() {
      opacity.set(0);
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
      rotateFigcaption.set(0);
    }

    return {
      cardRef,
      x,
      y,
      rotateX,
      rotateY,
      scale,
      opacity,
      rotateFigcaption,
      handleMouse,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
};
</script>

<style scoped>
/* You can add your styles here */
</style>
