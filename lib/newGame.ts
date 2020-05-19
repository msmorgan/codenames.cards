import dictionaryFr from "./dictionary-fr";
import dictionaryEn from "./dictionary-en";
import dictionaryDe from "./dictionary-de";
import dictionaryEs from "./dictionary-es";
import dictionaryEmoji from "./dictionary-emoji";

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import {
  ClassicGridItem,
  DuetGridItem,
  IGameOptions,
  defaultOptions,
  IClassicGrid,
  IDuetGrid,
} from "./game";

const dictionaries = {
  en: dictionaryEn,
  fr: dictionaryFr,
  de: dictionaryDe,
  es: dictionaryEs,
  emoji: dictionaryEmoji,
};

export default (opts?: Partial<IGameOptions>) => {
  let options: IGameOptions = {
    ...defaultOptions,
    ...opts,
  };

  const words = getRandom(dictionaries[options.language].split("\n"), 25);

  const id = getId();
  const createdAt = Date.now();

  if (options.mode === "classic") {
    const randomStart = Math.random() < 0.5 ? "red" : "blue";

    return {
      words,
      options,
      players: {},
      grid: getClassicGrid(randomStart),
      turns: [],
      id,
      createdAt,
      chat: [],
    };
  }

  if (options.mode === "duet") {
    return {
      words,
      options,
      players: {},
      grid: getDuetGrid(),
      turns: [],
      id,
      createdAt,
      chat: [],
    };
  }
};

function getClassicGrid(whoStarts: "red" | "blue"): IClassicGrid {
  const counts = {
    [ClassicGridItem.Red]: [0, 8 + (whoStarts === "red" ? 1 : 0)],
    [ClassicGridItem.Blue]: [0, 8 + (whoStarts === "blue" ? 1 : 0)],
    [ClassicGridItem.Black]: [0, 1],
    [ClassicGridItem.Neutral]: [0, 7],
  };

  return getRandomGrid(counts);
}

function getDuetGrid(): IDuetGrid {
  const counts = {
    [DuetGridItem.GB]: [0, 1],
    [DuetGridItem.GN]: [0, 5],
    [DuetGridItem.GG]: [0, 3],
    [DuetGridItem.BG]: [0, 1],
    [DuetGridItem.BB]: [0, 1],
    [DuetGridItem.BN]: [0, 1],
    [DuetGridItem.NG]: [0, 5],
    [DuetGridItem.NB]: [0, 1],
    [DuetGridItem.NN]: [0, 7],
  };

  return getRandomGrid(counts);
}

const getId = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, colors, animals],
    length: 4,
    separator: "",
    style: "capital",
  });

const getRandomGrid = (counts) => {
  const cardsCount = 25;
  const statuses = Object.keys(counts);
  let grid = [];
  for (let i = 0; i < cardsCount; i++) {
    let random = Math.random();

    for (let s = 0; s < statuses.length; s++) {
      const status = statuses[s];
      let [current, target] = counts[status];
      random -= (target - current) / (cardsCount - grid.length);
      if (random < 0) {
        grid.push(status);
        counts[status][0] = current + 1;
        break;
      }
    }
  }
  return grid;
};

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
