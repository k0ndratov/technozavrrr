<template>
  <span> {{ oldNumber | numberFormat }} </span>
</template>

<script>
import { numberFormat } from '@/helpers/customFunction';

export default {
  data() {
    return {
      oldNumber: 0,
      timer: null,
    };
  },

  props: {
    number: {
      type: Number,
      required: true,
    },
  },

  created() {
    this.setTimer();
  },

  watch: {
    number() {
      this.setTimer();
    },
  },

  filters: {
    numberFormat,
  },

  methods: {
    setTimer() {
      clearInterval(this.timer);
      const step = Math.ceil(Math.abs(this.oldNumber - this.number) / 50);
      this.timer = setInterval(() => {
        if (this.oldNumber > this.number) {
          if (this.oldNumber - this.number > step) this.oldNumber -= step;
          else this.oldNumber = this.number;
        } else if (this.oldNumber < this.number) {
          if (this.number - this.oldNumber > step) this.oldNumber += step;
          else this.oldNumber = this.number;
        } else clearInterval(this.timer);
      }, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
