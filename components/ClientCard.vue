<template>
  <div class="flex flex-row items-center gap-2">
    <img :src="img" class="rounded-full" alt="" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  img: string;
}

defineProps<Props>();
</script>
