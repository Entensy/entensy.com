<template>
  <div
    v-motion
    :initial="{
      y: -50,
      opacity: 0.15,

    }"
    :enter="{
      y: 0,
      opacity: 1,
      transition: {
        delay: 25,
        duration: 500,
      },
    }"
    class="sticky top-0 z-50 flex items-center justify-between w-full px-16 pt-12 "
  >
    <NuxtLink to="/">
      <img
        src="/images/logo.png"
        class="w-16 h-10"
        alt="logo"
      >
    </NuxtLink>
    <div class="hidden text-white border rounded-full lg:block border-white/15 drop-shadow backdrop-blur-lg">
      <div class="flex items-center justify-center gap-8 px-12 py-4 capitalize text-md">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink to="/portfolio">portfolio </NuxtLink>
      </div>
    </div>
    <div>
      <button class="hidden p-4 text-white capitalize border rounded-full lg:block border-white/15 bg-blur">contact
        us</button>
    </div>
    <div>
      <button class="p-4 text-white capitalize border rounded-full border-white/15 bg-blur">-</button>
    </div>
  </div>
</template>
