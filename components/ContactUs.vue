<script setup>
import { heading, subheading, form } from '~/assets/contents/contact-us.json'
import { inject } from 'vue'

const __ = inject('locale')
</script>

<template>
  <section id="contact-us" class="flex flex-col items-center w-full gap-8 px-4 py-24 pb-16">
    <div
      class="flex flex-col items-center justify-start w-full gap-8 px-12 lg:px-24 lg:max-w-4xl bg-contact-card-gradient rounded-2xl py-14">
      <h1 class="text-5xl text-center lg:w-2/3 text-secondery-light">
        {{ __.translate(heading) }}
      </h1>
      <span class="text-lg text-center lg:w-2/3 text-accent-light">
        {{ __.translate(subheading) }}
      </span>

      <form class="w-full" action="">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col justify-between gap-4 lg:flex-row">
            <div class="flex flex-col flex-1 gap-2">
              <label for="name" class="text-accent-light">{{ __.translate(form.name) }}</label>
              <input type="text" id="name"
                class="p-4 text-white transition-all duration-200 ease-out bg-transparent border focus:outline-none focus:border-primary border-accent-light rounded-2xl">
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <label for="email" class="text-accent-light">{{ __.translate(form.email) }}</label>
              <input type="email" id="email"
                class="p-4 text-white transition-all duration-200 ease-out bg-transparent border focus:outline-none focus:border-primary border-accent-light rounded-2xl">
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="phone" class="text-accent-light">{{ __.translate(form.phone) }}</label>
            <input type="tel" id="phone"
              class="p-4 text-white transition-all duration-200 ease-out bg-transparent border focus:outline-none focus:border-primary border-accent-light rounded-2xl">
          </div>
          <div class="flex flex-col gap-2">
            <label for="message" class="text-accent-light">{{ __.translate(form.message) }}</label>
            <textarea name="message" id="message" cols="30" rows="10"
              class="p-4 text-white transition-all duration-200 ease-out bg-transparent border focus:outline-none focus:border-primary border-accent-light rounded-2xl"></textarea>
          </div>
        </div>
        <div class="flex items-center justify-end w-full mt-8">
          <button
            class="px-8 py-4 font-medium text-white uppercase border rounded-full shadow-2xl bg-primary border-white/15 shadow-primary">
            {{ __.translate(form.submit) }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
