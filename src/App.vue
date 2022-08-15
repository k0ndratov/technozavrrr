<template>
<div>
  <section class="catalog">
    <ProductList :products="products"/>
    <BasePagination :page="page" :count="productsCount" :per-page="productsPerPage"/>
</section>
</div>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    productsCount() {
      return products.length;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
  },
};
</script>
