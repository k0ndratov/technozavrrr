<template>
  <div>
    <aside class="filter">
      <h2 class="filter__title">Фильтры</h2>

      <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price" for="min-price">
            <span class="form__value">От</span>
            <input
              class="form__input"
              type="number"
              name="min-price"
              id="min-price"
              value="0"
              v-model.number="currentPriceFrom"
            >
          </label>
          <label class="form__label form__label--price" for="max-price">
            <span class="form__value">До</span>
            <input
              class="form__input"
              type="number"
              name="max-price"
              id="max-price"
              value="12345"
              v-model.number="currentPriceTo"
            >
          </label>
        </fieldset>
        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>
          <label class="form__label form__label--select" for="category">
            <select
              class="form__select"
              name="category"
              id="category"
              v-model.number="currentCategoryId"
            >
              <option value="0">Все категории</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.title }}
              </option>
            </select>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Цвет</legend>
          <ul class="colors">
            <li class="colors__item" v-for="el in colors" :key="el.id">
              <label class="colors__label" :for="el.id">
                <input
                  class="colors__radio sr-only"
                  type="radio"
                  :value="el.id"
                  name="colors"
                  :id="el.id"
                  v-model="currentColorId"
                >
                <span class="colors__value" :style="`background-color: ${el.code};`"></span>
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Объем в ГБ</legend>
          <ul class="check-list">
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="8"
                  checked="">
                <span class="check-list__desc">
                  8
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="16">
                <span class="check-list__desc">
                  16
                  <span>(461)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="32">
                <span class="check-list__desc">
                  32
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="64">
                <span class="check-list__desc">
                  64
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="128">
                <span class="check-list__desc">
                  128
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label" for="volume">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="264">
                <span class="check-list__desc">
                  264
                  <span>(313)</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
        <button
          class="filter__submit button button--primery">
          Применить
        </button>
        <button
          class="filter__reset button button--second"
          @click="reset"
        >
          Сбросить
        </button>
      </form>
    </aside>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,

      categoriesData: null,
      colorsData: null,
    };
  },

  props: {
    filterFrom: {
      type: Number,
      required: false,
      default: 0,
    },

    filterTo: {
      type: Number,
      required: false,
      default: 0,
    },

    filterCategoryId: {
      type: Number,
      required: false,
      default: 0,
    },

    filterColorId: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },

    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },

  watch: {
    filterFrom(value) {
      this.currentPriceFrom = value;
    },

    filterTo(value) {
      this.currentPriceTo = value;
    },

    filterCategoryId(value) {
      this.currentCategoryId = value;
    },

    filterColorId(value) {
      this.currentColorId = value;
    },
  },

  methods: {
    submit() {
      this.$emit('update:filterFrom', this.currentPriceFrom);
      this.$emit('update:filterTo', this.currentPriceTo);
      this.$emit('update:filterCategoryId', this.currentCategoryId);
      this.$emit('update:filterColorId', this.currentColorId);
    },

    reset() {
      this.$emit('update:filterFrom', 0);
      this.$emit('update:filterTo', 0);
      this.$emit('update:filterCategoryId', 0);
      this.$emit('update:filterColorId', 0);
    },

    loadCategories() {
      axios.get(`${API_BASE_URL}productCategories`)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },

    loadColors() {
      axios.get(`${API_BASE_URL}colors`)
        .then((response) => {
          this.colorsData = response.data;
        });
    },
  },

  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
