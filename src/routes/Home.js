import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";

export default function Home() {
  const history = useHistory();
  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <Grid container justify = "center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push("/podcast")}
          >
            Go to podcast
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
