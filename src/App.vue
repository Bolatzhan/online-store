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
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
// eslint-disable-next-line import/extensions
import ProductList from '@/components/ProductList';
// eslint-disable-next-line import/extensions
import BasePagination from '@/components/BasePagination';
// eslint-disable-next-line import/extensions
import ProductFilter from '@/components/ProductFilter';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0, // для поля цена 'от'
      filterPriceTo: 0, // для поля цена 'до'
      filterCategoryId: 0, // идентификатор выбранной категории
      filterColorId: 0,
      page: 1, // текущая страница
      productsPerPage: 3, // число товаров которые будут отображатся на странице
    };
  },
  computed: {
    filteredProducts() { // передает отфильтрованный список товаров
      let filteredProducts = products; // берем в переменную наш массив с товарами
      if (this.filterPriceFrom > 0) { // если у нас задано поле 'от' и это значение больше чем ноль
        // то мы меняем список отфильтрованных товаров, на товары где цена больше чем в filterPriceFrom
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColorId) {
        filteredProducts = filteredProducts.filter((product) => product.colorsId.includes(this.filterColorId));
      }
      return filteredProducts;
    },
    products() { // передаем продукты в ProductList
      const offset = (this.page - 1) * this.productsPerPage; // начальный индекс
      return this.filteredProducts.slice(offset, offset + this.productsPerPage); // конечный индекс
    },
    countProducts() { // берем общее количество товаров
      return this.filteredProducts.length;
    },
  },
};
</script>
