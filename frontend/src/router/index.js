import { createRouter, createWebHistory } from 'vue-router'
import ArticleView from '@/views/ArticleView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
import UpdateView from '@/views/UpdateView.vue'

const routes = [
  {
    path: '/community',
    name: 'ArticleView',
    component: ArticleView,
  },
  {
    path: '/community/create',
    name: 'CreateView',
    component: CreateView,
  },
  {
    path: '/community/:id',
    name: 'DetailView',
    component: DetailView,
  },
  {
    path: '/community/:id/update',
    name: 'UpdateView',
    component: UpdateView,
}

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
