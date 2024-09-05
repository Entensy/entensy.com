<script setup>
import { heading, subheading, form } from '~/assets/contents/contact-us.json';
import { inject } from 'vue';

const __ = inject('locale');
</script>

<template>
  <section
    id="contact-us"
    class="flex w-full flex-col items-center gap-8 px-4 py-24 pb-16"
  >
    <div
      class="bg-contact-card-gradient flex w-full flex-col items-center justify-start gap-8 rounded-2xl px-12 py-14 lg:max-w-4xl lg:px-24"
    >
      <h1 class="text-center text-5xl text-secondery-light lg:w-2/3">
        {{ __.translate(heading) }}
      </h1>
      <span class="text-center text-lg text-accent-light lg:w-2/3">
        {{ __.translate(subheading) }}
      </span>

      <form class="w-full" action="">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col justify-between gap-4 lg:flex-row">
            <div class="flex flex-1 flex-col gap-2">
              <label for="name" class="text-accent-light">{{
                __.translate(form.name)
              }}</label>
              <input
                type="text"
                id="name"
                class="rounded-2xl border border-accent-light bg-transparent p-4 text-white transition-all duration-200 ease-out focus:border-primary focus:outline-none"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label for="email" class="text-accent-light">{{
                __.translate(form.email)
              }}</label>
              <input
                type="email"
                id="email"
                class="rounded-2xl border border-accent-light bg-transparent p-4 text-white transition-all duration-200 ease-out focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="phone" class="text-accent-light">{{
              __.translate(form.phone)
            }}</label>
            <input
              type="tel"
              id="phone"
              class="rounded-2xl border border-accent-light bg-transparent p-4 text-white transition-all duration-200 ease-out focus:border-primary focus:outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="message" class="text-accent-light">{{
              __.translate(form.message)
            }}</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              class="rounded-2xl border border-accent-light bg-transparent p-4 text-white transition-all duration-200 ease-out focus:border-primary focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div class="mt-8 flex w-full items-center justify-end">
          <button
            class="rounded-full border border-white/15 bg-primary px-8 py-4 font-medium uppercase text-white shadow-2xl shadow-primary"
          >
            {{ __.translate(form.submit) }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
