import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      marginBottom: "5%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    appBar: {
      backgroundColor: "#12cad6",
      height: "auto",
    },
    menuIcon: { width: "6%", height: "100%", marginTop: "0.5%" },

    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      marginRight: theme.spacing(25),
      marginLeft: theme.spacing(5),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(5),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontFamily: "Open Sans Condensed",
    },
    account: {
      marginTop: 10,
    },
    logo: {
      width: 40,
      height: 40,
    },
    photo: {
      height: 25,
      borderRadius: 15,
      marginRight: 5,
    },
    name: {
      fontSize: 12,
      marginRight: 5,
      color: "white",
    },
    profile: {
      top: 70,
    },
    admin: {
      color: "white",
      fontFamily: "Open Sans Condensed",
    },
    exit: {
      marginLeft: 10,
    },
  })
);

export default useStyles;
