import React from "react";
import { Container, Paper, IconButton } from "@material-ui/core";
import SuperQuote from "./Components/SuperQuote";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EpisodePlayer from './Components/EpisodePlayer';
import Contributors from './Components/Contributors';



const useStyle = makeStyles((theme) => ({
  title: {
    alignItems: "center",
  },
  container: {
    borderRadius: 30,
  },
}));

export default function Episoid() {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.container}>
        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs={1}></Grid>
            <Grid item className={classes.title}>
              <Typography>Episode Section</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <SuperQuote />
          <EpisodePlayer/>
          <Contributors/>
        </Grid>
      </Paper>
    </div>
  );
}
