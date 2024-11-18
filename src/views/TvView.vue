<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);

// Carregar lista de gêneros quando o componente for montado
onMounted(async () => {
  const response = await api.get("genre/tv/list?language=pt-BR");
  genres.value = response.data.genres;
});

// Função para listar programas de TV relacionados ao Batman
const listTvShows = async (genreId) => {
  isLoading.value = true;
  try {
    const response = await api.get('search/tv', {
      params: {
        query: 'Batman',  // Busca por programas relacionados ao Batman
        language: 'pt-BR',
        with_genres: genreId  // Filtro por gênero (opcional)
      }
    });
    tvShows.value = response.data.results;
  } catch (error) {
    console.error('Erro ao buscar programas de TV:', error);
  }
  isLoading.value = false;
};

// Função para pegar o nome do gênero com base no ID
const getGenreName = (id) => {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre ? genre.name : 'Desconhecido';
}
</script>

<template>
  <div class="main-container">
    <h1 class="page-title">Programas de TV relacionados ao Batman</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genres"
        :key="genre.id"
        @click="listTvShows(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>
    
    <!-- Carregamento -->
    <loading v-model:active="isLoading" is-full-page />

    <!-- Lista de programas de TV -->
    <div class="tv-show-list">
      <div v-for="show in tvShows" :key="show.id" class="tv-show-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          :alt="show.name"
          class="tv-show-image"
        />
        <div class="tv-show-info">
          <p class="tv-show-title">{{ show.name }}</p>
          <p class="tv-show-release-date">{{ show.first_air_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Background */
.main-container {
  background-color: #141414;
  padding: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
}

/* Title */
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -1px;
}

/* Genres */
.genre-list {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.genre-item:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

/* TV show list */
.tv-show-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.tv-show-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.tv-show-card:hover {
  transform: scale(1.05);
}

/* Image */
.tv-show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* TV show info */
.tv-show-info {
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

.tv-show-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tv-show-release-date {
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Loading overlay */
.loading-overlay {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
