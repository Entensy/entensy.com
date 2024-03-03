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

provide('navigation', navigation)

onMounted(() => {
  window.addEventListener('resize', _ => navigation.value.close());
})

</script>

<template>
  <AppHeader />
  <Hero />
  <Service />
  <Portfolio />
  <About />
  <Faq />
  <ContactUs />
  <AppFooter />
</template>
