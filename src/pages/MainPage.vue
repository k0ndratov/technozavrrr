<template>
  <div>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>

      <div class="content__catalog">
        <ProductFilter
          :filterFrom.sync="filterParams.priceFrom"
          :filterTo.sync="filterParams.priceTo"
          :filterCategoryId.sync="filterParams.categoryId"
          :filterColorId.sync="filterParams.colorId"
        />
        <section class="catalog">
          <ProductList v-if="productsData" :products="products" />
          <BaseLoader v-else style="margin: 0 auto" />
          <div v-if="productsLoadingFailed">
            Произошла ошибка.<br />
            <button @click.prevent="loadProducts">Обновить</button>
          </div>
          <BasePagination
            v-if="products && productsCount > productsPerPage"
            v-model="page"
            :count="productsCount"
            :per-page="productsPerPage"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BaseLoader,
  },

  data() {
    return {
      filterParams: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
      },

      page: 1,
      productsPerPage: 9,

      productsData: null,
      productsLoadingFailed: false,
    };
  },

  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : null;
    },

    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  methods: {
    loadProducts() {
      this.productsLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            minPrice: this.filterParams.priceFrom,
            maxPrice: this.filterParams.priceTo,
            categoryId: this.filterParams.categoryId,
            colorId: this.filterParams.colorId,
          },
        })
        .then((response) => {
          this.productsData = response.data;
        })
        .catch(() => {
          this.productsLoadingFailed = true;
        });
    },
  },

  watch: {
    page() {
      this.loadProducts();
    },

    filterParams: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>
