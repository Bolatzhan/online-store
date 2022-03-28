<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem>
  </ul>
</template>

<script>
// eslint-disable-next-line import/extensions
import ProductItem from '@/components/ProductItem';

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductItem },
  props: ['products'],
};
</script>
