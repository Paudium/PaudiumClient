import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { GlobalState } from "./GlobalState/GlobalState";
import Episode from "./routes/Episoid/EpisoidSection";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CurrentSection from "./routes/CurrnentSection";

const client = new ApolloClient({
  uri: "http://localhost:5000/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalState>
        <Router>
          <CurrentSection />
        </Router>
      </GlobalState>
    </ApolloProvider>
  );
}

export default App;