<template>
  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ul v-if="color" class="colors colors--black">
      <li class="colors__item" v-for="el in product.colorsId" :key="el">
        <label class="colors__label" :for="`product-color-${product.id}-${el}`">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="getBgColor(el)"
            :name="`product-color-${product.id}`"
            :id="`product-color-${product.id}-${el}`"
            v-model="color">
          <span class="colors__value" :style="`background-color: ${getBgColor(el)};`">
          </span>
        </label>
      </li>
    </ul>
    <h6 v-else> Нет цветов </h6>
  </div>
</template>

<script>
import colors from '@/data/colors';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  data() {
    return {
      color: null,
    };
  },

  created() {
    if (this.product.colorsId.length) {
      const [firstId] = this.product.colorsId;
      this.color = colors.find((color) => color.id === firstId).bgcolor;
    }
  },

  methods: {
    getBgColor(id) {
      const color = colors.find((el) => el.id === id);
      return color.bgcolor;
    },
  },
};
</script>

<style scoped>
  .colors__value {
    border: 1px solid black;
  };
</style>
