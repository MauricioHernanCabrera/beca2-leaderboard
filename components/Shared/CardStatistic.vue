<template>
  <div class="card_statistic">
    <div class="card_statistic__title">{{ title }}</div>
    <div class="card_statistic__value">{{ value }} {{ text }}</div>
    <div class="card_statistic__cripto_price" v-if="criptoPrice">
      ~{{ criptoPrice }} {{ criptoSymbol }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      default: "SLP",
    },

    value: {
      type: [String, Number],
      required: true,
    },

    criptoPrice: {
      type: [String, Number],
      default: null,
    },

    criptoSymbol: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.card_statistic {
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  padding: 24px;
}

.card_statistic__title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.card_statistic__value {
  font-size: 20px;
  font-weight: 600;
}

.card_statistic__cripto_price {
  font-size: 12px;
  font-weight: 400;
}
</style>
