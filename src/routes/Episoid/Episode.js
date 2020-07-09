import React,{useContext} from "react";
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

  const { loading: loadingPod, error: errorPod, data: dataPod } = useQuery(
    GET_EPISODE
  );
  return (
    <div className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        width="50%"
        image="https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/14a43378-edb2-49be-8511-ab0d000a7030/d1b9612f-bb1b-4b85-9c0c-ab0d004ab37a/image.jpg?t=1589407970&size=Large"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          color="secondary"
          align="center"
        >
          {currentPodcast && currentPodcast.title}
        </Typography>
      </CardContent>
    </div>
  );
}

const GET_EPISODE = gql`
  {
    getPodcast(podcastId: "5f021cc65879be89246b2cbe") {
      id
      title
    }
  }
`;
