import React, { useContext, useEffect, useState, lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { GlobalContext } from "../GlobalState/GlobalState";

import { Container } from "@material-ui/core";
import MainPlayer from "../routes/Player";
import Episode from "../routes/Episoid/Episode";
import Podcast from "./Podcast/Podcasts";
import Episodes from "./Episodes";
import EpisodeSection from "../routes/Episoid/EpisoidSection";
import PlayList from "./Playlist/Playlist";
import Explore from "./Explore/Explor";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import ecommerce from "./Ecommerce/Ecommerce";

import NavBar from "../components/NavBar/MediaTopBar/index";
import BottomNavigation from "../components/BottomNavigation/BottomNavBar";

import Test from "../routes/test";

const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register"));
const HomePage = lazy(() => import("./Home"));

const returnMainPlayer = (props) => {
  // we will return the main player if the path is not the "/"

  if (window.location.pathname !== "/") {
    return <MainPlayer {...props} />;
  } else {
    return null;
  }
};

const episodePath = "/episode";
const circularLoader = (
  <Grid
    style={{ height: "100vh" }}
    container
    justify="center"
    alignItems="center"
  >
    <CircularProgress />
  </Grid>
);

const CurrentSection = ({ history, location }) => {
  console.log("location", location);
  return (
    <div>
      <Suspense fallback={circularLoader}>
        <NavBar />
        <Container maxWidth="sm">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/episode/:episodeId" component={Episode} />
            <Route exact path="/episodesection" component={EpisodeSection} />
            <Route exact path="/episodes" component={Episodes} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/podcast" component={Podcast} />
            <Route exact path="/playlist" component={PlayList} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/ecommerce" component={ecommerce} />
          </Switch>
          {(location.pathname.match(/episode/) ||
            location.pathname.match(/podcast/) ||
            location.pathname.match(/ecommerce/) ||
            location.pathname.match(/episodes/)) && (
            <Route path="/" render={(props) => returnMainPlayer(props)} />
          )}

          {(location.pathname==="/" ||
            location.pathname.match(/profile/) ||
            location.pathname.match(/playlist/) ||
            location.pathname.match(/search/) ||
            location.pathname.match(/explore/) ||
            location.pathname.match(/login/)) && (
            <Route path="/" component={BottomNavigation} />
          )}
        </Container>
      </Suspense>
    </div>
  );
};

export default withRouter(CurrentSection);
