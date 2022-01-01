<template>
  <div class="home">
    <div class="home__container custom_container custom_container--lg">
      <h1 class="home__title">Top Beca2</h1>

      <v-data-table
        :headers="headers"
        :items="scholarshipsPopulated"
        :items-per-page="-1"
        :loading="isLoading"
        hide-default-footer
        mobile-breakpoint="0"
        class="elevation-1"
        :sort-by="['ranking']"
      >
        <template v-slot:item.name="{ item }">
          <a
            :href="item.profileUrl"
            target="_blank"
            class="white--text font-weight-bold"
          >
            {{ item.name }}
          </a>
        </template>

        <template v-slot:item.ranking="{ item }">
          <CardRanking :value="item.ranking" />
        </template>

        <template v-slot:item.elo="{ item }">
          <CardCups :value="item.elo" />
        </template>

        <template v-slot:item.slpAverage="{ item }">
          <CardSlp :value="item.slpAverage" />
        </template>

        <template v-slot:item.total="{ item }">
          <CardSlp :value="item.total" />
        </template>

        <template v-slot:item.farmingDays="{ item }">
          <CardFarmingDays :value="item.farmingDays" />
        </template>

        <template v-slot:item.team="{ item }">
          <div class="team" v-if="item.team.length > 0">
            <a
              class="axie_item"
              v-for="axieItem in item.team"
              :key="axieItem.id"
              :href="axieItem.marketplaceUrl"
              target="_blank"
            >
              <v-img
                class="axie_item__image"
                width="72px"
                aspect-ratio="1"
                :src="axieItem.image"
              ></v-img>
            </a>
          </div>
          <span v-else>-</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { SCHOLARSHIPS } from "@/consts";
import formatMoney from "@/lib/format-money";
import { retry, promiseChunk } from "@/lib/utils";
import { GET_AXIES_OWNER } from "@/graphql";

import CardSlp from "@/components/Shared/CardSlp";
import CardCups from "@/components/Shared/CardCups";
import CardRanking from "@/components/Shared/CardRanking";
import CardFarmingDays from "@/components/Shared/CardFarmingDays";

export default {
  name: "Home",

  mixins: [],

  components: {
    CardSlp,
    CardCups,
    CardRanking,
    CardFarmingDays,
  },

  data() {
    return {
      isLoading: true,

      headers: [
        {
          text: "Ranking",
          value: "ranking",
        },
        {
          text: "Becado",
          sortable: false,
          value: "name",
        },
        {
          text: "Copas",
          value: "elo",
        },
        {
          text: "SLP Promedio",
          value: "slpAverage",
        },
        {
          text: "SLP Total",
          value: "total",
        },
        {
          text: "Días de farmeo",
          value: "farmingDays",
        },
        {
          text: "Equipo",
          sortable: false,
          value: "team",
        },
      ],

      scholarships: [],
    };
  },

  async mounted() {
    try {
      this.scholarships = await this.getScholarInfo(SCHOLARSHIPS);
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    scholarshipsRankingMap() {
      return this.scholarships
        .slice()
        .sort((dataA, dataB) => dataB.elo - dataA.elo)
        .map(({ ronin }) => ronin)
        .reduce(
          (prev, current, index) => ({
            ...prev,
            [current]: index + 1,
          }),
          {}
        );
    },

    scholarshipsPopulated() {
      return this.scholarships.map((scholarshipItem) => ({
        ...scholarshipItem,
        ranking: this.scholarshipsRankingMap[scholarshipItem.ronin] || null,
      }));
    },
  },

  methods: {
    async getScholarInfo(scholars) {
      this.isLoading = true;

      const result = await promiseChunk(
        scholars,
        async (scholarshipItem) => {
          const address = scholarshipItem.ronin.replace("ronin:", "0x");

          const [{ items }, gameInfo, teamInfo] = await Promise.all([
            retry(() =>
              this.$axios.$get(
                `https://game-api.skymavis.com/game-api/leaderboard?client_id=${address}&limit=1`
              )
            ),
            retry(() =>
              this.$axios.$get(
                `https://game-api.skymavis.com/game-api/clients/${address}/items/1`
              )
            ),
            retry(() =>
              this.$apollo.query({
                query: GET_AXIES_OWNER,
                variables: { owner: address },
              })
            ),
          ]);

          const [, , leaderboard] = items;

          const farmData = this.calcFarmData(gameInfo, scholarshipItem);

          return {
            ...scholarshipItem,
            elo: leaderboard.elo,
            ...farmData,
            profileUrl: `https://marketplace.axieinfinity.com/profile/${scholarshipItem.ronin}/axie/`,
            team: teamInfo.data.axies.results.map((axieItem) => ({
              ...axieItem,
              marketplaceUrl: `https://marketplace.axieinfinity.com/axie/${axieItem.id}`,
            })),
          };
        },
        { chunkLength: 10 }
      );

      this.isLoading = false;

      return result;
    },

    calcFarmData(gameInfo, scholarshipItem) {
      if (gameInfo.last_claimed_item_at === 0) {
        return null;
      }

      const total = gameInfo.total - gameInfo.claimable_total;

      const currentDate = moment();
      // new Date(`${new Date().toISOString().slice(0, 11)}00:00:00Z`)

      const lastClaimedItemAt = moment(
        `${moment(gameInfo.last_claimed_item_at * 1000)
          .toISOString()
          .slice(0, 11)}00:00:00Z`
      );

      const { minusFarmingDays = 0 } = scholarshipItem;

      const farmingDays =
        Math.ceil(
          moment.duration(currentDate.diff(lastClaimedItemAt)).asDays()
        ) - minusFarmingDays;

      const slpAverage =
        farmingDays === 0 || total === 0
          ? 0
          : parseFloat(parseFloat(total / farmingDays).toFixed(2));

      return {
        slpAverage,
        total,
        farmingDays,
      };
    },
  },

  filters: {
    formatMoney,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.home {
  padding-top: 64px;
  padding-bottom: 64px;
}

.home__container {
}

.home__title {
  margin-bottom: 32px;
}

.team {
  display: flex;
  margin: 12px 0;
}

.axie_item {
  margin-right: 6px;

  .axie_item__image {
  }
}
</style>
