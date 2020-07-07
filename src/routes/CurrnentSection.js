import React, { useContext, useEffect, useState, lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  withRouter,
  Link,
  Switch,
  Route,
} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { GlobalContext } from "../GlobalState/GlobalState";

import MainPlayer from "../routes/Player";
import Episode from "../routes/Episoid/Episode";
import Podcast from "./Podcast/Podcasts";
import Episodes from './Episodes';
import EpisodeSection from "../routes/Episoid/EpisoidSection";
import { Container } from "@material-ui/core";
import NavBar from "../components/NavBar/MediaTopBar/index";
import Test from "../routes/test";

const Login = lazy(() => import("./Login"));
const HomePage = lazy(() => import("./Home"));


const returnMainPlayer = (props) => {
  // we will return the main player if the path is not the "/"

  if (window.location.pathname !== "/") {
    return <MainPlayer {...props} />;
  } else {
    return null;
  }
};

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
  return (
    <div>
      <Suspense fallback={circularLoader}>
        <NavBar />

        <Container maxWidth="sm">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/episode/:episodeId" component={Episode} />
            <Route exact path="/episodesection" component={EpisodeSection} />
            <Route exact path = "/episodes" component = {Episodes} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/podcast" component={Podcast} />
          </Switch>
          <Route path="/" render={(props) => returnMainPlayer(props)} />
        </Container>
      </Suspense>
    </div>
  );
};

export default withRouter(CurrentSection);
