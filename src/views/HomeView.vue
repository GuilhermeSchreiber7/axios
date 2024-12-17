<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div>
      <NavBar/>
    </div> 
  <main>  
    
    <h1>Home</h1>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 68vh;
  text-align: center; 


h1 {
  color: #333;
  font-size: 3.5rem;
  margin: 0;
}
}
</style>
