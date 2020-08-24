import React from "react";
import { Grid, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";


// styles
import useStyles from "./styles";

export default function Error() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Typography variant="h3" className={classes.logoText}>
        404
      </Typography>
      <Divider orientation="vertical" variant="middle" className={classes.divider} />
      <Typography variant="h6" className={classes.errorText}>
        This page could not be found.
      </Typography>
    </Grid>
  );
}
