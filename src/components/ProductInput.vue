<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click="decreaseAmound"
      class="cursorPoiner"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <label for="count" >
      <input
        type="text"
        name="count"
        id="count"
        v-model.number="currentAmound"
      />
    </label>
    <button
      type="button"
      aria-label="Добавить один товар"
      @click="increaseAmound"
      class="cursorPoiner"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductInput',

  data() {
    return {
      currentAmound: null,
    };
  },
  props: {
    value: {
      required: true,
    },
  },
  created() {
    this.currentAmound = this.value || 1;
  },
  methods: {
    increaseAmound() {
      this.currentAmound += 1;
    },
    decreaseAmound() {
      if (this.currentAmound > 1) this.currentAmound -= 1;
    },
  },
  watch: {
    currentAmound(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped>
  .form__counter {
    border: 1px solid black;
  }

  .cursorPoiner {
    cursor: pointer;
  }
</style>
