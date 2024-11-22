<script setup>
</script>

<template>
  <main>  
    <div>
    <header>

      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/filmes">Filmes</router-link>
        <router-link to="/tv">Programas de TV</router-link>
      </nav>
    </header>
    
  </div>
    <div>
    </div>    
    <h1>Home</h1>
  </main>
</template>

<style scoped>


h1 {
  color: #333;
  font-size: 2.5rem;
  margin: 0;
}
header {
  height: 3rem;
  display: flex;
  background-color: #333;
  color: #ffffff;
  font-size: 1.2rem;
  padding-left: 2rem;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ff6347;
}
</style>
