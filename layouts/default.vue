<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    console.log(process.env.version);
  },
};
</script>

<style lang="scss">
.footer {
  display: flex;
}

.footer__version {
  font-size: 12px;
  font-weight: 600;
}
</style>
