<template>
  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title" v-if="product.image">
      <span v-else class="product__image-stub">😱😱😱</span>
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price.toLocaleString() }} ₽
    </span>

    <ul v-if="currentColorValue" class="colors colors--black">
      <li class="colors__item" v-for="colorId in product.colorsId" :key="colorId">
        <label class="colors__label" :for="`product-color-${product.id}-${colorId}`">
          <input class="colors__radio sr-only" type="radio" :value="getBgColor(colorId)"
            :name="`product-color-${product.id}`" :id="`product-color-${product.id}-${colorId}`"
            v-model="currentColorValue">
          <span class="colors__value" :style="`background-color: ${getBgColor(colorId)};`"></span>
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

  props: {
    product: { type: Object, required: true },
  },

  data() {
    return {
      currentColorValue: null,
    };
  },

  created() {
    if (this.product.colorsId.length) {
      const [firstId] = this.product.colorsId;
      this.currentColorValue = this.getBgColor(firstId);
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
  .product__image-stub {
    display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color:rgb(245, 242, 242);
  }

  .colors__value {
    border: 1px solid black;
  };
</style>
