<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);
onMounted(async () => {
  const response = await api.get("genre/tv/list?language=pt-BR");
  genres.value = response.data.genres;
});

const listTvShows = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
      query: 'Batman'
    }
  });
  tvShows.value = response.data.results;
  isLoading.value = false;
};

const getGenreName = (id) => {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre ? genre.name : 'Desconhecido';
}
</script>

<template>
  <div >
    <h1>Programas de TV relacionados ao Batman</h1>
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

    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-show-list">
      <div v-for="show in tvShows" :key="show.id" class="tv-show-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          :alt="show.name"
        />
        <div class="tv-show-details">
          <p class="tv-show-title">{{ show.name }}</p>
          <p class="tv-show-original-name">{{ show.original_name }}</p>
          <p class="tv-show-release-date">{{ show.first_air_date }}</p>
          <p class="tv-show-genres">
            {{ show.genre_ids.map(id => getGenreName(id)).join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
}

.genre-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 15rem;    
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-show-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-show-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-show-details {
  padding: 0 0.5rem;
}

.tv-show-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
</style>
