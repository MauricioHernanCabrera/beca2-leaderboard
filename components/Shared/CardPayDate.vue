<template>
  <div class="pay_date">
    <v-img
      :src="`${$router.options.base}images/pay-date.png`"
      max-width="32px"
      class="pay_date__image"
    ></v-img>

    <div class="pay_date__amount">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.pay_date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 80px;
  border: 2px solid #393939;
  border-radius: 15px;
  padding: 6px 4px;
  margin: 12px 0;

  .pay_date__image {
    margin: 0 auto;
    margin-bottom: 6px;
  }

  .pay_date__amount {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
