import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import BookmarkOutline from "../../../Shared/Icons/BookMarkOutlined";

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

export default function Contributor({ contributor }) {
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
          >
            {contributor.timeStamp}
          </Typography>
        </Grid>
        <Grid />

        <Grid item xs={5} container justify="flex-end" alignItems="center">
          <IconButton size="small">
            <ArrowDropUpIcon />
          </IconButton>
          {contributor.rate}
          <IconButton size="small">
            <ArrowDropDownIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xm={1}>
          <IconButton>
            <BookmarkOutline />
          </IconButton>
        </Grid>
        {/* <Grid item xs={12} sm container> */}
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {contributor.note}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
