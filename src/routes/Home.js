import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Container from '@material-ui/core/Container'

export default function Home() {
  const history = useHistory();
  return (
    <div>
      Home Page
      <Container>
        <Button variant = "contained" color = "secondary" onClick={() => history.push("/podcast")}>Go to podcast</Button>
      </Container>
    </div>
  );
}
