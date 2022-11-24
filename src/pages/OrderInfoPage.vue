<template>
  <div>
    <section v-if="order" class="cart content container">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">{{ order.name }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">{{ order.address }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">{{ order.phone }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value">{{ order.email }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="item in order.basket.items" :key="item.id" class="cart__order">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }}Р</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ order.basket.items.length }}</b> товара на сумму
              <b>{{ order.totalPrice }}</b>
            </p>
          </div>
        </div>
      </form>
    </section>
    <BaseLoader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: {
    BaseLoader,
  },

  computed: {
    ...mapGetters({ order: 'getOrderInfo' }),
  },

  created() {
    if (!this.orderId) this.$store.dispatch('fetchOrderInfo', this.$route.params.id);
  },
};
</script>
