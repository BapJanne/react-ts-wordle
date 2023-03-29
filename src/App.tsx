import { useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import Keyboard from "./components/Keyboard/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { wordleActions } from "./store/wordle-slice";
import Modal from "./components/Modal/Modal";
import { RootState } from "./store";
import Nav from "./components/Nav/Nav";

function App() {
  const dispatch = useDispatch();

  const modalStatus = useSelector((state: RootState) => state.wordle.status);

  useEffect(() => {
    dispatch(wordleActions.setAnswer());
  }, []);

  const modalHandler = () => {
    if (modalStatus === "win") {
      return (
        <Modal
          title={"Bravo !"}
          message={
            "Bravo tu as gagné, si tu veux refaire une partie tu peux appuyer sur le bouton rejouer ci-dessous !"
          }
          type={modalStatus}
        />
      );
    } else if (modalStatus === "incorrect") {
      return (
        <Modal
          title={"Error !"}
          message={"Le mot proposé doit faire 5 lettres."}
          type={modalStatus}
        />
      );
    } else if (modalStatus === "lose") {
      return (
        <Modal
          title={"Dommage !"}
          message={"Vous avez épuisé tous vos essais."}
          type={modalStatus}
        />
      );
    } else if (modalStatus === "rules") {
      return (
        <Modal
          title={"Les règles :"}
          message={`Le but du jeu est de trouver le mot caché en 5 lettres. Vous avez 6 essais pour y parvenir. Pour valider le mot, il faut appuyer sur la touche "↵". Pour supprimer une lettre, il faut appuyer sur la touche "←". Si la case est colorée en orange, cela signifie que la lettre est présente dans le mot recherché, mais pas à cette place précise. En revanche, si la case est colorée en vert, cela signifie que la lettre est à la bonne place.`}
          type={modalStatus}
        />
      );
    }
  };

  return (
    <div className="App">
      <Nav />
      {modalHandler()}
      <Grid />
      <Keyboard />
    </div>
  );
}

export default App;
