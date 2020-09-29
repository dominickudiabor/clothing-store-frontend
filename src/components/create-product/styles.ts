import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  info: {
    padding: "30px 100px 70px 100px",
  },
  title: {
    color: blue[900],
    fontSize: "30px",
  },
  button: {
    marginTop: 60,
    fontFamily: "Open Sans Condensed",
    width: 250,
  },
});

export default useStyles;
