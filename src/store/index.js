import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // состояние
    cartProducts: [
      { productId: 1, amount: 2 }, // идентификатор товара и количество товара
    ],
  },
  mutations: {
    // eslint-disable-next-line max-len
    addProductToCart(state, { productId, amount }) { // state -> состояние, payload -> любая инфа которая будет передаваться при вызове мутации
      // eslint-disable-next-line no-shadow
      const item = state.cartProducts.find((item) => item.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
  },
  getters: { // получаем инфу о товаре
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
  },
  modules: {
  },
});
