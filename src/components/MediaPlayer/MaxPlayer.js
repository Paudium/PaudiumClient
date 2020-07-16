import React, { useContext } from "react";
import Like from "./Components/Icons/LikeIconFilled";
import Dislike from "./Components/Icons/DislikeIcon";
import Pencil from "./Components/Icons/EditIcon";
import BookMarkIcon from "./Components/Icons/BookmarkIcon";
import BackButton from "./Components/Icons/BackButton";
import BackDisp from "./Components/Icons/BackDisp";
import ForwardButton from "./Components/Icons/ForwardButton";
import ForwardDisp from "./Components/Icons/ForwardDisp";
import TimeLine from "./Components/TimeLine";
import Content from "./Components/ContentItem";
import PlayStopIcon from "./Components/Icons/Stop";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, IconButton, Box, Icon, Avatar } from "@material-ui/core";
import { PLAYER_SIZE } from "../../Const/PlayerSize";

import { GlobalContext } from "../../GlobalState/GlobalState";
import { AudioContext } from "../../GlobalState/AudioContext";
import { AuthContext } from "../../GlobalState/AuthContext";

import { ACTION } from "../../Const/Action";
import { MEDIA } from "../../Const/MediaState";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  maxContainer: {
    width: "100vw",
    marginLeft:"auto",
    
  },
  playStopButton: {
    width: "60px",
    height: "60px",
  },
  toolContainer: {
    border: "1px solid rgba(29,44,86,0.3) ",
    borderRadius: 8,
    marginBottom: "20px",
  },
  iconButton: {
    height: "35px",
    weight: "35px",
    borderRadius: "4px",
    backgroundColor: "rgb(31, 39, 71,0.1)",
    padding: 6,
  },
}));

export default function MaxPlayer() {
  const classes = useStyles();
  const [
    { currentPodcast, currentPlayStatus, currentPlayerSize },
    dispatch,
  ] = useContext(GlobalContext);

  const audioRef = useContext(AudioContext);

  let player = audioRef.current;
  const handleToggle = () => {
    if (currentPlayStatus === MEDIA.PLAY) {
      player.pause();
    } else if (currentPlayStatus === MEDIA.PAUSE) {
      player.play();
    }
  };

  return (
    <div>
      <Paper className={classes.maxContainer}>
        <Grid container>
          <Grid item xs={12}>
            <Box px={2} className={classes.toolContainer}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Like color="primary" />
                <Dislike color="secondary" />
                <BookMarkIcon />
                <Pencil />
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {/* second */}
            <Content title={currentPodcast.title} id={currentPodcast.id} />
          </Grid>
          <Grid item xs={12}>
            <TimeLine
              audioState={currentPlayStatus}
              player={audioRef.current}
            />
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <BackButton color="primary" />
              <BackDisp />
              <IconButton
                onClick={handleToggle}
                className={classes.playStopButton}
              >
                <PlayStopIcon />
              </IconButton>
              <ForwardDisp />
              <ForwardButton color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
