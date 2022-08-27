import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {},

  state: {
    cartProduct: [
      {
        productId: 1,
        colorId: 1,
        amound: 2,
      },
    ],
  },

  actions: {},

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
  },
});
