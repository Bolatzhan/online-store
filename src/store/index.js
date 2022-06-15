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
    updateCartProductAmount(state, { productId, amount }) {
      // eslint-disable-next-line no-shadow,max-len
      const item = state.cartProducts.find((item) => item.productId === productId); // узнаем существует ли этот товар в корзине или нет
      if (item) { // если товар в корзине существует
        item.amount = amount; // меняем значение amount в состоянии
      }
    },
    deleteCartProduct(state, productId) {
      // eslint-disable-next-line max-len
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId); // удаляет товар в корзине по productId
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
