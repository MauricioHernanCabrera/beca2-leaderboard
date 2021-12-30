<template>
  <div class="cups">
    <v-img
      :src="`${$router.options.base}images/cups.png`"
      max-width="32px"
      class="cups__image"
    ></v-img>

    <div class="cups__amount">
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

.cups {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 80px;
  border: 2px solid #393939;
  border-radius: 15px;
  padding: 6px 4px;
  margin: 12px 0;

  .cups__image {
    margin: 0 auto;
    margin-bottom: 6px;
  }

  .cups__amount {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
