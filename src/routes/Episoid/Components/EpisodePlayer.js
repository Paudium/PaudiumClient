import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import BookMarkIcon from "../../../components/NavBar/MediaTopBar/Components/BookmarkIcon";
import EditIcon from "../../../components/MediaPlayer/Components/Icons/EditIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  period: {
    flexGrow: 1,
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="flex-end" alignItems="center">
        <Grid item xm={2}>
          <Box />
        </Grid>
        <Grid item xs={5} container direction="column" spacing={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            // className={classes.period}
          >
            02:21 - 03 :29
          </Typography>
        </Grid>
        <Grid />

        <Grid item xs={5} container justify="flex-end" alignItems="center">
          3
          <IconButton size = "small">
            <ThumbUpAltIcon />
          </IconButton>
          60
          <IconButton size = "small">
            <ThumbDownIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xm={1}>
          <IconButton>
            <PlayCircleFilledIcon />
          </IconButton>
        </Grid>
        {/* <Grid item xs={12} sm container> */}
        <Grid
          item
          xs
          container
          direction="row"
          spacing={2}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" noWrap>
              Warning: Do NOT open...
            </Typography>
          </Grid>
          <IconButton size = "small">
            <BookMarkIcon />
          </IconButton>
            <EditIcon size = "small" />
        </Grid>
      </Grid>
    </div>
  );
}
