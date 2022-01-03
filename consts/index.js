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
    status: "active"
  },
  {
    name: "P1 | GUIDO",
    ronin: "ronin:2418edadadf5dc9ee56f0060eba3ae4756326872",
    status: "active"
  },
  {
    name: "P2 | MILI",
    ronin: "ronin:91731b481cc449a27cb017de028d51708338515e",
    status: "active"
  },
  {
    name: "P3 | GASTON | BN2",
    ronin: "ronin:5a1d45e8444ae0cc92e7d3462153bbe2ab9240ee",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P4 | CANELA",
    ronin: "ronin:40f3e1bb7b83702e21b6d5808487f7fc6f8fbde6",
    status: "active"
  },
  {
    name: "P5 | PRISCILA | BN2",
    ronin: "ronin:5941367a6518eaea190d3f08099959cf3a234dc0",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P6 | DINO | BN3",
    ronin: "ronin:ababd5724014ada2d124388faaa7700fef9e17b4",
    farmingDays: 5,
    status: "inactive"
  },
  {
    name: "P6 | C1 | PAPEL | BN4",
    ronin: "ronin:6cfa7b1ee49e3a77e95eaa4ecd81c6e7575d95b9",
    farmingDays: 3,
    total: 80,
    elo: 1200,
    status: "inactive"
  },
  {
    name: "P6 | C2 | NICO | BN4",
    ronin: "ronin:6cfa7b1ee49e3a77e95eaa4ecd81c6e7575d95b9",
    minusFarmingDays: 5,
    minusTotal: 80,
    status: "active"
  },
  {
    name: "P7 | C1 | LUCAS",
    ronin: "ronin:b3a3553a9a55cca64c703bcd4320d943b723b615",
    farmingDays: 2,
    total: 41,
    elo: 1256,
    status: "inactive"
  },
  {
    name: "P7 | C2 | TONY",
    ronin: "ronin:b3a3553a9a55cca64c703bcd4320d943b723b615",
    minusFarmingDays: 3,
    minusTotal: 41,
    status: "active"
  },
  {
    name: "P8 | IVAN | BN2",
    ronin: "ronin:8e06329c89c63f0accec1dc29ecf703d917f3159",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P9 | NAHUEL",
    ronin: "ronin:7b28dc6a18e1ae63c4aa6ba24397d5a094a5ca52",
    status: "active"
  },
  {
    name: "P10 | JOSE",
    ronin: "ronin:b9aab9b714ff4dd690875b9770680707a882771f",
    status: "active"
  },
  {
    name: "P11 | MARCOS | BN3",
    ronin: "ronin:60a3b3996338cd5b54e032d0229bf1202a271ecd",
    status: "active"
  },
  {
    name: "P12 | GASPAR",
    ronin: "ronin:6f3fa3cd2a34a604a0cd7df42ced5961d612468d",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P13 | C1 | TIOURE",
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    status: "inactive",
    farmingDays: 2,
    total: 0,
    elo: 1445,
  },
  {
    name: "P13 | C2 | JUNIOR",
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    status: "active",
    minusFarmingDays: 2,
    minusTotal: 0,
  },
  {
    name: "P14 | EMILIO",
    ronin: "ronin:dc021f5a2502b89685bf94c3002b9e953a2cdd14",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P15 | HERNAN FLORES",
    ronin: "ronin:4a077a038a74f8f63be683d856fdcd3af7a284d5",
    status: "active"
  },
  {
    name: "P16 | SOL",
    ronin: "ronin:ec7cf999cc37c3068cd0be378b320d932cf1beda",
    minusFarmingDays: 1,
    status: "active"
  },
  {
    name: "P17 | SARA",
    ronin: "ronin:0b1a12251566d37897e903c6e1660eabd9387be1",
    status: "active"
  }
];

export { SCHOLARSHIPS };
