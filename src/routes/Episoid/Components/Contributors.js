import React from "react";
import Typography from "@material-ui/core/Typography";
import Contributor from "./Contributor";

const contributors = [
  {
    id: 1,
    name: "Djon_samiro",
    timeStamp: "03:30",
    note:
      "Andrew Wilkinson's love for food  inspired him to open a pizza restaurant in New York with a couple of friends. ",
    rate: 5125,
  },
  {
    id: 2,
    name: "Oleg_domin",
    timeStamp: "03:30",
    note:
      "Andrew Wilkinson's love for food  inspired him to open a pizza restaurant in New York with a couple of friends. ",
    rate: 4125,
  },
  {
    id: 3,
    name: "Djon_samiro",
    timeStamp: "03:30",
    note:
      "Andrew Wilkinson's love for food  inspired him to open a pizza restaurant in New York with a couple of friends. ",
    rate: 361,
  },
];
export default function Contributors() {
  return (
    <div>
      <Typography>Contributors</Typography>
      {contributors.map((contributor) => (
        <div>
          <Contributor contributor={contributor} key={contributor.id} />
        </div>
      ))}
    </div>
  );
}
