<template>
  <div class="grid min-h-screen grid-cols-3 gap-4 bg-black p-8 text-white">
    <!-- Top Left Section: "Batteries Included" -->
    <div class="flex flex-col items-start justify-center p-6">
      <h2 class="mb-4 text-2xl font-bold">Batteries Included</h2>
      <p class="text-gray-400">
        A strongly typed API, hot-reloading, and modern tooling that make it a
        blast to work with.
      </p>
    </div>

    <!-- Top Right Section: Isometric Battery Icon -->
    <div class="flex items-start justify-center">
      <div class="relative h-48 w-48">
        <!-- Battery Icon (3D-like, simplified representation) -->
        <div
          class="absolute inset-0 rotate-45 scale-75 transform rounded-lg border border-gray-700 bg-blue-900"
        ></div>
        <div
          class="absolute inset-2 rotate-45 scale-75 transform rounded-lg border border-gray-600 bg-blue-500"
        ></div>
        <!-- Battery "fill" (lighter blue) -->
        <div
          class="absolute inset-4 top-0 h-1/2 rotate-45 scale-75 transform rounded-lg bg-blue-300"
        ></div>
      </div>
    </div>

    <!-- Bottom Left Section: Isometric Floppy Disk Icon -->
    <div class="flex items-center justify-center">
      <div class="relative h-48 w-48">
        <!-- Floppy Disk Icon (3D-like, simplified representation) -->
        <div
          class="absolute inset-0 rotate-45 scale-75 transform rounded-lg border border-gray-700 bg-blue-900"
        ></div>
        <div
          class="absolute inset-2 rotate-45 scale-75 transform rounded-lg border border-gray-600 bg-blue-500"
        ></div>
        <!-- Floppy disk "label" (lighter blue) -->
        <div
          class="absolute inset-4 left-1/4 top-1/4 h-1/4 w-1/2 rotate-45 scale-75 transform rounded-lg bg-blue-300"
        ></div>
      </div>
    </div>

    <!-- Bottom Right Section: "Publish to the Store" -->
    <div class="flex flex-col items-start justify-center p-6">
      <h2 class="mb-4 text-2xl font-bold">Publish to the Store</h2>
      <p class="text-gray-400">
        Submit your extension to the Raycast Store and share it with thousands
        of users.
      </p>
    </div>

    <!-- Bottom Center Section: "Get Started" Button -->
    <div class="col-span-3 flex items-center justify-center">
      <button
        class="rounded bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Get Started →
      </button>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this static component, but you can add interactivity here if required.
</script>

<style scoped>
/* Optional custom styles for refinement */
.isometric {
  transform: rotate(45deg) scale(0.75);
  transition: transform 0.3s ease;
}

.isometric:hover {
  transform: rotate(45deg) scale(0.8);
}
</style>
