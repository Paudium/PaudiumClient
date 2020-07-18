import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import { GlobalContext } from "../../GlobalState/GlobalState";
import { ACTION } from "../../Const/Action";
import { MEDIA } from "../../Const/Consts";
import { AudioContext } from "../../GlobalState/AudioContext";
import BookmarkIcon from "../../components/MediaPlayer/Components/Icons/BookmarkIconFilled";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";

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
  bookmarkButton: {
    color: "rgba(65,75,105,1.0)",
  },
  podcastList: {
    marginTop: 80,
  },

  rootList: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    listStyleType: "none",
  },
}));

const GET_PODCAST = gql`
  query($podgroupId: ID!) {
    podgroup(podgroupId: $podgroupId) {
      id
      podTitle
      podcasts {
        id
        title
        imageURL
      }
    }
  }
`;

export default function ExploreDetail({ match }) {
  const podgroupId = match.params.podGroupId;
  console.log(podgroupId);
  const { loading: loadingPod, error: errorPod, data: dataPod } = useQuery(
    GET_PODCAST,
    {
      variables: { podgroupId },
    }
  );
  console.log(dataPod);
  const classes = useStyles();
  const history = useHistory();
  const [{ currentPodcast }, dispatch] = useContext(GlobalContext);
  const { currentPlayStatus } = useContext(GlobalContext);
  const audioRef = useContext(AudioContext);

  const playSelectedItem = (data) => {
    history.push(`/episode/${data.id}`);
    dispatch({ type: ACTION.setPodcast, snippet: data });
  };
  const handlePlayer = (data) => {
    if (data.id !== currentPodcast.id || currentPlayStatus === MEDIA.PAUSE) {
      dispatch({ type: ACTION.setPodcast, snippet: data });
      dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.PLAY });
    } else {
      audioRef.current.pause();
    }
  };
  function renderRow(props) {
    const { index, style } = props;
    return (
      <div>
        {dataPod &&
          dataPod.podgroup.podcasts.map((podcast) => (
            <ListItem
              key={podcast.id}
              disableGutters
              divider={true}
              button
              onClick={() => playSelectedItem(podcast)}
              className={classes.listItem}
              // style={style}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  className={classes.large}
                  src={podcast.imageURL}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={podcast.title}
                secondary={"secondary text"}
              />

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="play-stop"
                  onClick={() => handlePlayer(podcast)}
                >
                  <BookmarkIcon className={classes.bookmarkButton} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </div>
    );
  }

  return (
    <div>
      <div className={classes.root}>
        {dataPod ? (
          <FixedSizeList
            height={1000}
            width="100%"
            itemSize={500}
            itemCount={
              dataPod.podgroup.podcasts && dataPod.podgroup.podcasts.length
            }
          >
            {renderRow}
          </FixedSizeList>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
