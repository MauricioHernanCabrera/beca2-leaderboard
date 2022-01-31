/**
 * Protocolo de retiro
 *  1. cada que se retire una cuenta si tiene minusFarmingDays quitarselo
 *  2. tomar el snapshot antes de iniciar el dia (20:55)
 *  3. retirar siempre despues de iniciado el dia (21:01)
 *
 * Prestar atencion a los retiros hasta el 15 de enero
 */

const players = {
  "GUIDO CABRERA": {
    email: "antoniareabinance@gmail.com",
    name: "GUIDO CABRERA"
  },
  "MILI MALDONADO": {
    email: "maldonadomilagros712@gmail.com",
    name: "MILI MALDONADO"
  },
  "GASTON CABRERA": {
    email: "cabreragastonivan31@gmail.com",
    name: "GASTON CABRERA"
  },
  CANELA: {
    email: "yoaquinmaidana@gmail.com",
    name: "CANELA"
  },
  PRISCILA: {
    email: "priscilaevelinespinoza@gmail.com",
    name: "PRISCILA"
  },
  NICO: {
    email: "agustinamgarcia1@gmail.com",
    name: "NICO"
  },
  TONY: {
    email: "tomasacosta1990@gmail.com",
    name: "TONY"
  },
  IVAN: {
    email: "rodriguezivanexe@gmail.com",
    name: "IVAN"
  },
  NAHUEL: {
    email: "rodrigueznahuelm@hotmail.com",
    name: "NAHUEL"
  },
  JOSE: {
    email: "josecruzfina@gmail.com",
    name: "JOSE"
  },
  MARCOS: {
    email: "marcossantinomazzanti@gmail.com",
    name: "MARCOS"
  },
  GASPAR: {
    email: "gasparelpi@gmail.com",
    name: "GASPAR"
  },
  TIOURE: {
    email: "arruabarrenamateo@gmail.com",
    name: "TIOURE"
  },
  "MAURI FERREYRA": {
    email: "mauricioferreyra548@gmail.com",
    name: "MAURI FERREYRA"
  },
  "LUIS FERREYRA": {
    email: "rizzoluis53@gmail.com",
    name: "LUIS FERREYRA"
  },
  "HERNAN FLORES": {
    email: "hernanpe17@gmail.com",
    name: "HERNAN FLORES"
  },
  "SOL CRUZ": {
    email: "mariasolcruz150698@gmail.com",
    name: "SOL CRUZ"
  },
  SARA: {
    email: "gsara3204@gmail.com",
    name: "SARA"
  }
};

