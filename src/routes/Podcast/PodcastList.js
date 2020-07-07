import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../GlobalState/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },

  title: {
    margin: theme.spacing(4, 0, 2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.1)",
    height: "2px",
  },
  playButton: {
    color: "rgba(255,255,255,0.4)",
  },
}));

export default function PodcastList({ podcasts }) {
  const classes = useStyles();
  const history = useHistory();
  const [{ currentPodcast }, dispatch] = useContext(GlobalContext);

  const playSelectedItem = (data) => {
    history.push(`/episode/${data.id}`);
    dispatch({ type: "setCurrentPodcast", snippet: data });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List>
            {podcasts &&
              podcasts.map((podcast) => (
                <div>
                  <ListItem
                    key={podcast.id}
                    disableGutters
                    divider={true}
                    button
                    onClick={() => playSelectedItem(podcast)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        className={classes.large}
                        src="https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/14a43378-edb2-49be-8511-ab0d000a7030/d1b9612f-bb1b-4b85-9c0c-ab0d004ab37a/image.jpg?t=1589407970&size=Large"
                      >
                        {/* <FolderIcon /> */}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={podcast.title}
                      secondary={"secondary text"}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="play">
                        <PlayCircleFilledIcon
                          className={classes.playButton}
                          fontSize="large"
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {/* <Divider component="li" className = {classes.divider}/> */}
                </div>
              ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
