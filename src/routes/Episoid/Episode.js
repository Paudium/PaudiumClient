import React, { useContext } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../GlobalState/GlobalState";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
  },
}));
export default function Episode({ match }) {
  const classes = useStyles();
  const [{ currentPodcast }, dispatch] = useContext(GlobalContext);

  console.log("To find the episode id", match);

  let episodeId = match.params.episodeId;
  console.log("Episode id is ", episodeId);

  const { loading: loadingPod, error: errorPod, data: episode } = useQuery(
    GET_EPISODE,
    {
      variables: { episodeId },
    }
  );

  console.log("Query result", episode&&episode.getPodcast.title);

  return (
    <div className={classes.root}>
      <CardMedia
        component="img"
        alt={episode&&episode.getPodcast.title}
        image={episode&&episode.getPodcast.imageURL}
        title={episode&&episode.getPodcast.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          color="secondary"
          align="center"
        >
          {episode&&episode.getPodcast.title}
        </Typography>
        <Typography variant = "body1" color = "secondary">
        {episode&&episode.getPodcast.description}
        </Typography>
      </CardContent>
    </div>
  );
}

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
