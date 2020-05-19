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
  range,
  shuffle,
} from "lodash";

import {
  ClassicGridItem,
  DuetGridItem,
  GridItem,
  IGameOptions,
  defaultOptions,
  IClassicGrid,
  IDuetGrid,
  IGrid,
  IGridConfig,
  IGame,
  IClassicGame,
  IDuetGame,
} from "./game";

const dictionaries = {
  en: dictionaryEn,
  fr: dictionaryFr,
  de: dictionaryDe,
  es: dictionaryEs,
  emoji: dictionaryEmoji,
};


export default function newGame(opts?: Partial<IGameOptions>): IGame {
  let options: IGameOptions = {
    ...defaultOptions,
    ...opts,
  };

  const words = getRandom(dictionaries[options.language].split("\n"), 25);

  const id = getId();
  const createdAt = Date.now();

  if (options.mode === "classic") {
    const randomStart = Math.random() < 0.5 ? "red" : "blue";

    return <IClassicGame>{
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
    return <IDuetGame>{
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
    [ClassicGridItem.Red]: 8 + (whoStarts === "red" ? 1 : 0),
    [ClassicGridItem.Blue]: 8 + (whoStarts === "blue" ? 1 : 0),
    [ClassicGridItem.Black]: 1,
    [ClassicGridItem.Neutral]: 7,
  };

  return getRandomGrid(counts);
}

function getDuetGrid(): IDuetGrid {
  const counts = {
    [DuetGridItem.GB]: 1,
    [DuetGridItem.GN]: 5,
    [DuetGridItem.GG]: 3,
    [DuetGridItem.BG]: 1,
    [DuetGridItem.BB]: 1,
    [DuetGridItem.BN]: 1,
    [DuetGridItem.NG]: 5,
    [DuetGridItem.NB]: 1,
    [DuetGridItem.NN]: 7,
  };

  return getRandomGrid(counts);
}

function getId(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, colors, animals],
    length: 4,
    separator: "",
    style: "capital",
  })
}

function getRandomGrid<T extends GridItem>(counts: IGridConfig<T>): IGrid<T> {
  const cardsCount = 25;
  const statuses = Object.keys(counts).map(k => Number(k) as T);
  const grid: IGrid<T> = [];
  const gridIndexes = shuffle(range(cardsCount));
  for (const status of statuses) {
    for (let i = 0; i < counts[status]; i++) {
      grid[gridIndexes.pop()] = status;
    }
  }
  return grid;
}

function getRandom<T>(arr: T[], count: number): T[] {
  if (count > arr.length)
    throw new RangeError("getRandom: more elements taken than available");

  const result: T[] = [];
  const taken: { [idx: number]: number } = {};
  let len = arr.length;
  for (let i = 0; i < count; i++) {
    const index = Math.ceil(Math.random() * len);
    result.push(arr[index in taken ? taken[index] : index]);
    len -= 1;
    taken[index] = len in taken ? taken[len] : len;
  }
  return result;
}
