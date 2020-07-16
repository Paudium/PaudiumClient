import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TimeLine from "./Components/TimeLine";
import Avatar from "@material-ui/core/Avatar";

import { GlobalContext } from "../../GlobalState/GlobalState";
import { AudioContext } from "../../GlobalState/AudioContext";
import { ACTION } from "../../Const/Action";
import { MEDIA } from "../../Const/MediaState";
import { PLAYER_SIZE } from "../../Const/PlayerSize";

import EditIcon from "./Components/Icons/EditIcon";
const useStyles = makeStyles((theme) => ({
  minContainer: {
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
}));

export default function MiniPlayer() {
  const [
    { currentPodcast, currentPlayStatus, currentPlayerSize },
    dispatch,
  ] = useContext(GlobalContext);

  const audioRef = useContext(AudioContext);

  const classes = useStyles();
  return (
    <div className={classes.minContainer}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={1}
      ></Grid>
    </div>
  );
}
