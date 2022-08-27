<template>
  <div>
    <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ $store.state.cartProduct.length }}
      </span>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
