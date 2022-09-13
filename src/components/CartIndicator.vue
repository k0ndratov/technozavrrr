<template>
  <div>
    <router-link class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
      <div v-if="$store.state.cartProduct">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span  class="header__count" aria-label="Количество товаров">
          {{ count }}
        </span>
      </div>
      <div class="loader" v-else>
        Loading
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.cartProduct.length;
    },
  },
};
</script>

<style scoped>
  .loader {
    font-size: 10px;
  }
</style>
