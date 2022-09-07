import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProduct: [],
  },

  getters: {
    cartDetailProduct(state) {
      return state.cartProduct.map((item) => ({
        product: products.find((p) => p.id === item.productId),
        amound: item.amound,
        colorId: item.colorId,
      }));
    },

    totalPrice(state, getters) {
      return getters.cartDetailProduct.reduce((a, i) => (i.product.price * i.amound) + a, 0);
    },

    totalProductsCount(state, getters) {
      const count = getters.cartDetailProduct.reduce((a, i) => i.amound + a, 0);
      return count;
    },
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
