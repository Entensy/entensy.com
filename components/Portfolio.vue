<script setup>
import { heading, subheading, list } from '~/assets/contents/portfolio.json';
import { inject } from 'vue';

const __ = inject('locale');
</script>

<template>
  <section id="portfolio" class="w-full overflow-hidden py-24 pb-16">
    <div class="flex flex-col gap-16">
      <div class="flex w-full flex-col items-center justify-center gap-3">
        <span class="font-medium capitalize text-primary">{{
          __.translate(subheading)
        }}</span>
        <h1 class="w-full text-center text-4xl text-white lg:w-1/2 lg:text-5xl">
          {{ __.translate(heading) }}
        </h1>
      </div>

      <div class="relative mt-16 xl:mt-6">
        <div
          aria-hidden="true"
          class="absolute inset-0 -top-20 z-[1] h-1/4 lg:-top-32"
        ></div>
        <div
          aria-hidden="true"
          class="absolute inset-0 top-20 scale-y-150 2xl:container md:scale-y-100 lg:-top-32 2xl:mx-auto"
        >
          <svg
            class="mx-auto w-full contrast-125 dark:opacity-50 dark:contrast-150"
            viewBox="0 0 1440 1093"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <mask
                id="b"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="1093"
              >
                <path d="M1440 0H0v1093h1440V0z" fill="#fff"></path>
              </mask>
              <g mask="url(#b)">
                <g filter="url(#c)">
                  <path
                    d="M559.345 544.205c133.759-80.416 220.443-181.782 193.614-226.406-26.828-44.624-157.009-15.608-290.768 64.808-133.759 80.417-220.443 181.783-193.615 226.407 26.829 44.624 157.01 15.608 290.769-64.809z"
                    fill="#f52b7f"
                  ></path>
                </g>
                <g filter="url(#d)">
                  <path
                    d="M301.223 870.738c54.247 62.957 198.957 27.194 323.219-79.877 124.262-107.072 181.02-244.907 126.773-307.863-54.247-62.957-198.957-27.194-323.219 79.877-124.262 107.072-181.02 244.907-126.773 307.863z"
                    fill="#8C1AFF"
                  ></path>
                </g>
                <g filter="url(#e)">
                  <path
                    d="M909.987 771.304c180.563-49.139 295.783-203.438 257.353-344.639-38.43-141.2-215.949-215.831-396.509-166.692-180.56 49.138-295.781 203.438-257.355 344.638 38.427 141.2 215.951 215.831 396.511 166.693z"
                    fill="#FC002A"
                  ></path>
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="c"
                x="-36.295"
                y="-3.147"
                width="1094.13"
                height="933.107"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="150"
                  result="effect1_foregroundBlur_251_30"
                ></feGaussianBlur>
              </filter>
              <filter
                id="d"
                x="80.655"
                y="251.932"
                width="891.127"
                height="849.872"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_251_30"
                ></feGaussianBlur>
              </filter>
              <filter
                id="e"
                x="206.086"
                y="-55.14"
                width="1268.65"
                height="1141.56"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="150"
                  result="effect1_foregroundBlur_251_30"
                ></feGaussianBlur>
              </filter>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h1440v1093H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          class="relative z-10 flex flex-col justify-center overflow-hidden lg:overflow-visible"
        >
          <div
            class="mx-auto flex w-max -translate-x-[15%] justify-center lg:w-full lg:translate-x-0"
          >
            <div
              class="relative z-10 mx-auto max-w-4xl px-4 md:max-w-6xl md:px-12 lg:max-w-5xl lg:px-6 xl:max-w-[85rem] xl:px-6 2xl:px-0"
            >
              <div class="grid grid-cols-4 items-center gap-2 md:gap-6">
                <div
                  class="space-y-4 overflow-hidden rounded-xl bg-white pt-4 shadow-2xl shadow-black/10 md:space-y-6"
                >
                  <img
                    src="/images/11.webp"
                    alt="tailus astrolus premium hero-section screenshot"
                    width="800"
                    height="1226"
                  />
                </div>
                <div
                  data-rellax-speed="2"
                  class="rellax transform-gpu space-y-4 md:space-y-6"
                  style="transform: translate3d(0px, -32px, 0px)"
                >
                  <div
                    class="h-48 overflow-hidden rounded-xl shadow-2xl shadow-black/10"
                  >
                    <img
                      data-rellax-speed="1"
                      class="rellax transform-gpu"
                      src="/images/22.webp"
                      alt="tailus developer portfolio homepage screenshot"
                      width="800"
                      height="983"
                      style="transform: translate3d(0px, -22px, 0px)"
                    />
                  </div>
                  <img
                    class="rounded-xl shadow-2xl shadow-black/10"
                    src="/images/33.webp"
                    alt="tailus creative designer portfolio homepage screenshot"
                    width="800"
                    height="1108"
                  />
                  <div
                    class="relative h-48 overflow-hidden rounded-xl shadow-2xl shadow-black/10"
                  >
                    <div class="absolute -inset-x-1 top-0 z-[1]">
                      <img
                        class="w-full backdrop-blur"
                        src="/images/44.webp"
                        alt="tailus astrolus premium template header screenshot"
                        width="2880"
                        height="154"
                      />
                    </div>
                    <img
                      data-rellax-speed="1"
                      class="rellax -mt-1 transform-gpu"
                      src="/images/55.webp"
                      alt="tailus astrolus free template header screenshot"
                      width="800"
                      height="983"
                      style="transform: translate3d(0px, -22px, 0px)"
                    />
                  </div>
                </div>
                <div class="space-y-4 md:space-y-6">
                  <div
                    class="h-56 overflow-hidden rounded-xl shadow-2xl shadow-black/10"
                  >
                    <img
                      data-rellax-speed="1"
                      class="rellax transform-gpu"
                      src="/images/66.webp"
                      alt="tailus design agency portfolio homepage screenshot"
                      width="800"
                      height="1334"
                      style="transform: translate3d(0px, -20px, 0px)"
                    />
                  </div>
                  <div
                    class="h-80 w-full overflow-hidden rounded-xl shadow-2xl shadow-black/10 xl:h-[26rem]"
                  >
                    <img
                      data-rellax-speed="1"
                      class="rellax transform-gpu"
                      src="/images/77.webp"
                      alt="tailus alt template case study page screenshot"
                      width="801"
                      height="2477"
                      style="transform: translate3d(0px, -15px, 0px)"
                    />
                  </div>
                </div>
                <div
                  data-rellax-speed="-1"
                  class="rellax transform-gpu space-y-4 md:space-y-6"
                  style="transform: translate3d(0px, 15px, 0px)"
                >
                  <div
                    class="overflow-hidden rounded-xl bg-white pt-4 shadow-2xl shadow-black/10"
                  >
                    <img
                      src="/images/88.webp"
                      alt="tailus ampire template solution page screenshot"
                      width="800"
                      height="1226"
                    />
                  </div>
                  <div
                    class="overflow-hidden rounded-xl bg-white pt-4 shadow-2xl shadow-black/10"
                  >
                    <img
                      src="/images/88.webp"
                      alt="tailus ampire template pricing page screenshot"
                      width="800"
                      height="1226"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
