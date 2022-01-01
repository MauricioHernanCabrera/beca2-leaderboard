<template>
  <div class="slp">
    <v-img
      :src="`${$router.options.base}images/percentage.png`"
      max-width="32px"
      class="slp__image"
    ></v-img>

    <div class="slp__amount">
      {{ value | formatMoney }}
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

.slp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 90px;
  border: 2px solid #393939;
  border-radius: 15px;
  padding: 6px 4px;
  margin: 12px 0;

  .slp__image {
    margin: 0 auto;
    margin-bottom: 6px;
  }

  .slp__amount {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
