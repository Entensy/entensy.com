<script setup>
  import {ref, provide} from 'vue'

  const navigation = ref({
    state: false,
    toggle(){
      console.log('yep');
      this.state = !this.state;
    },
  })
  provide('navigation', navigation)

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

