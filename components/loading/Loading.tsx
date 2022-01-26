import React from "react";

import { CircularProgress, Grid } from "@mui/material";
import Header from "../header/Header";

const Coin = () => (
  <div style={{ flex: 1 }}>
    <Header onChange={() => {}} />
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", flex: 1, paddingTop: "300px" }}
    >
      <CircularProgress size={150} />
    </Grid>
  </div>
);

export default Coin;
