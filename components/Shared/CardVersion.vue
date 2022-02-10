<template>
  <div class="version">
    <span class="version__text"> V </span>

    <div class="version__amount">
      {{ value }}
    </div>
  </div>
</template>

<script>
import formatMoney from "@/lib/format-money";

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  filters: {
    formatMoney,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.version {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 80px;
  border: 2px solid #393939;
  border-radius: 15px;
  padding: 6px 4px;
  margin: 12px 0;

  .version__text {
    margin: 0 auto;
    margin-bottom: 6px;
    font-size: 24px;
    font-weight: 600;
    height: 32px;
  }

  .version__amount {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
