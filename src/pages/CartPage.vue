<template>
  <div>
    <main v-if="products" class="content container">
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
        <span class="content__info">
          {{ totalProductsCount }}
          {{ declinationProducts(totalProductsCount) }}
        </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem v-for="(item, index) in products" :key="index" :item="item" />
            </ul>
          </div>
          <div class="cart__block">
            <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
            <p class="cart__price">Итого: <AnimatedNumber :number="totalPrice" /> ₽</p>

            <router-link
              v-if="products.length"
              tag="button"
              :to="{ name: 'order' }"
              class="cart__button button button--primery"
              type="submit"
            >
              Оформить заказ
            </router-link>
            <p v-else> Вы еще не добавили товары в корзину. </p>
          </div>
        </form>
      </section>
    </main>
    <BaseLoader v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import { numberFormat, declinationProducts } from '@/helpers/custom_function';
import AnimatedNumber from '@/components/AnimatedNumber.vue';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: {
    CartItem,
    AnimatedNumber,
    BaseLoader,
  },

  computed: {
    ...mapGetters({
      products: 'cartDetailProduct',
      totalPrice: 'totalPrice',
      totalProductsCount: 'totalProductsCount',
    }),
  },

  methods: {
    declinationProducts,
  },

  filters: {
    numberFormat,
  },
};
</script>

<style scoped>
.product__price {
  text-align: center;
}
</style>
