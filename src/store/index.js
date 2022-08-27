import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {},
  state: {
    cartProduct: [
      {
        productId: 1,
      },
      {
        productId: 2,
      },
    ],
  },
  actions: {},
  mutations: {},
});
