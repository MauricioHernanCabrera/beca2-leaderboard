<template>
  <div class="ranking">
    <v-img
      v-if="value == 1 || value == 2 || value == 3"
      :src="`${$router.options.base}images/top-${value}.png`"
      max-width="64px"
      contain
      class="ranking__image"
    ></v-img>

    <div class="ranking__amount" v-else>
      #{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.ranking {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 12px 0;

  .ranking__image {
    margin: 0 auto;
    margin-bottom: 6px;
  }

  .ranking__amount {
    font-weight: 600;
    font-size: 20px;
  }
}
</style>
