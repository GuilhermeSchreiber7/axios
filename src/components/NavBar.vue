<script setup>
</script>
<template>
    <header>

<nav>
  <router-link to="/">Home</router-link>
  <router-link to="/filmes">Filmes</router-link>
  <router-link to="/tv">Programas de TV</router-link>
</nav>
</header>
</template>
<style scoped lang="scss">
header {
  height: 8rem;
  display: flex;
  background-color: #333;
  color: #ffffff;
  font-size: 1.2rem;
  padding-left: 2rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
nav {
  column-gap: 9rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
a {
  width: 12rem;
  height: 3rem;
  text-decoration: none;
  text-align: center;
  line-height: 3rem;
  color: #ffffff;
  transition: color 0.3s ease;
  &:hover {
    color: #367dff;
}
}}}
</style>