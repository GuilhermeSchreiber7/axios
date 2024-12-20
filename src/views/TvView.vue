<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import NavBar from "@/components/NavBar.vue";
import GenreList from "@/components/genreList.vue";

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);

onMounted(async () => {
  const cachedGenres = localStorage.getItem("genres");
  if (cachedGenres) {
    genres.value = JSON.parse(cachedGenres);
  } else {
    try {
      const response = await api.get("genre/tv/list?language=pt-BR");
      genres.value = response.data.genres;
      localStorage.setItem("genres", JSON.stringify(response.data.genres));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }
});

const listTvShows = async (genreId) => {
  isLoading.value = true;
  try {
    const response = await api.get("discover/tv", {
      params: {
        language: "pt-BR",
        with_genres: genreId
      },
    });
    tvShows.value = response.data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    tvShows.value = [];
    alert("Não foi possível carregar os programas de TV. Tente novamente.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <nav-bar />
  <div class="main-container">
    <h1 class="page-title">Programas de TV</h1>
    <GenreList :genres="genres" @genre-selected="listTvShows" />
    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-show-list">
      <div v-for="show in tvShows" :key="show.id" class="tv-show-card">
        <div class="image-container">
          <img
            :src="show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : 'https://via.placeholder.com/300x450?text=Sem+Imagem'"
            :alt="show.name"
            class="tv-show-image"
          />
          <div class="tv-show-title-overlay">
            <p class="tv-show-title">{{ show.name }}</p>
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
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #367dff;
    transform: scale(1.05);
    transition: ease all 0.4s; 
  } 
}
.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}
.tv-show-card {
  position: relative;
  background-color: #333;
  border-radius: 0.5rem;
  width: 17vw;
  height: 53vh;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
}
.image-container {
  position: relative;
}
.tv-show-image {
  width: 100%;
  height: 53vh;
  object-fit: fill; 
}
.tv-show-title-overlay {
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
.image-container:hover .tv-show-title-overlay {
  opacity: 1;
}
.tv-show-title {
  font-size: 1.2rem;
  margin: 0;
}
</style>
