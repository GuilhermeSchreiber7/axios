
<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  genres: {
    type: Array,
    required: true,
  },
});

// eventos
const emit = defineEmits(["genre-selected"]);

// emitir o evento
const emitGenreSelected = (genreId) => {
  emit("genre-selected", genreId);
};
</script>

<template>
  <ul class="genre-list">
    <li
      v-for="genre in genres"
      :key="genre.id"
      @click="emitGenreSelected(genre.id)"
      class="genre-item"
    >
      {{ genre.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
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
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: #367dff;
    transform: scale(1.05);
    transition: ease all 0.4s;
  }
}
</style>
