import { createRouter, createWebHistory } from 'vue-router';
import MovieDetails from '@/views/MovieDetails.vue';
import ActorDetails from "@/views/ActorDetails.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
  {
    path: "/actor/:id",
    name: "ActorDetails",
    component: ActorDetails,
    props: true,
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;