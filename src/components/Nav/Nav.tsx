import classes from "./Nav.module.css";
import restartImg from "../../assets/img/restart.png";
import { wordleActions } from "../../store/wordle-slice";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  return (
    <nav className={classes.nav}>
      <h1>Wordle FR</h1>
      <ul className={classes.navList}>
        <li onClick={() => dispatch(wordleActions.showRules())}>?</li>
        <li onClick={() => dispatch(wordleActions.setAnswer())}>
          <img src={restartImg} className={classes.img} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
