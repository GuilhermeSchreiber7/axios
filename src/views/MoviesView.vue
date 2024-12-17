<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import NavBar from "@/components/NavBar.vue";
import GenreList from "@/components/genreList.vue";

const isLoading = ref(false);

const genres = ref([]);
onMounted(async () => {
  try {
    const response = await api.get("genre/movie/list?language=pt-BR");
    genres.value = response.data.genres;
  } catch (error) {
    console.error("Erro ao carregar gêneros:", error);
  }
});

const movies = ref([]);

const ListMovies = async (genreId) => {
  isLoading.value = true;

  try {
    const response = await api.get("discover/movie", {
      params: {
        with_genres: genreId,
        language: "pt-BR",
      },
    });
    if (response.data && response.data.results) {
      movies.value = response.data.results;
    } else {
      console.warn("Resposta inesperada da API:", response);
      movies.value = [];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <NavBar />
  <div class="main-container">
    <h1 class="page-title">Movie Genres</h1>
    <GenreList :genres="genres" @genre-selected="ListMovies" />
    <loading :active="isLoading" is-full-page />
    <p v-if="!movies.length && !isLoading" class="no-movies">
      Nenhum filme encontrado ou erro na busca.
    </p>
    <div v-if="movies.length" class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <div class="image-container">
          <img
            :src="movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : 'https://via.placeholder.com/300x450?text=Sem+Imagem'"
            :alt="movie.title"
            class="movie-image"
          />
          <div class="movie-title-overlay">
            <p class="movie-title">{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  background-color: #141414;
  padding: 20px;
  color: white;
}
.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.no-movies {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #fff;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}
.movie-card {
  position: relative;
  background-color: #333;
  border-radius: 0.5rem;
  width: 18vw;
  height: 53vh;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease;
  }
}
.image-container {
  position: relative;
}
.movie-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: transform 0.3s ease;
}
.movie-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.image-container:hover .movie-title-overlay {
  opacity: 1;
}
.movie-details {
  padding: 1rem;
}
.movie-title {
  font-size: 1.2rem;
  margin: 0;
}
</style>
