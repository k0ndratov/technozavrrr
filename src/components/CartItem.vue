<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image.file.url" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <p class="product__info product__info--color">
      <span>
        <!-- <i :style="`background-color: ???`" class="bordered"> </i> -->
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <ProductInput v-model="amound" />

    <b class="product__price"> <AnimatedNumber :number="item.product.price * item.amound" /> ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct({ producrId: item.product.id, colorId: item.colorId })"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import ProductInput from '@/components/ProductInput.vue';
import { getBgColorHEX, numberFormat } from '@/helpers/custom_function';
import { mapMutations } from 'vuex';
import AnimatedNumber from '@/components/AnimatedNumber.vue';

export default {
  components: {
    ProductInput,
    AnimatedNumber,
  },

  filters: {
    numberFormat,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    amound: {
      get() {
        return this.item.amound;
      },

      set(value) {
        return this.$store.commit('updateCartProductAmound', {
          productId: this.item.product.id,
          amound: value,
        });
      },
    },
  },

  methods: {
    getBgColorHEX,
    ...mapMutations(['deleteCartProduct']),
  },
};
</script>

<style scoped>
.button-del {
  cursor: pointer;
}
.bordered {
  border: 1px solid lightgray;
}
.product__price {
  margin: 0 auto;
}
</style>
