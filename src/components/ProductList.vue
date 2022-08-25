<template>
  <ul class="catalog__list" v-if="products.length">
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <ProductItem
        :product="product"
        @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"
      />
    </li>
  </ul>
  <span v-else class="catalog__stub">
    Кажется, все пропало 😱😱😱
  </span>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: {
    products: { type: Array, required: true },
  },
  components: {
    ProductItem,
  },
};
</script>

<style scoped>
.catalog__stub {
  text-align: center;
  color:aquamarine;
  font-size: 1.17em;
  font-weight: 900;
  font-family: "PressStart";
}
</style>
