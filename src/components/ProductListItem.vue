<template>
  <div>
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title" v-if="product.image" />
      <span v-else class="product__image-stub">😱😱😱</span>
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price.toLocaleString() }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label" :for="`${product.id}${color.id}`">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.id"
            :name="product.id"
            :id="`${product.id}${color.id}`"
            v-model="currentColorValue"
          />
          <span class="colors__value" :style="`background-color:${ color.code };`">
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import categories from '@/data/categories';

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

  computed: {
    categories() {
      return categories;
    },
  },

  created() {
    if (this.product.colors) {
      this.currentColorValue = this.product.colors[0].id;
    }
  },
};
</script>

<style scoped>
.product__image-stub {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgb(245, 242, 242);
}

.colors__value {
  border: 1px solid black;
}
</style>
