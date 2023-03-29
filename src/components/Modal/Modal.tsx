import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { wordleActions } from "../../store/wordle-slice";
import classes from "./Modal.module.css";

const Backdrop = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={classes.backdrop}
      onClick={() => dispatch(wordleActions.hideModal())}
    />
  );
};

const Overlay: React.FC<{ title: string; message: string; type: string }> = (
  props
) => {
  const dispatch = useDispatch();

  const answer = useSelector((state: RootState) => state.wordle.answer);

  const displayButtonHandler = () => {
    if (props.type === "win" || props.type === "lose") {
      return (
        <button onClick={() => dispatch(wordleActions.setAnswer())}>
          Restart
        </button>
      );
    } else if (props.type === "incorrect" || props.type === "rules") {
      return (
        <button onClick={() => dispatch(wordleActions.hideModal())}>
          Close
        </button>
      );
    }
  };
  return (
    <div className={`${classes.modal} ${props.type && classes.modalAnimation}`}>
      <h2 className={classes.title}>{props.title}</h2>
      <div>
        {props.type === "win" || props.type === "lose" ? (
          <p className={classes.para}>Le mot était : {answer}</p>
        ) : null}

        <p className={classes.para}>{props.message}</p>
      </div>
      <footer className={classes.footer}>{displayButtonHandler()}</footer>
    </div>
  );
};

const Modal: React.FC<{ title: string; message: string; type: string }> = (
  props
) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          type={props.type}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default Modal;
