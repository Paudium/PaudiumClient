import React from "react";
import { Container, Paper, IconButton } from "@material-ui/core";
import SuperQuote from "./Components/SuperQuote";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EpisodePlayer from "./Components/EpisodePlayer";
import Contributors from "./Components/Contributors";
import { useHistory } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  title: {
    alignItems: "center",
  },
  container: {
    position: "fixed",
    borderRadius: 0,
    top: 0,
    left: 0,
    height: "100vh",
  },
}));

export default function Episoid() {
  const classes = useStyle();
  const history = useHistory();
  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs={1}></Grid>
            <Grid item className={classes.title}>
              <Typography>Episode Section</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => history.push("/podcast")}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <EpisodePlayer />
          <Contributors />
        </Grid>
      </Container>
    </Paper>
  );
}
