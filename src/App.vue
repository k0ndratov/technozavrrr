<template>
  <div>
    <component
      :is="currentPageComponent"
      :page-params="this.currentPageParams"
      @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"
    />
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
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
};
</script>
