import React from "react";
import SearchBar from "./Component/SearchBar";
import { AppBar } from "@material-ui/core";

export default function Search() {
  return (
    <div>
      <AppBar>
        <SearchBar />
      </AppBar>
    </div>
  );
}
