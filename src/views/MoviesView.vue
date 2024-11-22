<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);

const genres = ref([]);

onMounted(async () => {
  const response = await api.get("genre/movie/list?language=pt-BR");
  genres.value = response.data.genres;
});
const movies = ref([]);

const listMovies = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
  isLoading.value = false;
};
function getGenreName(id) {
    const genero = genres.value.find((genre) => genre.id === id);
    return genero.name;
  }
</script>
<template>
  <header>

<nav>
  <router-link to="/">Home</router-link>
  <router-link to="/filmes">Filmes</router-link>
  <router-link to="/tv">Programas de TV</router-link>
</nav>
</header>
<div class="main-container">
  <h1 class="page-title">Gêneros de filmes</h1>
  <ul class="genre-list">
      <li
        v-for="genre in genres"
        :key="genre.id"
        @click="listMovies(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="movie-image"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          
          <p class="movie-release-date">{{ movie.release_date }}</p>
          <p class="movie-genres">{{ movie.genre_ids }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  background-color: #141414;
  padding: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
  
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -1px;
}

.genre-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align:  center;
  width: 10rem;
}

.genre-item:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-5px);
}

.genre-item:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.movie-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.movie-release-date {
  font-size: 0.9rem;
  margin-top: 5px;
}

.loading-overlay {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
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
