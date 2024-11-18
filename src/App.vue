<script setup></script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
  header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #000000;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #000000;
}
</style>