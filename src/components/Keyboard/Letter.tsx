import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { wordleActions } from "../../store/wordle-slice";
import { guessItemType } from "../../models/guessArrayModel";
import classes from "./Letter.module.css";
import { RootState } from "../../store";

const Letter: React.FC<{ item: string }> = (props) => {
  const dispatch = useDispatch();

  const guess = useSelector((state: RootState) => state.wordle.guess);
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const currentCol = useSelector((state: RootState) => state.wordle.currentCol);

  const answer: string = useSelector((state: RootState) => state.wordle.answer);

  const [isInPlace, setIsInPlace] = useState("");

  useEffect(() => {
    const isInRightPlace = guess.filter((item: guessItemType) => {
      return (
        item.letter === props.item &&
        answer.includes(props.item) &&
        answer.indexOf(props.item) === item.col
      );
    });
    const isInWrongPlace = guess.filter((item: guessItemType) => {
      return (
        item.letter === props.item &&
        answer.includes(props.item) &&
        answer.indexOf(props.item) !== item.col
      );
    });

    const isNotInAnswer = guess.filter((item: guessItemType) => {
      return item.letter === props.item && !answer.includes(props.item);
    });

    if (isInRightPlace[0]?.letter === props.item) {
      setIsInPlace("rightPlace");
    } else if (isInWrongPlace[0]?.letter === props.item) {
      setIsInPlace("wrongPlace");
    } else if (isNotInAnswer.length > 0) {
      setIsInPlace("none");
    } else {
      return setIsInPlace("");
    }
  }, [currentRow]);

  const onClickHandler = () => {
    if (props.item.toLowerCase() === "delete") {
      dispatch(wordleActions.deleteLetter());
    } else if (props.item.toLowerCase() === "enter") {
      dispatch(wordleActions.checkAnswer());
    } else {
      dispatch(wordleActions.addLetter(props.item));
    }
  };

  const displayLetter = () => {
    if (props.item.toLowerCase() === "delete") {
      return "←";
    } else if (props.item.toLowerCase() === "enter") {
      return "↵";
    } else {
      return props.item;
    }
  };

  const classesLetterHandler = () => {
    if (isInPlace === "rightPlace") {
      return classes.rightPlace;
    } else if (isInPlace === "wrongPlace") {
      return classes.wrongPlace;
    } else if (isInPlace === "none") {
      return classes.none;
    } else {
      return null;
    }
  };

  return (
    <div
      className={`${classes.letter} ${classesLetterHandler()}`}
      onClick={onClickHandler}
    >
      {displayLetter()}
    </div>
  );
};

export default Letter;
