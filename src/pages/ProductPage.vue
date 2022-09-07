<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link href="css/style.min.css" rel="stylesheet" />
      <title>Каталог</title>
    </head>

    <body>
      <main class="content container">
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
            </li>
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                {{ getCategoryName(product.categoryId) }}
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                {{ product.title }}
              </a>
            </li>
          </ul>
        </div>

        <section class="item">
          <div class="item__pics pics">
            <div class="pics__wrapper">
              <img width="570" height="570" :src="product.image" :alt="product.title" />
            </div>
          </div>

          <div class="item__info">
            <span class="item__code">Артикул: {{ product.id }}</span>
            <h2 class="item__title">
              {{ product.title }}
            </h2>
            <div class="item__form">
              <form class="form" action="#" method="POST" @submit.prevent="addProductToCard">
                <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

                <fieldset class="form__block">
                  <legend class="form__legend">Цвет:</legend>
                  <ul class="colors">
                    <li
                      class="colors__item"
                      v-for="colorId in product.colorsId"
                      :key="colorId"
                    >
                      <label class="colors__label" :for="`color-${colorId}`">
                        <input
                          class="colors__radio sr-only"
                          type="radio"
                          :id="`color-${colorId}`"
                          :name="product.id"
                          :value="colorId"
                          v-model="currentProductColorId"
                        />
                        <span
                          class="colors__value"
                          :style="`background-color: ${getBgColorHEX(colorId)}`"
                        >
                        </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <fieldset class="form__block">
                  <legend class="form__legend">Объемб в ГБ:</legend>

                  <ul class="sizes sizes--primery">
                    <li class="sizes__item">
                      <label class="sizes__label" for="sizes-item">
                        <input
                          class="sizes__radio sr-only"
                          type="radio"
                          name="sizes-item"
                          value="32"
                        />
                        <span class="sizes__value"> 32gb </span>
                      </label>
                    </li>
                    <li class="sizes__item">
                      <label class="sizes__label" for="sizes-item">
                        <input
                          class="sizes__radio sr-only"
                          type="radio"
                          name="sizes-item"
                          value="64"
                        />
                        <span class="sizes__value"> 64gb </span>
                      </label>
                    </li>
                    <li class="sizes__item">
                      <label class="sizes__label" for="sizes-item">
                        <input
                          class="sizes__radio sr-only"
                          type="radio"
                          name="sizes-item"
                          value="128"
                          checked=""
                        />
                        <span class="sizes__value"> 128gb </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <div class="item__row">
                  <ProductInput v-model="amound"/>
                  <button class="button button--primery" type="submit">В корзину</button>
                </div>
              </form>
            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item">
                <a class="tabs__link tabs__link--current"> Описание </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#"> Характеристики </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#"> Гарантия </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#"> Оплата и доставка </a>
              </li>
            </ul>

            <div class="item__content">
              <p>
                Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
                Синхронизация со смартфоном<br />
                Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
                Поддержка сторонних приложений<br />
              </p>
              <a href="#"> Все характеристики </a>
              <h3>Что это?</h3>
              <p>
                Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
                велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
                синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
                отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
                устройство можно установить как фирменное приложение, так и различные приложения
                сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
                сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже
                преодоленные маршруты и планировать новые велопрогулки.
              </p>
              <h3>Дизайн</h3>
              <p>
                Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
                всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета
                выполнен из черного пластика. На обращенной к пользователю стороне расположен
                дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также
                полученная со смартфона и синхронизированных датчиков информация: интенсивность,
                скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
                Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что
                устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
                погружение в воду на глубину не более 1 метра.
              </p>
            </div>
          </div>
        </section>
      </main>
    </body>
  </html>
</template>

<script>
import {
  getProduct,
  getCategoryName,
  getBgColorHEX,
  numberFormat,
  scrollUp,
} from '@/helpers/customFunction';
import ProductInput from '@/components/ProductInput.vue';

export default {
  components: {
    ProductInput,
  },
  data() {
    return {
      amound: null,
      currentProductColorId: null,
    };
  },

  computed: {
    product() {
      return getProduct(+this.$route.params.id);
    },
  },

  filters: {
    numberFormat,
  },

  created() {
    scrollUp();
    if (this.product.colorsId) {
      [this.currentProductColorId] = this.product.colorsId;
    }
  },

  methods: {
    getCategoryName,
    getBgColorHEX,
    numberFormat,
    addProductToCard() {
      this.$store.commit('addProductToCard', {
        productId: this.product.id,
        colorId: this.currentProductColorId,
        amound: this.amound,
      });
    },
  },
};
</script>
