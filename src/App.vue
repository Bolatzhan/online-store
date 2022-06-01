<template>
  <!-- eslint-disable max-len -->
  <component :is="currentPageComponent" :page-params="currentPageParams" />
</template>

<script>
// eslint-disable-next-line import/extensions
import MainPage from '@/pages/MainPage';
// eslint-disable-next-line import/extensions
import ProductPage from '@/pages/ProductPage';
// eslint-disable-next-line import/extensions
import NotFoundPage from '@/pages/NorFoundPage';
// eslint-disable-next-line import/extensions,no-unused-vars
import eventBus from './eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main', // текущая страница которую мы просматриваем
      currentPageParams: {},
    };
  },
  methods: { // переключение страниц
    gotoPage(pageName, pageParams) { // меняет свойство в состоянии
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage'; // возвращает текущую страницу
    },
  },
  components: { MainPage, ProductPage, NotFoundPage },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
};
</script>
