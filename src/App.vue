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
        <ProductFilter/>
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
      filterFrom: 0,
      filterTo: 0,
      filterCategoryId: 0,

      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let fulteredProducts;

      fulteredProducts = this.filterFrom
        ? products.filter((p) => p.price >= this.filterFrom)
        : products;

      fulteredProducts = this.filterTo
        ? fulteredProducts.filter((p) => p.price <= this.filterTo)
        : fulteredProducts;

      fulteredProducts = this.filterCategoryId
        ? fulteredProducts.filter((p) => p.categoryId === this.filterCategoryId)
        : fulteredProducts;

      return fulteredProducts;
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