const accounts = {
  P0: {
    ronin: "ronin:6291358c0cc12b0d423fa376e0e541db3222458d",
    name: "P0"
  },
  P1: {
    ronin: "ronin:2418edadadf5dc9ee56f0060eba3ae4756326872",
    name: "P1"
  },
  P2: {
    ronin: "ronin:91731b481cc449a27cb017de028d51708338515e",
    name: "P2"
  },
  P3: {
    ronin: "ronin:cfaf463bd4845d1382f8b74721bfd2d6ba532c70",
    name: "P3"
  },
  P4: {
    ronin: "ronin:40f3e1bb7b83702e21b6d5808487f7fc6f8fbde6",
    name: "P4"
  },
  P5: {
    ronin: "ronin:e5b071081b89029990cff067c4761b7f0b277cde",
    name: "P5"
  },
  P6: {
    ronin: "ronin:935e38ebf2027d48fc1b289187d865067043fa93",
    name: "P6"
  },
  P7: {
    ronin: "ronin:b3a3553a9a55cca64c703bcd4320d943b723b615",
    name: "P7"
  },
  P8: {
    ronin: "ronin:c36ea2c476fc6fef80a43d4b555a0ab684a1e245",
    name: "P8"
  },
  P9: {
    ronin: "ronin:7b28dc6a18e1ae63c4aa6ba24397d5a094a5ca52",
    name: "P9"
  },
  P10: {
    ronin: "ronin:b9aab9b714ff4dd690875b9770680707a882771f",
    name: "P10"
  },
  P11: {
    ronin: "ronin:5a1d45e8444ae0cc92e7d3462153bbe2ab9240ee",
    name: "P11"
  },
  P12: {
    ronin: "ronin:5941367a6518eaea190d3f08099959cf3a234dc0",
    name: "P12"
  },
  P13: {
    ronin: "ronin:fda5019da5dca5ecbd826d9bc13b520e412e1bb2",
    name: "P13"
  },
  P14: {
    ronin: "ronin:6f3fa3cd2a34a604a0cd7df42ced5961d612468d",
    name: "P14"
  },
  P15: {
    ronin: "ronin:f3bcabf76fa75120552aba907106c6ce87782748",
    name: "P15"
  },
  P16: {
    ronin: "ronin:8e06329c89c63f0accec1dc29ecf703d917f3159",
    name: "P16"
  },
  P17: {
    ronin: "ronin:dc021f5a2502b89685bf94c3002b9e953a2cdd14",
    name: "P17"
  },
  P18: {
    ronin: "ronin:a443e1967026ecbe6b73d5662d35081713b9e160",
    name: "P18"
  },
  P19: {
    ronin: "ronin:2e745a40da4739324b76b4b53131a5d435508ad1",
    name: "P19"
  },
  P20: {
    ronin: "ronin:4a077a038a74f8f63be683d856fdcd3af7a284d5",
    name: "P20"
  },
  P21: {
    ronin: "ronin:ababd5724014ada2d124388faaa7700fef9e17b4",
    name: "P21"
  },
  P22: {
    ronin: "ronin:ec7cf999cc37c3068cd0be378b320d932cf1beda",
    name: "P22"
  },
  P23: {
    ronin: "ronin:6cfa7b1ee49e3a77e95eaa4ecd81c6e7575d95b9",
    name: "P23"
  },
  P24: {
    ronin: "ronin:60a3b3996338cd5b54e032d0229bf1202a271ecd",
    name: "P24"
  },
  P25: {
    ronin: "ronin:0b1a12251566d37897e903c6e1660eabd9387be1",
    name: "P25"
  }
};

const SCHOLARSHIPS = [
  {
    ...accounts["P1"],
    player: players["GUIDO CABRERA"],
    status: "active",
    group: "PlBePa"
  },
  {
    ...accounts["P2"],
    player: players["MILI MALDONADO"],
    status: "active",
    group: "Unico"
  },
  {
    ...accounts["P11"],
    player: players["GASTON CABRERA"],
    status: "active",
    group: "Unico"
  },
  {
    ...accounts["P4"],
    player: players["CANELA"],
    status: "active",
    group: "Unico"
  },
  {
    ...accounts["P23"],
    player: players["NICO"],
    status: "active",
    group: "Termi"
  },
  {
    ...accounts["P7"],
    player: players["PRISCILA"],
    status: "active",
    group: "Futsal"
  },
  {
    ...accounts["P16"],
    player: players["IVAN"],
    status: "active",
    group: "Bird CR7"
  },
  {
    ...accounts["P9"],
    player: players["NAHUEL"],
    status: "active",
    group: "Termi"
  },
  {
    ...accounts["P10"],
    player: players["JOSE"],
    status: "active",
    group: "Unico"
  },
  {
    ...accounts["P24"],
    player: players["MARCOS"],
    status: "active",
    group: "Termi"
  },
  {
    ...accounts["P14"],
    player: players["GASPAR"],
    status: "active",
    group: "Bird CR7"
  },
  {
    ...accounts["P15"],
    player: players["MAURI FERREYRA"],
    status: "active",
    group: "Bird CR7",
  },
  {
    ...accounts["P17"],
    player: players["LUIS FERREYRA"],
    status: "active",
    group: "Bird CR7"
  },
  {
    ...accounts["P20"],
    player: players["HERNAN FLORES"],
    status: "active",
    group: "Futsal"
  },
  {
    ...accounts["P22"],
    player: players["SOL CRUZ"],
    status: "active",
    group: "Futsal"
  }
].map(scholarItem => ({
  ...scholarItem,
  name: `${scholarItem.name} | ${scholarItem.player.name}`
}));

export { SCHOLARSHIPS };
