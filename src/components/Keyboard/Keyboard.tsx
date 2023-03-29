import classes from "./Keyboard.module.css";
import Letter from "./Letter";

const firstLine = ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondLine = ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"];
const thirdLine = ["Enter", "W", "X", "C", "V", "B", "N", "Delete"];

const Keyboard = () => {
  return (
    <section className={classes.keyboard}>
      <div className={`${classes.firstLine} ${classes.keyboardLine}`}>
        {firstLine.map((item) => (
          <Letter item={item} key={item} />
        ))}
      </div>
      <div className={`${classes.secondLine} ${classes.keyboardLine}`}>
        {secondLine.map((item) => (
          <Letter item={item} key={item} />
        ))}
      </div>
      <div className={`${classes.thirdLine} ${classes.keyboardLine}`}>
        {thirdLine.map((item) => (
          <Letter item={item} key={item} />
        ))}
      </div>
    </section>
  );
};

export default Keyboard;
