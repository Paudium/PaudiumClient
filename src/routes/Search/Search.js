import React from "react";
import SearchBar from "./Component/SearchBar";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

export default function Search() {
  return (
    <div>
      <AppBar elevation = {1}>
        <Toolbar>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
