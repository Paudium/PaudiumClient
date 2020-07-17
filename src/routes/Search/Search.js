import React from "react";
import SearchBar from "./Component/SearchBar";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchItemList from "./Component/SearchListItem";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  listContainer:{
    marginTop:50,
  }
}))

const searchData = [
  {
    imageURL:
      "https://ssl-static.libsyn.com/p/assets/3/4/e/5/34e59b7e81947180/ASP_albumart_2c.png",
    title: "This is test title for search",
  },
];

export default function Search() {
  const classes = useStyles();
  return (
    <div>
      <AppBar elevation={1}>
        <Toolbar>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <div className = {classes.listContainer}>
        {searchData.map((item) => (
          <SearchItemList podcast={item} />
        ))}
      </div>
    </div>
  );
}
