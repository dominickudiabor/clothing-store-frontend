import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  info: {
    padding: "5px 100px 70px 100px",
  },
  title: {
    color: blue[600],
    fontSize: "30px",
  },
  button: {
    marginTop: 40,
    fontFamily: "Open Sans Condensed",
    width: 250,
  },
});

export default useStyles;
