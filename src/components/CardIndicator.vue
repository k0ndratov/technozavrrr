<template>
  <div>
    <router-link class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ $store.state.cartProduct.length }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
