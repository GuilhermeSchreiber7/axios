<script setup>

</script>
<template>
  <header class="h-32 flex bg-gray-800 text-white text-lg pl-8 items-center justify-center shadow-md">
    <nav class="flex gap-36 mb-0 items-center">
      <router-link to="/" class="w-48 h-12 no-underline text-center flex items-center justify-center text-white transition-colors duration-800 hover:text-blue-400">Home</router-link>
      <router-link to="/movies" class="w-48 h-12 no-underline text-center flex items-center justify-center text-white transition-colors duration-800 hover:text-blue-400">Movies</router-link>
      <router-link to="/tv" class="w-48 h-12 no-underline text-center flex items-center justify-center text-white transition-colors duration-800 hover:text-blue-400">TV Shows</router-link>
    </nav>
  </header>
</template>
<style scoped>
</style>
