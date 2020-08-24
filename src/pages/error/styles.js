import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logoText: {
    fontWeight: 600,
    color: theme.palette.primary,
  },
  divider : {
    height: 32,
  },
  errorText: {
    fontWeight: 300,
    color: theme.palette.secondary,
  },
}));
