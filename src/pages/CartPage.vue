<template>
  <div>
    <main class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Корзина </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ totalProductsCount }} товара </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <li class="cart__item product" v-for="(item, index) in products" :key="index">
                <div class="product__pic">
                  <img
                    :src="item.product.image"
                    width="120"
                    height="120"
                    :alt="item.product.title"
                  />
                </div>
                <h3 class="product__title">{{ item.product.title }}</h3>
                <p class="product__info product__info--color">
                  <span>
                    <i
                      :style="`background-color: ${getBgColorHEX(item.colorId)}`"
                      class="bordered">
                    </i>
                  </span>
                </p>
                <span class="product__code"> Артикул: {{ item.product.id }} </span>

                <ProductInput v-model="item.amound"/>

                <b class="product__price">
                  {{ (item.product.price * item.amound) | numberFormat }} ₽
                </b>

                <button
                  class="product__del button-del"
                  type="button"
                  aria-label="Удалить товар из корзины"
                >
                  <svg width="20" height="20" fill="currentColor">
                    <use xlink:href="#icon-close"></use>
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
            <p class="cart__price">Итого: <span>{{ totalPrice | numberFormat }} ₽</span></p>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getBgColorHEX, numberFormat } from '@/helpers/customFunction';
import ProductInput from '@/components/ProductInput.vue';

export default {
  components: {
    ProductInput,
  },

  computed: {
    ...mapGetters({
      products: 'cartDetailProduct',
      totalPrice: 'totalPrice',
      totalProductsCount: 'totalProductsCount',
    }),
  },

  filters: {
    numberFormat,
  },

  methods: {
    getBgColorHEX,
  },
};
</script>

<style scoped>
  .product__price {
    text-align: center;
  }
  .bordered {
    border: 1px solid lightgray;
  }
</style>
