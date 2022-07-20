import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import {API_BASE_URL} from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // состояние // Глобальное хранилище
    cartProducts: [
      // { productId: 1, amount: 2 }, // идентификатор товара и количество товара
    ],
    userAccessKey: null, // ключ пользователя
    cartProductsData: [], // товары в корзине
    orderInfo: null,
  },
  mutations: {
    // addProductToCart(state, { productId, amount }) { // state -> состояние, payload -> любая инфа которая будет передаваться при вызове мутации
    //   const item = state.cartProducts.find((item) => item.productId === productId);
    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
    updateOrderInfo(state, orderInfo) { // записываем данные в orderInfo с помощью мутации
      state.orderInfo = orderInfo;
    },
    resetCart(state) { // очищаем корзину
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((item) => item.productId === productId); // узнаем существует ли этот товар в корзине или нет
      if (item) { // если товар в корзине существует
        item.amount = amount; // меняем значение amount в состоянии
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId); // удаляет товар в корзине по productId
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {// получаем инфу о товаре в корзине
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    orderProducts(state) {
      if (state.orderInfo) {
        return state.orderInfo.basket.items.map((item) => ({
          ...item,
          totalPrice: item.price * item.quantity,
          amount: item.quantity,
        }));
      }
      return [];
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(API_BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey
          },
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          },
        })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
    },
    addProductToCart(context, {productId, amount}) { //Добавить товар в корзину
      return (new Promise(resolve => setTimeout(resolve, 500)))
        .then(() => {
          return axios
            .post(API_BASE_URL + '/api/baskets/products', {
              productId: productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
        })
    },
    updateCartProductAmount(context, {productId, amount}) { // Изменить количество товара в корзине
      context.commit('updateCartProductAmount', { productId, amount });

      return axios
        .put(API_BASE_URL + '/api/baskets/products', {
          productId: productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', { productId });
      return axios
        .delete(API_BASE_URL + '/api/baskets/products', {
          params: {
            userAccessKey: context.state.userAccessKey
          },
          data: {
            productId,
          },
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
    }
  }
});
