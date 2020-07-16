import React, { useReducer, createContext } from "react";
import { MEDIA } from "../Const/MediaState";
import { ACTION } from "../Const/Action";
import { PLAYER_SIZE } from "../Const/PlayerSize";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const GlobalContext = createContext();

const initialState = {
  searchState: "home",
  searchResult: [],
  currentPodcast: {},
  currentPlayStatus: false,
  currentPlayerSize: PLAYER_SIZE.MAXIMIZE,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.setPodcast:
      return {
        ...state,
        currentPodcast: action.snippet,
      };
    case ACTION.setPlayerState:
      return {
        ...state,
        currentPlayStatus: action.snippet,
      };
    case ACTION.setPlayerSize:
      return {
        ...state,
        currentPlayerSize: action.snippet,
      };
  }
};

export const GlobalState = (props) => {
  const globalState = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const GET_EPISODE = gql`
  query($episodeId: ID!) {
    getPodcast(podcastId: $episodeId) {
      id
      title
      imageURL
      audioURL
      description
    }
  }
`;
