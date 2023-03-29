import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { guessItemType } from "../models/guessArrayModel";
import words from "../assets/json/mots.json";

interface wordleState {
  answer: string;
  guess: guessItemType[];
  currentRow: number;
  currentCol: number;
  status: string;
}

const initialState: wordleState = {
  answer: "",
  guess: [],
  currentRow: 0,
  currentCol: 0,
  status: "",
};

const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    showRules(state) {
      state.status = "rules";
    },
    hideModal(state) {
      state.status = "";
    },
    setAnswer(state) {
      const wordsArrayLength = words.length;
      const randomNumber = Math.floor(Math.random() * wordsArrayLength);
      state.answer = words[randomNumber];
      state.guess = [];
      state.currentCol = 0;
      state.currentRow = 0;
      state.status = "";
    },
    addLetter(state, action: PayloadAction<string>) {
      if (state.currentCol < 5) {
        state.guess.push({
          letter: action.payload,
          row: state.currentRow,
          col: state.currentCol,
        });
        state.currentCol++;
      }
    },
    deleteLetter(state) {
      if (state.guess.length > 0 && state.currentCol > 0) {
        state.guess = state.guess.slice(0, -1);
        state.currentCol--;
      }
    },
    checkAnswer(state) {
      const wordCurrentRowArray = state.guess
        .filter((item) => item.row === state.currentRow)
        .map((elem) => {
          return elem.letter;
        });

      if (wordCurrentRowArray.length === 5) {
        if (state.answer === wordCurrentRowArray.join("")) {
          console.log("You win !");
          state.currentRow++;
          state.status = "win";
        } else if (state.guess.length === 30) {
          state.status = "lose";
          state.currentRow++;
        } else {
          state.currentRow++;
          state.currentCol = 0;
        }
      } else {
        state.status = "incorrect";
      }
    },
  },
});

export const wordleActions = wordleSlice.actions;

export default wordleSlice.reducer;
