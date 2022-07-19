<template>
  <li class="cart__order">
    <h3>{{ cartProduct.product.title }}</h3>
    <b>{{ cartProduct.product.price * cartProduct.amount | numberFormat }} ₽</b>
    <span>Артикул: {{ cartProduct.product.id }}</span>
    <span>Количество: {{ cartProduct.amount }}</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  props: ['cartProduct'],
  filters: { numberFormat },
};
</script>
