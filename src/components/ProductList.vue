<template>
  <ul class="catalog__list" v-if="products.length">
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <ProductListItem
        :product="product"
      />
    </li>
  </ul>
  <span v-else class="cat./ProductListItem.vue">
    Кажется, все пропало 😱😱😱
  </span>
</template>

<script>
import ProductListItem from './ProductListItem.vue';

export default {
  props: {
    products: { type: Array, required: true },
  },
  components: {
    ProductListItem,
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
