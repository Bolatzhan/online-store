<template>
  <div>
    <li class="catalog__item">
      <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
        <!--отправляем событие gotoPage с двумя параметрами первый параметр название страницы а второй id продукта-->
        <img :src="product.image" :alt="product.title">
      </router-link>
      <h3 class="catalog__title">
        <router-link :to="{ name: 'product', params: { id: product.id } }">{{ product.title }}</router-link>
      </h3>
      <span class="catalog__price">{{ product.price | numberFormat }} ₽</span>
    </li>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colorsId" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color" v-model="selectedColor">
          <span class="colors__value" :style="{backgroundColor: color}"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      selectedColor: null,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>
