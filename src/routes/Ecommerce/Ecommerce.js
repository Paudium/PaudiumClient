import React from "react";
import { Typography } from "@material-ui/core";
import ecommerceData from "./ecommerce.json";
import Product from "./product";
import CourseProduct from "./OnlineCourse";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";


export default function Ecommerce() {
  return (
    <div>
      <Box mt={5}>
        <Grid container justify="space-between">
          <Typography color="secondary">Audio Books</Typography>
          <Typography color="secondary">See All</Typography>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Product product={ecommerceData.product1} />
          </Grid>
          <Grid item xs={6}>
            <Product product={ecommerceData.product2} />
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="space-between">
        <Typography color="secondary">Online Course</Typography>
        <Typography color="secondary">See All</Typography>
        <Grid item xs={12}>
          <CourseProduct />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Typography color="secondary">Products</Typography>
        <Typography color="secondary">See All</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Product product={ecommerceData.product3} />
        </Grid>
        <Grid item xs={6}>
          <Product product={ecommerceData.product4} />
        </Grid>
      </Grid>
    </div>
  );
}
