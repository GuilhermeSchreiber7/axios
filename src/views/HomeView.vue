<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <main>  
    <div>
   <NavBar/>
  </div>
    <div>
    </div>    
    <div class="container">
    <h1>Home</h1>
  </div>
  </main>
</template>

<style scoped lang="scss">

.container{
 display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
h1 {
  color: #333;
  font-size: 3.5rem;
  margin: 0;
}
}
</style>
