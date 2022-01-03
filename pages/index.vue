<template>
  <div class="home">
    <div class="home__container custom_container custom_container_xxl">
      <div class="home__header">
        <h1 class="home__title">Top Beca2</h1>

        <div class="home__items" v-if="isAdmin">
          <v-btn
            outlined
            class="text-none"
            @click="downloadCSV"
            :disabled="isLoading"
          >
            Generar CSV
          </v-btn>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :items="groups"
            label="Grupo"
            v-model="filters.group"
            outlined
            clearable
            :loading="isLoading"
            :disabled="isLoading"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            :items="infoItems"
            label="Cantidad de información"
            v-model="filters.info"
            outlined
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headersFiltered"
        :items="scholarshipsFiltered"
        :items-per-page="-1"
        :loading="isLoading"
        loading-text="Cargando datos de las becas"
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
          <CardRanking :value="item.ranking === 99999 ? null : item.ranking" />
        </template>

        <template v-slot:item.elo="{ item }">
          <CardCups :value="item.elo" />
        </template>

        <template v-slot:item.slpAverage="{ item }">
          <CardSlp :value="item.slpAverage" />
        </template>

        <template v-slot:item.percentageScholarship="{ item }">
          <CardPercentage :value="item.percentageScholarship" />
        </template>

        <template v-slot:item.claimDate="{ item }">
          <CardPayDate :value="item.claimDateText" />
        </template>

        <template v-slot:item.percentageManager="{ item }">
          <CardPercentage :value="item.percentageManager" />
        </template>

        <template v-slot:item.slpScholarship="{ item }">
          <CardSlp :value="item.slpScholarship" />
        </template>

        <template v-slot:item.slpManager="{ item }">
          <CardSlp :value="item.slpManager" />
        </template>

        <template v-slot:item.total="{ item }">
          <CardSlp :value="item.total" />
        </template>

        <template v-slot:item.farmingDays="{ item }">
          <CardFarmingDays :value="item.farmingDays" />
        </template>

        <template v-slot:item.group="{ item }">
          <div
            class="team"
            v-if="item.team.length > 0 && item.status == 'active'"
          >
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
import { omit } from "lodash";

import { SCHOLARSHIPS } from "@/consts";
import formatMoney from "@/lib/format-money";
import { retry, promiseChunk } from "@/lib/utils";
import { GET_AXIES_OWNER } from "@/graphql";

import CardSlp from "@/components/Shared/CardSlp";
import CardPercentage from "@/components/Shared/CardPercentage";
import CardCups from "@/components/Shared/CardCups";
import CardRanking from "@/components/Shared/CardRanking";
import CardFarmingDays from "@/components/Shared/CardFarmingDays";
import CardPayDate from "@/components/Shared/CardPayDate";

