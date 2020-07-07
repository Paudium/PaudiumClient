import React, { useReducer, createContext } from "react";

export const GlobalContext = createContext();

const initialState = {
  searchState: "home",
  searchResult: [],
  currentPodcast: {},
  currentPlayStatus:false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentPodcast":
      return {
        ...state,
        currentPodcast: action.snippet,
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
