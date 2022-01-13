/**
 * Protocolo de retiro
 *  1. cada que se retire una cuenta si tiene minusFarmingDays quitarselo
 *  2. tomar el snapshot antes de iniciar el dia (20:55)
 *  3. retirar siempre despues de iniciado el dia (21:01)
 *
 * Prestar atencion a los retiros hasta el 15 de enero
 */

const SCHOLARSHIPS = [
  {
    name: "P0 | HERNAN",
    ronin: "ronin:6291358c0cc12b0d423fa376e0e541db3222458d",
    isMine: true,
    status: "active",
    group: "PlBePa"
  },
  {
    name: "P1 | GUIDO",
    ronin: "ronin:2418edadadf5dc9ee56f0060eba3ae4756326872",
    status: "active",
    group: "PlBePa"
  },
  {
    name: "P2 | MILI",
    ronin: "ronin:91731b481cc449a27cb017de028d51708338515e",
    status: "active",
    group: "Unico"
  },
  {
    name: "P3 | GASTON | BN2",
    ronin: "ronin:5a1d45e8444ae0cc92e7d3462153bbe2ab9240ee",
    minusFarmingDays: 1,
    status: "active",
    group: "Unico",
    lastClaimedItemAt: "2021-12-31T00:00:00.000Z"
  },
  {
    name: "P4 | CANELA",
    ronin: "ronin:40f3e1bb7b83702e21b6d5808487f7fc6f8fbde6",
    status: "active",
    group: "Unico"
  },
  {
    name: "P5 | PRISCILA | BN2",
    ronin: "ronin:5941367a6518eaea190d3f08099959cf3a234dc0",
    minusFarmingDays: 1,
    status: "active",
    group: "Termi",
    lastClaimedItemAt: "2021-12-31T00:00:00.000Z"
  },
  {
    name: "P6 | BN4 | C2 | NICO",
    ronin: "ronin:6cfa7b1ee49e3a77e95eaa4ecd81c6e7575d95b9",
    status: "active",
    group: "Termi"
  },
  {
    name: "P7 | C1 | LUCAS",
    ronin: "ronin:b3a3553a9a55cca64c703bcd4320d943b723b615",
    farmingDays: 2,
    total: 41,
    status: "inactive"
  },
  {
    name: "P7 | C2 | TONY",
    ronin: "ronin:b3a3553a9a55cca64c703bcd4320d943b723b615",
    minusFarmingDays: 5,
    minusTotal: 41,
    status: "active",
    group: "Futsal"
  },
  {
    name: "P8 | BN2 | IVAN",
    ronin: "ronin:8e06329c89c63f0accec1dc29ecf703d917f3159",
    status: "active",
    group: "Bird CR7"
  },
  {
    name: "P9 | C1 | NAHUEL",
    ronin: "ronin:7b28dc6a18e1ae63c4aa6ba24397d5a094a5ca52",
    status: "active",
    minusFarmingDays: 6,
    minusTotal: 370,
    // farmingDays: 6,
    // total: 719,
    group: "Termi"
  },
  {
    name: "P9 | C2 | OSCAR",
    ronin: "ronin:7b28dc6a18e1ae63c4aa6ba24397d5a094a5ca52",
    status: "inactive",
    farmingDays: 4,
    total: 370,
    group: "Termi"
  },
  {
    name: "P10 | JOSE",
    ronin: "ronin:b9aab9b714ff4dd690875b9770680707a882771f",
    status: "active",
    group: "Unico"
  },
  {
    name: "P11 | BN3 | MARCOS",
    ronin: "ronin:60a3b3996338cd5b54e032d0229bf1202a271ecd",
    status: "active",
    group: "Termi",
  },
  {
    name: "P12 | GASPAR",
    ronin: "ronin:6f3fa3cd2a34a604a0cd7df42ced5961d612468d",
    minusFarmingDays: 1,
    status: "active",
    group: "Bird CR7",
    lastClaimedItemAt: "2021-12-31T00:00:00.000Z"
  },
  {
    name: "P13 | C1 | TIOURE",
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    status: "inactive",
    farmingDays: 2,
    total: 0
  },
  {
    name: "P13 | C2 | JUNIOR",
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    status: "inactive",
    farmingDays: 1,
    total: 6
  },
  {
    name: "P13 | C3 | MAURI FERREYRA",
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    status: "active",
    minusFarmingDays: 4,
    minusTotal: 6,
    group: "Bird CR7"
  },
  {
    name: "P14 | LUIS FERREYRA", //
    ronin: "ronin:dc021f5a2502b89685bf94c3002b9e953a2cdd14",
    status: "active",
    group: "Bird CR7"
  },
  {
    name: "P15 | HERNAN FLORES",
    ronin: "ronin:4a077a038a74f8f63be683d856fdcd3af7a284d5",
    status: "active",
    group: "Futsal"
  },
  {
    name: "P16 | SOL",
    ronin: "ronin:ec7cf999cc37c3068cd0be378b320d932cf1beda",
    status: "active",
    group: "Futsal"
  },
  {
    name: "P17 | SARA",
    ronin: "ronin:0b1a12251566d37897e903c6e1660eabd9387be1",
    status: "active",
    group: "Futsal"
  }
];

export { SCHOLARSHIPS };
