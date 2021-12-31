<template>
  <div class="farming_days">
    <v-img
      :src="`${$router.options.base}images/farming.png`"
      max-width="32px"
      class="farming_days__image"
    ></v-img>

    <div class="farming_days__amount">
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

.farming_days {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 80px;
  border: 2px solid #393939;
  border-radius: 15px;
  padding: 6px 4px;
  margin: 12px 0;

  .farming_days__image {
    margin: 0 auto;
    margin-bottom: 6px;
  }

  .farming_days__amount {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
