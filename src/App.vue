<template>
    <section class="catalog">
      <ProductList :products="products"/>
      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
</template>

<script>
import products from './data/products';
// eslint-disable-next-line import/extensions
import ProductList from './components/ProductList';
// eslint-disable-next-line import/extensions
import BasePagination from './components/BasePagination';

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
