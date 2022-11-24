import Vue from 'vue';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
    meta: {
      name: 'Каталог',
    },
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
    meta: {
      name: 'Продукт',
    },
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
    meta: {
      name: 'Корзина',
    },
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order',
    meta: {
      name: 'Заказ',
    },
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id',
    meta: {
      name: 'Успешный заказ',
    },
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '*',
    meta: {
      name: 'Не найдено',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
