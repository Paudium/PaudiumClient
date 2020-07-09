import React, { useReducer, createContext} from "react";
import {MEDIA} from '../Const/MediaState';
import {ACTION} from '../Const/Action';

export const GlobalContext = createContext();


const initialState = {
  searchState: "home",
  searchResult: [],
  currentPodcast: {},
  currentPlayStatus:false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.setPodcast:
      return {
        ...state,
        currentPodcast: action.snippet,
      };
    case ACTION.setPlayerState:
      return{
        ...state,
        currentPlayStatus:action.snippet,
      }
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
