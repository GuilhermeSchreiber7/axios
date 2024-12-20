<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue";

const route = useRoute();
const movieId = route.params.id;

const movie = ref(null);
const cast = ref([]);

onMounted(async () => {
  try {
    const [movieResponse, castResponse] = await Promise.all([
      api.get(`movie/${movieId}`, {
        params: {
          language: "pt-BR",
        },
      }),
      api.get(`movie/${movieId}/credits`, {
        params: {
          language: "pt-BR",
        },
      }),
    ]);

    movie.value = movieResponse.data;

    // Ordenar pelo campo `order` e pegar apenas os 5 primeiros
    cast.value = castResponse.data.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, 5);
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
  }
});
</script>

<template>
  <NavBar />
  <div
    class="movie-details-container"
    v-if="movie"
    :style="{
      backgroundImage: movie.backdrop_path 
        ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
        : 'none',
    }"
  >
    <div class="content-overlay">
      <h1 class="movie-title">{{ movie.title }}</h1>
      <div class="movie-details">
        <img
          :src="movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/300x450?text=Sem+Imagem'"
          :alt="movie.title"
          class="movie-poster"
        />
        <div class="movie-info">
          <p><strong>Sinopse:</strong> {{ movie.overview }}</p>
            <p><strong>Data de lançamento:</strong> {{ new Date(movie.release_date).toLocaleDateString('pt-BR') }}</p>
          <p><strong>Avaliação:</strong> {{ movie.vote_average.toFixed(1) }}/10</p>
          <div v-if="cast.length">
            <h2>Elenco:</h2>
            <ul>
              <li v-for="actor in cast" :key="actor.cast_id">
                <span @click="$router.push({ name: 'ActorDetails', params: { id: actor.id } })" class="actor-link">{{ actor.name }}</span>
                 como {{ actor.character }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-details-container {
  background-color: #141414;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 20px;
  min-height: 100vh;
  position: relative;
}
.content-overlay {
  background: rgba(0, 0, 0, 0.8);
  height: 80vh; 
  padding: 20px;
  border-radius: 10px;
}
.movie-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.movie-details {
  display: flex;
  gap: 2rem;
}
.movie-poster {
  width: 18.75rem; 
  border-radius: 0.625rem;
}
.movie-info {
  max-width: 50.5rem; 
  p{
    margin-bottom: 1rem;
    strong{
      color: #5278f6;
    }
  }
  h2{
    margin-bottom: 0.1rem;
    color: #5278f6;
  }
  .actor-link {
  color: #1e90ff;
  cursor: pointer;
  text-decoration: underline;
}
.actor-link:hover {
  color: #00bfff;
}
}
</style>
