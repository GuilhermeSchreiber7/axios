<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import NavBar from "@/components/NavBar.vue";

const isLoading = ref(false);

const genres = ref([]);
onMounted(async () => {
  const response = await api.get("genre/movie/list?language=pt-BR");
  genres.value = response.data.genres;
});

const movies = ref([]);

const listBatmanMoviesByGenre = async (genreId) => {
  isLoading.value = true;

  const response = await api.get("search/movie", {
    params: {
      query: 'Batman',
      language: "pt-BR",
    },
  });
  movies.value = response.data.results.filter((movie) =>
    movie.genre_ids.includes(genreId)
  );
  isLoading.value = false;
};

function getGenreName(id) {
  const genero = genres.value.find((genre) => genre.id === id);
  return genero ? genero.name : '';
};
</script>
<template>
  <NavBar/>
<div class="main-container">
  <h1 class="page-title">Gêneros de filmes</h1>
  <ul class="genre-list">
      <li
        v-for="genre in genres"
        :key="genre.id"
        @click="listBatmanMoviesByGenre(genre.id)"
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
          <p class="movie-genres">{{ getGenreName(movie.genre_ids[0]) }}</p>
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
.genre-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.genre-item {
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #367dff;
  }
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.movie-card {
  background-color: #333;
  border-radius: 0.5rem;
  width: 18vw;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.movie-image {
  width: 18vw;
  height: 300px;
  object-fit: cover;
}
.movie-details {
  padding: 1rem;
}
.movie-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.movie-release-date {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.movie-genres {
  font-size: 1rem;
}

</style>
