import React from "react";
import { useSelector } from "react-redux";
import classes from "./GridLetter.module.css";
import { guessItemType } from "../../models/guessArrayModel";
import { RootState } from "../../store";

const GridLetter: React.FC<{ row: number; col: number }> = (props) => {
  const guess: guessItemType[] = useSelector(
    (state: RootState) => state.wordle.guess
  );
  const currentRow: number = useSelector(
    (state: RootState) => state.wordle.currentRow
  );
  const currentCol: number = useSelector(
    (state: RootState) => state.wordle.currentCol
  );

  const answer: string = useSelector((state: RootState) => state.wordle.answer);

  const currentElement = guess.find(
    (elem: guessItemType) => elem.col === props.col && elem.row === props.row
  );

  const displayData = (): string | undefined => {
    return currentElement?.letter;
  };

  const selectBackground = () => {
    if (
      answer[props.col] === currentElement?.letter &&
      currentRow !== props.row &&
      guess.length > 0
    ) {
      return classes.rightPlace;
    } else if (
      answer[props.col] !== currentElement?.letter &&
      currentRow !== props.row &&
      answer.includes(currentElement?.letter!)
    ) {
      return classes.wrongPlace;
    }
  };

  return (
    <div
      className={`${classes.gridLetter} ${
        currentRow === props.row && currentCol === props.col
          ? classes.active
          : null
      } ${selectBackground()}`}
    >
      {displayData()}
    </div>
  );
};

export default GridLetter;
