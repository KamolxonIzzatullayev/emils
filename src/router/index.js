import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import AddingDocument from '../views/AddingDocumnet/AddingDocument.vue'
import ReviewDocument from '../views/ReviewDocument/ReviewDocument.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: AddingDocument
  },
  {
    path: '/review/:id',
    name: 'ReviewDocument',
    component: ReviewDocument,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
