<template>
  <li class="cart__item product">
    <router-link tag="div" class="product__pic" :to="{ name: 'product', params: {id:item.product.id} }">
      <img :src="item.product.image" width="120" height="120" alt="item.product.title">
    </router-link>
    <router-link tag="h3" class="product__title" :to="{ name: 'product', params: {id:item.product.id} }">
      {{ item.product.title }}
    </router-link>
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
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    deleteProduct(productId) {
      this.$store.dispatch('deleteCartProduct', productId);
    },
  },
};
</script>
