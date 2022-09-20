<template>
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      :placeholder="placeholder">
    </textarea>
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
