import React from "react";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "./Icons/MenuIcon";
import EditIcon from "./Icons/EditIcon";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    borderWidth: "1px",
    borderColor: "#000",
    backgroundColor: "#f00",
  },
  listItemContainer: {
    padding: 0,
  },
  iconButton: {
    height: "35px",
    weight: "35px",
    borderRadius: "4px",
    backgroundColor: "rgb(31, 39, 71,0.1)",
    padding: 6,
  },
}));



export default function ContentItem() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container justify="space-between" alignItems="center">
      <MenuIcon/>
      <Grid item xs zeroMinWidth>
        <Typography noWrap>
          Warning: Do NOT open a restsefewfefwefwefwef
        </Typography>
      </Grid>
      <IconButton className={classes.iconButton} onClick = {()=>{history.push("/episodesection")}}>
        <EditIcon color="primary" />
      </IconButton>
    </Grid>
  );
}
