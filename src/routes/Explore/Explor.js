import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.scss";

import PodcastBusiness from "./Components/Podcast_Business.json";
import PodcastScience from "./Components/Podcast_Science.json";
import Podcasthealth from "./Components/Podcast_health.json";

import PodCastCard from "./Components/PodcastCard";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  appbar: {
    height: 46,
  },
  container:{
    marginTop:56,
  }
}));
// const {
//   loading: loadingPod,
//   error: errorPod,
//   data: dataPodBusiness,
// } = useQuery(GET_POSTGROUP);
// console.log("explore", PodcastBusiness.results);
export default function Explor() {
  const classes = useStyle();
  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <ToolBar>
          <Typography>Podcast</Typography>
        </ToolBar>
      </AppBar>
      <div className = {classes.container}>
        <Swiper spaceBetween={10} slidesPerView={3.3} freeMode>
          {PodcastBusiness.results.map((item, index) => (
            <SwiperSlide key={index}>
              <PodCastCard
                image={item.artworkUrl600}
                title={item.collectionName}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper spaceBetween={10} slidesPerView={3.3} freeMode>
          {PodcastScience.results.map((item, index) => (
            <SwiperSlide key={index}>
              <PodCastCard
                image={item.artworkUrl600}
                title={item.collectionName}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper spaceBetween={10} slidesPerView={3.3} freeMode>
          {Podcasthealth.results.map((item, index) => (
            <SwiperSlide key={index}>
              <PodCastCard
                image={item.artworkUrl600}
                title={item.collectionName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
