<template>
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="productAmount--">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" name="count" v-model.number="productAmount">
      <button type="button" aria-label="Добавить один товар" @click.prevent="productAmount++">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
</template>

<script>
export default {
  props: ['amount'],
  computed: {
    productAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        if (value >= 1) {
          this.$emit('update:amount', value);
        }
      },
    },
  },
};
</script>
