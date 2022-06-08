import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import MainPage from '@/pages/MainPage';
// eslint-disable-next-line import/extensions
import NotFoundPage from '@/pages/NorFoundPage';
// eslint-disable-next-line import/extensions
import ProductPage from '@/pages/ProductPage';

Vue.use(VueRouter);

const routes = [ // Маршруты
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
