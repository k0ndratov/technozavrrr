<template>
  <div>
    <component :is="currentPageComponent" :page-params="this.currentPageParams"/>
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  components: {
    MainPage,
    ProductPage,
  },

  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },

  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },

  methods: {
    gotoPage(page, pageParams) {
      this.currentPage = page;
      this.currentPageParams = pageParams || {};
    },
  },
};
</script>
