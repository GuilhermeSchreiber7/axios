<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue";

const route = useRoute();
const router = useRouter();
const actorId = route.params.id;

const actor = ref(null);
const movies = ref([]);

onMounted(async () => {
  try {
    const [actorResponse, moviesResponse] = await Promise.all([
      api.get(`person/${actorId}`, {
        params: {
          language: "pt-BR",
        },
      }),
      api.get(`person/${actorId}/movie_credits`, {
        params: {
          language: "pt-BR",
        },
      }),
    ]);
    actor.value = actorResponse.data;
    movies.value = moviesResponse.data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  } catch (error) {
    console.error("Erro ao buscar detalhes do ator:", error);
  }
});
</script>

<template>
    <NavBar />
  <div class="actor-details-container" v-if="actor">
    <h1 class="actor-name">{{ actor.name }}</h1>
    <div class="actor-details">
      <img
        :src="actor.profile_path 
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : 'https://via.placeholder.com/300x450?text=Sem+Imagem'"
        :alt="actor.name"
        class="actor-photo"
      />
      <div class="actor-info">
        <p><strong>Biografia:</strong> {{ actor.biography || "Não disponível." }}</p>
        <p><strong>Data de nascimento:</strong> {{ actor.birthday || "Não disponível" }}</p>
        <p v-if="actor.deathday"><strong>Falecimento:</strong> {{ actor.deathday }}</p>
        <p><strong>Popularidade:</strong> {{ actor.popularity }}</p>
      </div>
    </div>
    <div v-if="movies.length">
          <h2>Filmes mais relevantes:</h2>
          <div class="movies-grid">
            <div
              v-for="movie in movies"
              :key="movie.id"
              class="movie-card"
              @click="router.push({ name: 'MovieDetails', params: { id: movie.id } })"
            >
              <img
                :src="movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=Sem+Imagem'"
                :alt="movie.title"
                class="movie-poster"
              />
              <p class="movie-title">{{ movie.title }}</p>
            </div>
          </div>
        </div>
  </div>
</template>

<style scoped lang="scss">
.actor-details-container {
    background-color: #141414;
    color: white;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(to bottom, #141414, #1e1e1e);
}
.actor-name {
    font-size: 2.5rem;
    margin: 0 0 0 2.8rem;
    color: #e5e5e5;
}
.actor-details {
    background-color: #2f2f2f;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    display: flex;
    
    align-items: center;
    margin: 0 0 1.5rem 0;
    padding: 0.5rem;
}
.actor-photo {
    width: 20rem;
    height: 30rem;
    border-radius: 1rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
.actor-info {
    font-size: 1.2rem;
    max-width: 70%;
    color: #cccccc;
   strong{
    color: #5278f6;
    }
    p{
    margin-bottom: 1rem;
    }
    h2{
    
    margin-top: 2rem;
    color: #5278f6;
    }
   }
.movies-grid {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}
.movie-card {
    
    width: 20vw;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}
.movie-poster {
    width: 20vw;
    border-radius: 1rem;
}
.movie-title {
    font-size: 1rem;
    color: #ffffff;
    margin: 0.5rem;
    object-fit: cover;

}
    

.movie-title {
    font-size: 0.9rem;
    color: #ffffff;
    margin-top: 0.5rem;
}
</style>
