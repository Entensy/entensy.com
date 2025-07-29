<script setup>
import StarBorder from './StarBorder.vue';
import FlickeringGrid from '~/components/FlickeringGrid.vue';
import VideoDialog from '~/components/VideoDialog.vue';

// Define reusable Tailwind classes for consistency
const containerClasses =
  'container relative flex flex-col items-center justify-start lg:w-full w-11/12 gap-8 p-4 mx-auto bg-contact-card-gradient rounded-2xl py-14 lg:max-w-4xl lg:px-20';
const contentWrapperClasses =
  'flex flex-col items-center justify-center w-full gap-12 lg:flex-row overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory';
const textSectionClasses =
  'flex flex-col items-center justify-around w-full gap-8 lg:w-1/2 lg:items-start min-w-[300px] snap-center';
const videoSectionClasses = 'w-full lg:w-1/2 min-w-[300px] snap-center';
const buttonClasses =
  'shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)] ease translate-z-0 transform rounded-[16px] transition-all duration-300 will-change-[height,transform]';
</script>

<template>
  <section :id="about" :class="containerClasses">
    <!-- Content wrapper with horizontal scrolling on mobile -->
    <div :class="contentWrapperClasses">
      <!-- Text Section -->
      <div :class="textSectionClasses">
        <h3 class="text-base font-medium capitalize text-primary lg:text-2xl">
          Customer Story
        </h3>
        <span class="text-center text-xl text-white lg:text-start lg:text-3xl">
          “Our growth no longer necessitates the recruitment and education of
          additional design professionals”
        </span>
        <div class="relative">
          <StarBorder
            as="a"
            href="#"
            custom-class="text-white capitalize"
            color="red"
            speed="5s"
          >
            Read Our Story
          </StarBorder>
        </div>
      </div>

      <!-- Video Section -->
      <div :class="videoSectionClasses">
        <div class="aspect-video">
          <VideoDialog
            :class="buttonClasses"
            animation-style="from-center"
            video-src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnail-src="/images/2.webp"
            thumbnail-alt="Hero Video"
          />
        </div>
      </div>
    </div>

    <!-- Flickering Grid Background -->
    <FlickeringGrid
      class="absolute bottom-0 right-0 z-10 h-10 lg:left-1"
      color="#FC002A"
    />
  </section>
</template>

<style scoped>
/* Optional: Custom scrollbar styling for mobile */
@media (max-width: 1023px) {
  .snap-x {
    scroll-snap-type: x mandatory;
  }

  .snap-center {
    scroll-snap-align: center;
  }

  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    /* Smooth scrolling on iOS */
    scrollbar-width: thin;
    /* Firefox */
    scrollbar-color: #fc002a transparent;
    /* Firefox */
  }

  .overflow-x-auto::-webkit-scrollbar {
    height: 8px;
    /* Chrome, Safari */
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: #fc002a;
    /* Scrollbar color */
    border-radius: 4px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
