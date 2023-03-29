import classes from "./Grid.module.css";
import GridLetter from "./GridLetter";

const rows = [0, 1, 2, 3, 4, 5];
const cols = [0, 1, 2, 3, 4];

const Grid = () => {
  const displayGrid = () => {
    return (
      <div className={classes.grid}>
        {rows.map((row): any => (
          <div key={row} className={classes.row}>
            {cols.map((col) => (
              <GridLetter key={`${row}${col}`} row={row} col={col} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{displayGrid()}</div>;
};

export default Grid;
