<template>
  <!-- eslint-disable max-len -->
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" /><!--передаем как ключ id продукта-->
  </ul>
</template>

<script>
// eslint-disable-next-line import/extensions
import ProductItem from '@/components/ProductItem';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
