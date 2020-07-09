import React, { useState, useRef, useEffect, useContext } from "react";
import { Paper, Grid, IconButton, Box, Icon, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import { useSwipeable } from "react-swipeable";
import EditIcon from "./Components/Icons/EditIcon";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PlayStopIcon from "../MediaPlayer/Components/Icons/Stop";
import Typography from "@material-ui/core/Typography";

import { GlobalContext } from "../../GlobalState/GlobalState";
import { AudioContext } from "../../GlobalState/AudioContext";

import { ACTION } from "../../Const/Action";
import "./style.css";
import { MEDIA } from "../../Const/MediaState";

let relatedVideosVar;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  title: {},
  maxContainer: {
    position: "absolute",
    padding: "15px",
    borderRadius: "30px",
    bottom: 0,
    left: 0,
    width: "100vw",
  },
  minContainer: {
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  mediaPlayerContainer: {
    // marginTop: "auto",
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100vh",
    zIndex: "1400",
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

export default function MediaPlayer({ location, history }) {
  const { data: dataPod, error: errorPod, loading: londingPod } = useQuery(
    GET_PODCAST
  );

  const [{ currentPodcast, currentPlayStatus }, dispatch] = useContext(
    GlobalContext
  );

  const audioRef = useContext(AudioContext);


  const [playerState, setPlayerState] = useState("maximized");
  //there will be 3 states
  // maximized, minimized, playlist
  const [isItFromPlaylist, setIsItFromPlaylist] = useState(false);
  // const [audioState, setAudioState] = useState("playing");
  //thre will be 4 states
  //loading, loaded, playing, paused

  const [minimized, setMinimized] = useState(true);
  const body = document.querySelector("body");

  const audioPlayer = useRef();
  const player = audioPlayer.current;

  const setupMediaSessions = () => {
    if ("mediaSession" in navigator) {
      console.log("navigator setupped");

      navigator.mediaSession.metadata = new window.MediaMetadata({
        // title: currentPodcast.title,
        title: currentPodcast.title,
        artist: "unknown",
        artwork: [
          {
            src: currentPodcast.image,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", () => {
        /* Code excerpted. */
        playAudio();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        /* Code excerpted. */
        audioPlayer.current.pause();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        playPrevious();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        playNext();
      });
    }
  };

  const setcurrentPodcast = (data) => {
    dispatch({ type: ACTION.setPodcast, snippet: data });
  };

  const setVideoSnippet = (video) => {
    setcurrentPodcast({
      id: video.id.videoId,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`,
      // this is the url of the max resolution of thumbnail
    });

    // if window is minimized then only we will run this function
    if (document.hidden) {
      //   setAudioSrcAndPlay(video.id.videoId);
    }
  };

  const playNext = () => {
    // also set this is from playlist
    setIsItFromPlaylist(true);
    // find the index of playing song in the playlist
    const currentIndex = relatedVideosVar.findIndex(
      (video) => video.id.videoId === currentPodcast.id
    );
    let video;
    video = relatedVideosVar[currentIndex + 1]; //we will play the next song
    setVideoSnippet(video);
  };

  const playPrevious = () => {
    setIsItFromPlaylist(true);

    // if the player time is greater than 5 sec we will move the time to 0
    if (player.currentTime > 5) {
      player.currentTime = 0;
    } else {
      const currentIndex = relatedVideosVar.findIndex(
        (video) => video.id.videoId === currentPodcast.id
      );
      let video;
      if (currentIndex !== -1) {
        video = relatedVideosVar[currentIndex - 1]; //we will play the next song
        setVideoSnippet(video);
      } else {
        player.currentTime = 0;
      }
    }
  };

  const playAudio = () => {
    audioPlayer.current
      .play()
      .then((_) => {
        // Automatic playback started!
        // Show playing UI.
        console.log("audio played auto");
        setupMediaSessions();
      })
      .catch((error) => {
        // Auto-play was prevented
        // Show paused UI.
        console.log("playback prevented");
        dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.PAUSE });
      });
  };

  let initPosition = 0;
  const containerRef = useRef(null);

  const swipeHandlerMaximized = useSwipeable({
    onSwipedDown: (e) => {
      setPlayerState("minimized");
    },
    onSwiping: (e) => {
      //getting the event for touches to extract the position
      if (initPosition === 0) {
        initPosition = e.event.changedTouches[0].screenY;
      }

      const screenY = e.event.changedTouches[0].screenY;
      let positionDifference = Math.round(screenY - initPosition);

      if (positionDifference < 1) {
        positionDifference = 0;
      }

      const containerRefStyle = containerRef.current.style;
      containerRefStyle.transform = `translateY(${positionDifference}px)`;
      containerRefStyle.transition = "none";
    },
    onSwiped: (e) => {
      initPosition = 0;
      containerRef.current.style = "";
      // make the initial position 0 again after user leaves the screen
    },

    onSwipedUp: (e) => {
      if (playerState === "minimized") {
        setPlayerState("maximized");
      }
    },

    onSwipedRight: (e) => {},
    onSwipedLeft: (e) => {},
  });

  const returnMinMaxClass = () => {
    if (playerState === "minimized") {
      return "playerMinimized";
    } else if (playerState === "playlist") {
      return "playerPlaylist";
    }
  };

  let playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    background: "#fff",
    width: "100%",
    height: "100%",
    zIndex: 1400,
    display: "inline block",
    transition: "all .3s ease",
  };

  if (playerState === "minimized") {
    playerStyle.transform = "translateY(calc(100% - 106px))";
    playerStyle.zIndex = 0;
    body.style.overflow = "auto";
  }

  if (playerState === "maximized") {
    body.style.overflow = "hidden";
  }

  if (playerState === "playlist") {
    playerStyle.transform = "translateY(-418px)";
  }

  const expandPlayer = () => {
    if (playerState === "minimized") {
      setPlayerState("maximized");
      setMinimized(true);
    }
  };

  // this will be fired when song is ended
  const songEnded = () => {
    playAudio();
  };

  const swipeHandlerMin = useSwipeable({
    onSwipedUp: (e) => {
      expandPlayer();
    },
  });

  const handleToggle = () => {
    if (currentPlayStatus === MEDIA.PLAY) {
      player.pause();
    } else if (currentPlayStatus === MEDIA.PAUSE) {
      player.play();
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        // drag="y"
        // dragConstraints={{ top: 0, bottom: 600 }}
        ref={containerRef}
        // style={playerStyle}
        onClick={expandPlayer}
        className={"mediaPlayerContainer " + returnMinMaxClass()}
      >
        {playerState === "maximized" && (
          <Paper className={classes.maxContainer} {...swipeHandlerMaximized}>
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
                    <Dislike color="default" />
                    <BookMarkIcon />
                    <Pencil />
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                {/* second */}
                <Content />
              </Grid>
              <Grid item xs={12}>
                {console.log("PLayer in media", player)}
                <TimeLine audioState={currentPlayStatus} player={audioRef.current} />
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
        )}

        {playerState === "minimized" && (
          <Paper className={classes.minContainer} {...swipeHandlerMin}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={2}>
                <Avatar variant="rounded" src={currentPodcast.image} />
              </Grid>
              <Grid item xs={6}>
                <Box ml={-2} mb={-2}>
                  <Typography noWrap>Q&A with Andrew Wilkinso...</Typography>
                  <TimeLine audioState={currentPlayStatus} player={audioRef.current} />
                </Box>
              </Grid>
              <Grid item xs={3} container spacing={1}>
                <IconButton className={classes.iconButton}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
      <audio
        // onTimeUpdate={timeUpdate}
        onLoadStart={() => {
          dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.LOADING });
        }}
        id="audio-element"
        // crossOrigin="anonymous"
        onPlay={() =>
          dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.PLAY })
        }
        onPlaying={() =>
          dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.PLAY })
        }
        onPause={() =>
          dispatch({ type: ACTION.setPlayerState, snippet: MEDIA.PAUSE })
        }
        onEnded={songEnded}
        autoPlay
        ref={audioRef}
        src={currentPodcast.audioURL}
      />
    </div>
  );
}

const GET_PODCAST = gql`
  {
    podcasts {
      id
      title
      imageURL
      audioURL
      podTitle
    }
  }
`;
