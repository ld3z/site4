<script setup lang="ts">
import { ref } from "vue";

// Set a fixed image size
const imageSize = ref("550px"); // Fixed size for the image
</script>

<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
    <div class="text-center">
      <img
        :style="{ width: imageSize, height: 'auto' }"
        src="/4040.gif"
        alt="404 Image"
        class="mx-auto" />
      <p class="text-title-lg mt-4 font-bold leading-tight text-white">404</p>
      <p class="text-body-lg flex flex-wrap items-center justify-center leading-snug text-gray-400">
        "If you don't believe in love, what's the point of living?" - Ron Swanson
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-title-lg {
  font-size: 1.5rem; /* Font size for titles */
}

.text-body-lg {
  font-size: 1rem; /* Font size for body text */
}

.w-icon {
  width: 1em; /* Make the icon size relative to the text size */
}

.h-icon {
  height: 1.25em; /* Make the icon size relative to the text size */
}

.icon-container {
  display: inline-flex; /* Use inline-flex to control spacing within the container */
  align-items: center; /* Vertically center the icon/image */
  justify-content: center; /* Horizontally center the icon/image */
}

.icon-img {
  width: 1em; /* Make the image size relative to the text size */
  height: auto; /* Maintain aspect ratio */
}

.mx-1 {
  margin-left: 0.25em; /* Adjust this value for precise spacing */
  margin-right: 0.25em; /* Adjust this value for precise spacing */
}

@media (max-width: 640px) {
  .text-title-lg {
    font-size: 1.25rem; /* Adjusted font size for smaller screens */
  }
  .text-body-lg {
    font-size: 0.875rem; /* Adjusted font size for smaller screens */
  }

  .mx-1 {
    margin-left: 0.1em; /* Adjusted margin for smaller screens */
    margin-right: 0.1em; /* Adjusted margin for smaller screens */
  }
}

p {
  overflow-wrap: break-word;
  word-break: break-word;
}

div {
  max-height: 100vh; /* Prevents container from exceeding viewport height */
  overflow-y: hidden; /* Ensures no vertical scrollbar is visible */
}
</style>
