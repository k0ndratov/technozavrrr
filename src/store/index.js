import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProduct: null,

    userAccessKey: null,
    cartProductsData: [],
  },

  getters: {
    cartDetailProduct(state) {
      return state.cartProduct;
    },

    totalPrice(state, getters) {
      return getters.cartDetailProduct.reduce((a, i) => i.product.price * i.amount + a, 0);
    },

    totalProductsCount(state, getters) {
      const count = getters.cartDetailProduct.reduce((a, i) => i.amount + a, 0);
      return count;
    },
  },

  mutations: {
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProduct.find((elem) => elem.product.id === productId);
      if (item) {
        item.amount = amount;
      }
    },

    syncCartProduct(state) {
      state.cartProduct = state.cartProductsData.map((item) => ({
        product: item.product,
        amount: item.quantity,
        colorId: null,
      }));
    },

    resetCartProduct(state) {
      state.cartProduct = null;
      state.cartProductsData = [];
    },
  },

  actions: {
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            context.commit('updateUserAccessKey', response.data.user.accessKey);
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProduct');
        });
    },

    addProductToCard(context, { productId, amount }) {
      return axios
        .post(
          `${API_BASE_URL}baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProduct');
        });
    },

    updateCartProductAmound(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      return axios
        .put(
          `${API_BASE_URL}baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProduct');
        });
    },

    deleteCartProduct(context, { productId }) {
      return axios
        .delete(`${API_BASE_URL}baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProduct');
        });
    },

    createOrder(context, formData) {
      return axios
        .post(
          `${API_BASE_URL}orders`,
          {
            ...formData,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          },
        )
        .then(() => {
          context.commit('resetCartProduct');
        });
    },
  },
});
