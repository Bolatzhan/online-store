<template>
  <!-- eslint-disable max-len -->
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <!--              <p class="product__info">-->
    <!--                Объем: <span>128GB</span>-->
    <!--              </p>-->
    <span class="product__code">Артикул: {{ item.product.id }}</span>
    <div class="product__counter form__counter">
      <CartAmount :amount.sync="amount" />
    </div>
    <b class="product__price">
      {{ item.amount * item.product.price | numberFormat }} P
    </b>
    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';
// eslint-disable-next-line import/extensions
import CartAmount from '@/components/CartAmount';

export default {
  components: { CartAmount },
  filters: { numberFormat },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;// возращает значение количества из входного параметра
      },
      set(value) { // вызывает мутацию
        this.$store.commit('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
