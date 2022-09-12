<template>
  <div>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          aria-label="Предыдущая страница"
          :class="{'pagination__link--disabled': page===1}"
          href="#"
          @click.prevent="paginate(page-1)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a
          href="#"
          class="pagination__link"
          :class="{'pagination__link--current': pageNumber === page}"
          @click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          href="#"
          aria-label="Следующая страница"
          :class="{'pagination__link--disabled': page===pages}"
          @click.prevent="paginate(page+1)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { scrollUp } from '@/helpers/custom_function';

export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      if (page > 0 && page <= this.pages) {
        this.$emit('paginate', page);
        scrollUp();
      }
    },
  },
};
</script>
