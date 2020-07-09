import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 116,
  },
  media: {
    height: 113,
  },
});

export default function MediaCard({ image, title }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} />
      </CardActionArea>
      <Typography gutterBottom variant="body2" align="center">
        {title.substring(0, 25)}
      </Typography>
    </Card>
  );
}