export default {
  name: "Home",

  loading: false,

  mixins: [],

  components: {
    CardSlp,
    CardPercentage,
    CardCups,
    CardRanking,
    CardFarmingDays,
    CardPayDate,
  },

  data() {
    return {
      filters: {
        info: "basic",
        group: null,
      },

      infoItems: [
        {
          text: "Basica",
          value: "basic",
        },
        {
          text: "Avanzada",
          value: "advanced",
        },
      ],

      isLoading: true,

      isAdmin: false,

      scholarships: [],
    };
  },

  async mounted() {
    const { isAdmin = 0 } = this.$route.query;
    this.isAdmin = Boolean(Number(isAdmin));

    try {
      this.scholarships = await this.getScholarInfo(SCHOLARSHIPS);
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    scholarshipsFiltered() {
      let items = this.scholarshipsPopulated;

      const { group } = this.filters;

      if (group) {
        items = items.filter((item) => item.group === group);
      }

      return items;
    },

    groups() {
      return [
        ...new Set(
          this.scholarshipsPopulated
            .map(({ group }) => group)
            .filter((item) => !!item)
        ),
      ].sort();
    },

    scholarshipsRankingMap() {
      return this.scholarships
        .slice()
        .filter((item) => item.status === "active")
        .sort((dataA, dataB) => dataB.elo - dataA.elo)
        .map(({ name }) => name)
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
        ranking:
          scholarshipItem.status === "active"
            ? this.scholarshipsRankingMap[scholarshipItem.name] || 99999
            : 99999,
      }));
    },

    headersFiltered() {
      const { info } = this.filters;

      switch (info) {
        case "basic": {
          return [
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
              text: "Día de pago",
              value: "claimDate",
            },
            {
              text: "Equipo",
              value: "group",
            },
          ];
        }

        case "advanced": {
          return [
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
              text: "Día de pago",
              value: "claimDate",
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
              text: "Porcentaje Becado",
              value: "percentageScholarship",
            },
            {
              text: "Porcentaje Manager",
              value: "percentageManager",
            },

            {
              text: "SLP Becado",
              value: "slpScholarship",
            },
            {
              text: "SLP Manager",
              value: "slpManager",
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
              text: "Día de pago",
              value: "claimDate",
            },
            {
              text: "Equipo",
              value: "group",
            },
          ];
        }

        default:
          [];
      }
    },
  },

  methods: {
    calcIsClaimDay(lastClaimedItemAt) {
      const currentDate = moment();

      let farmingDays = Math.ceil(
        moment.duration(currentDate.diff(lastClaimedItemAt)).asDays()
      );

      return farmingDays >= 15;
    },

    downloadCSV() {
      const infoAux = this.filters.info;

      this.filters.info = "advanced";

      const headers = [
        "ronin",
        ...this.headersFiltered
          .map(({ value }) => value)
          .filter((key) => !["ranking", "group"].includes(key)),
      ];

      const scholarsFiltered = this.scholarshipsPopulated.filter(
        ({ isClaimDay }) => isClaimDay
      );

      if (scholarsFiltered.length === 0) {
        alert("No hay becas para reclamar");
        return;
      }

      const data = scholarsFiltered.map((scholarshipItem) =>
        headers.map((key) => {
          if (["slpAverage", "slpManager", "slpScholarship"].includes(key)) {
            return scholarshipItem[key].toFixed(2);
          }

          return scholarshipItem[key];
        })
      );

      this.exportToCsv(
        `claim-info-${moment(Date.now()).format("YYYY-MM-DD HH-mm-ss")}.csv`,
        [headers, ...data]
      );

      this.filters.info = infoAux;
    },

    exportToCsv(filename, rows) {
      var processRow = function (row) {
        var finalVal = "";
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? "" : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ",";
          finalVal += result;
        }
        return finalVal + "\n";
      };

      var csvFile = "";
      for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
      }

      var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },

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

          const lastClaimedItemAt = scholarshipItem.lastClaimedItemAt
            ? moment(scholarshipItem.lastClaimedItemAt)
            : moment(
                `${moment(gameInfo.last_claimed_item_at * 1000)
                  .toISOString()
                  .slice(0, 11)}00:00:00Z`
              );

          const claimDate = lastClaimedItemAt.add(15, "days");

          const isClaimDay = this.calcIsClaimDay(lastClaimedItemAt);

          return {
            ...scholarshipItem,
            ...farmData,
            elo: scholarshipItem.elo ? scholarshipItem.elo : leaderboard.elo,
            profileUrl: `https://marketplace.axieinfinity.com/profile/${scholarshipItem.ronin}/axie/`,
            team: teamInfo.data.axies.results.map((axieItem) => ({
              ...axieItem,
              marketplaceUrl: `https://marketplace.axieinfinity.com/axie/${axieItem.id}`,
            })),
            isClaimDay,
            claimDate: claimDate.toDate().getTime(),
            claimDateText: claimDate.format("DD/MM"),
          };
        },
        { chunkLength: 10 }
      );

      this.isLoading = false;

      return result;
    },

    calcSlpByOwnership(scholarshipItem, { total, slpAverage }) {
      if (scholarshipItem.isMine) {
        return {
          percentageManager: 100,
          percentageScholarship: 0,
          slpManager: total,
          slpScholarship: 0,
        };
      }

      if (slpAverage >= 135) {
        return {
          percentageManager: 50,
          percentageScholarship: 50,
          slpManager: total * 0.5,
          slpScholarship: total * 0.5,
        };
      } else if (slpAverage >= 105) {
        return {
          percentageManager: 60,
          percentageScholarship: 40,
          slpManager: total * 0.6,
          slpScholarship: total * 0.4,
        };
      } else {
        return {
          percentageManager: 70,
          percentageScholarship: 30,
          slpManager: total * 0.7,
          slpScholarship: total * 0.3,
        };
      }
    },

    calcFarmData(gameInfo, scholarshipItem) {
      if (gameInfo.last_claimed_item_at === 0) {
        return null;
      }

      const { minusTotal = 0 } = scholarshipItem;

      const total = scholarshipItem.total
        ? scholarshipItem.total
        : gameInfo.total - gameInfo.claimable_total - minusTotal;

      const currentDate = moment();

      const lastClaimedItemAt = moment(
        `${moment(gameInfo.last_claimed_item_at * 1000)
          .toISOString()
          .slice(0, 11)}00:00:00Z`
      );

      const { minusFarmingDays = 0, farmingDays: farmingDaysAux } =
        scholarshipItem;

      let farmingDays = farmingDaysAux
        ? farmingDaysAux
        : Math.ceil(
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
        ...this.calcSlpByOwnership(scholarshipItem, { total, slpAverage }),
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

.home__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.home__title {
  margin-bottom: 32px;
}

.home__items {
  display: flex;
}

.team {
  display: flex;
  align-items: center;
  margin: 12px 0;
}

.axie_item {
  margin-right: 6px;

  .axie_item__image {
  }
}
</style>
