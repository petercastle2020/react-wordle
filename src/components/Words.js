import wordleBank from "./wordleBank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let randomWord;
  await fetch(wordleBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split(/\r?\n/);
      randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, randomWord };
};
