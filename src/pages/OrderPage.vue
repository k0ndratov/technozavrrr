<template>
  <main v-if="products" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProductsCount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label" for="#">
              <input
                class="form__input"
                type="text"
                name="name"
                placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label" for="#">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label" for="#">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label" for="#">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
            </label>

            <label class="form__label" for="#">
              <textarea
                class="form__input form__input--area"
                name="comments"
                placeholder="Ваши пожелания">
              </textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="#">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  >
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="#">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="#">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="#">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="elem in products" :key="elem.product.id">
              <h3> {{ elem.product.title }} ({{ elem.amount }}) </h3>
              <b> {{ elem.product.price | numberFormat }} ₽
              </b>
              <span>Артикул: {{ elem.product.id }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка:
              <b> 500 ₽ </b>
            </p>
            <p>Итого:
              <b> {{ totalProductsCount }} </b> товара на сумму
              <b> {{ totalPrice | numberFormat}} ₽ </b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
  <BaseLoader v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';
import { numberFormat } from '@/helpers/custom_function';

export default {
  components: {
    BaseLoader,
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
    ...mapActions(['loadCart']),
  },

  created() {
    this.loadCart();
  },
};
</script>
