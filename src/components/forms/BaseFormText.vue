<template>
  <BaseFormField :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      type="text"
      :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/forms/BaseFormField.vue';

export default {
  components: {
    BaseFormField,
  },

  props: ['value', 'title', 'error', 'placeholder'],

  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
