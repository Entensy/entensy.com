<template>
  <component
    :is="as || 'button'"
    :class="[
      'relative inline-block overflow-hidden rounded-[20px] py-[1px]',
      customClass,
    ]"
    v-bind="$attrs"
  >
    <div
      class="animate-star-movement-bottom absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed,
      }"
    ></div>
    <div
      class="animate-star-movement-top absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed,
      }"
    ></div>
    <div
      class="z-1 ease relative transform rounded-[16px] bg-gradient-to-br from-[rgba(17,18,20,0.75)] to-[rgba(12,13,15,0.9)] px-[26px] py-[16px] text-center text-xs text-white shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] backdrop-blur-[5px] transition-all duration-300 will-change-[height,transform]"
    >
      <slot> </slot>
    </div>
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: String,
    default: 'button',
  },
  customClass: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'white',
  },
  speed: {
    type: String,
    default: '6s',
  },
});
</script>

<style scoped>
@keyframes star-movement-bottom {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
}

@keyframes star-movement-top {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(100%, 0%);
    opacity: 0;
  }
}

.animate-star-movement-bottom {
  animation: star-movement-bottom linear infinite alternate;
}

.animate-star-movement-top {
  animation: star-movement-top linear infinite alternate;
}
</style>
