<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom"
                     :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color-id.sync="filterColorId"/>
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Ошибка при загрузке товаров <button @click.prevent="loadProducts">Попробовать снова</button></div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
// import products from '@/data/products';
import ProductList from '@/components/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0, // для поля цена 'от'
      filterPriceTo: 0, // для поля цена 'до'
      filterCategoryId: 0, // идентификатор выбранной категории
      filterColorId: 0,
      page: 1, // текущая страница
      productsPerPage: 3, // число товаров которые будут отображатся на странице
      productsData: null, // ответ от сервера, продукты будут здесь из сервера
      productsLoading: false, // если идет загрузка она будет true если нет то false
      productsLoadingFailed: false, // ошибка при запросе
    };
  },
  computed: {
    // filteredProducts() { // передает отфильтрованный список товаров
    //   let filteredProducts = products; // берем в переменную наш массив с товарами
    //   if (this.filterPriceFrom > 0) { // если у нас задано поле 'от' и это значение больше чем ноль
    //     // то мы меняем список отфильтрованных товаров, на товары где цена больше чем в filterPriceFrom
    //     filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
    //   }
    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
    //   }
    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
    //   }
    //   if (this.filterColorId) {
    //     filteredProducts = filteredProducts.filter((product) => product.colorsId.includes(this.filterColorId));
    //   }
    //   return filteredProducts;
    // },
    // products() { // передаем продукты в ProductList
    //   const offset = (this.page - 1) * this.productsPerPage; // начальный индекс
    //   return this.filteredProducts.slice(offs et, offset + this.productsPerPage); // конечный индекс
    // },
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url,
          };
        })
        : [];
    },
    // countProducts() { // берем общее количество товаров
    //   return this.filteredProducts.length;
    // },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() { // загружает данные в productsData
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products`, {// отправляем http запрос с endpoint-ом
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo
            }
          })
          .then((response) => this.productsData = response.data) // при успешном ответе записываем в productsData
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      }, 500);
    },
  },
  watch: { // отслеживаем изменнение свойств page,filterPriceFrom и т.д. И если они изменились то вызываем метод который перезагрузить товары
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() { // хук
    this.loadProducts();// loadProducts -> метод будет вызываться в тот момент когда компонент создается
  },
};
</script>
