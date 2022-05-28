<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница"
         :class="{'pagination__link--disabled': 1 === this.page}"
         @click.prevent="prevPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNumber === page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
         :class="{'pagination__link--disabled': pages === this.page}"
         @click.prevent="nextPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: { // настриваем директиву v-model в App.vue
    prop: 'page', // свойство которое передается через v-model будет называться page
    event: 'paginate', // а событие которое будем передавать будет называться paginate
  },
  // eslint-disable-next-line max-len
  props: ['page', 'count', 'perPage'], // значение текущей страницы, общее количество элементов, колчество выводимое на одной странице
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage); // общее количество страниц с продуктами
    },
  },
  methods: {
    paginate(page/* pageNumber */) {
      this.$emit('paginate', page); // отправляем событие (event) paginate
    },
    prevPage() {
      if (this.page !== 1) {
        this.$emit('paginate', this.page - 1);
      }
    },
    nextPage() {
      if (this.page !== this.pages) {
        this.$emit('paginate', this.page + 1);
      }
    },
  },
};
</script>
