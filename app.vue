<script setup>
import { ref, provide } from 'vue'

const navigation = ref({
  state: false,
  toggle() {
    this.state = !this.state;
  },
  close() {
    this.state = false
  }
})

let tempLocale = null

const locale = ref({
  state: tempLocale ?? 'en',
  setLocale(locale) {
    if (!['en', 'ckb', 'ar'].includes(locale)) {
      return
    }

    this.state = locale
    localStorage.setItem('locale', locale)
  },
  translate(translate) {
    return translate[this.state]
  }
})

provide('navigation', navigation)
provide('locale', locale)

onMounted(() => {
  window.addEventListener('resize', _ => navigation.value.close());

  tempLocale = localStorage.getItem('locale') ?? null

  if (!tempLocale) {
    tempLocale = 'en'
    localStorage.setItem('locale', tempLocale)
  }
})

</script>

<template>

  <NuxtLayout class="mx-auto overflow-x-hidden max-w-7xl">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </NuxtLayout>
</template>
