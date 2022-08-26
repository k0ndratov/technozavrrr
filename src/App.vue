<template>
  <div>
    <component
      :is="currentPageComponent"
      :page-params="this.currentPageParams"
    />
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import eventBus from '@/eventBus';

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

  created() {
    console.log('create');
    eventBus.$on('gotoPage', (pageName, pageParams) => {
      this.gotoPage(pageName, pageParams);
    });
  },
};
</script>
