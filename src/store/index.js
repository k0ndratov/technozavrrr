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
      return getters.cartDetailProduct.reduce((a, i) => i.product.price * i.amound + a, 0);
    },

    totalProductsCount(state, getters) {
      const count = getters.cartDetailProduct.reduce((a, i) => i.amound + a, 0);
      return count;
    },
  },

  mutations: {
    addProductToCard(state, { productId, colorId, amound }) {
      const product = this.state.cartProduct.find(
        (prod) => prod.productId === productId && prod.colorId === colorId,
      );
      if (product) {
        product.amound += amound;
      } else {
        this.state.cartProduct.push({ productId, colorId, amound });
      }
    },

    updateCartProductAmound(state, { productId, amound }) {
      const product = this.state.cartProduct.find((prod) => prod.productId === productId);
      if (product) {
        product.amound = amound;
      }
    },

    deleteCartProduct(state, { productId, colorId }) {
      state.cartProduct = state.cartProduct.filter(
        (product) => product.productId !== productId && product.colorId !== colorId,
      );
    },

    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProduct(state) {
      state.cartProduct = state.cartProductsData.map((item) => ({
        product: item.product,
        amound: item.quantity,
        colorId: null,
      }));
    },
  },

  actions: {
    loadCart(context) {
      axios
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
  },
});
