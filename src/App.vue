<template>
  <div>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>

      <div class="content__catalog">
        <ProductFilter
          :filterFrom.sync="priceFrom"
          :filterTo.sync="priceTo"
          :filterCategoryId.sync="categoryId"/>
        <section class="catalog">
          <ProductList :products="products"/>
          <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage"/>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      priceFrom: 0,
      priceTo: 0,
      categoryId: 0,

      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filtered = products;
      if (this.priceFrom > 0) {
        filtered = filtered.filter((product) => product.price >= this.priceFrom);
      }

      if (this.priceTo > 0) {
        filtered = filtered.filter((product) => product.price <= this.priceTo);
      }

      if (this.categoryId > 0) {
        filtered = filtered.filter((product) => product.categoryId === this.categoryId);
      }

      console.log(filtered);
      return filtered;
    },
    productsCount() {
      return this.filteredProducts.length;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
  },
};
</script>
