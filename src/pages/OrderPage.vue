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
        {{ totalProductsCount }}
        {{ declinationProducts(totalProductsCount) }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="submitOrder">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <BaseFormText
                v-model="formData.name"
                title="ФИО"
                :error="formError.name"
                placeholder="Введите ваше полное имя"
              />
            </label>
            <label class="form__label">
              <BaseFormText
                v-model="formData.address"
                title="Адрес доставки"
                :error="formError.address"
                placeholder="Введите ваш адрес"
              />
            </label>
            <label class="form__label">
              <BaseFormText
                v-model="formData.phone"
                title="Телефон"
                :error="formError.phone"
                placeholder="Введите ваш телефон"
              />
            </label>
            <label class="form__label">
              <BaseFormText
                v-model="formData.email"
                title="Email"
                :error="formError.email"
                placeholder="Введи ваш Email"
              />
            </label>
            <label class="form__label">
              <BaseFormTextArea
                v-model="formData.comment"
                title="Комментарий к заказу"
                :error="formError.comment"
                placeholder="Ваши пожелания"
              />
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
              <b> {{ totalProductsCount }} </b>
              {{ declinationProducts(totalProductsCount) }}
              на сумму
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
import { numberFormat, declinationProducts } from '@/helpers/custom_function';
import BaseLoader from '@/components/BaseLoader.vue';
import BaseFormText from '@/components/forms/BaseFormText.vue';
import BaseFormTextArea from '@/components/forms/BaseFormTextArea.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
    };
  },

  components: {
    BaseLoader,
    BaseFormText,
    BaseFormTextArea,
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
    declinationProducts,
    ...mapActions(['loadCart', 'createOrder']),

    submitOrder() {
      this.formError = {};
      this.createOrder(this.formData)
        .then(() => {
          this.formData = {};
        })
        .catch((error) => {
          this.formError.message = error.response.data.error.message;
          this.formError = error.response.data.error.request || {};
        });
    },
  },

  created() {
    this.loadCart();
  },
};
</script>
