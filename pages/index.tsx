import React, { useEffect, useState } from "react";

import { CircularProgress, Container, Grid } from "@mui/material";

import Header from "../components/header/Header";
import Table from "../components/table/Table";
import { API_HOST, COINS_LIST } from "../utils/constants";
import Head from "next/head";

export async function getStaticProps(context: any) {
  const res = await fetch(`${API_HOST}${COINS_LIST}`);
  const data = await res.json();

  return {
    props: {
      coins: data,
    }, // will be passed to the page component as props
  };
}

function Index({ coins: serverCoins, date: serverDate }: any) {
  const [coins, setCoins] = useState(serverCoins);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(coins[0].last_updated);

  const regex = new RegExp(search, "i");

  useEffect(() => {
    const timer = setTimeout(
      () =>
        fetch(`${API_HOST}${COINS_LIST}`)
          .then((res) => res.json())
          .then(function (result) {
            setDate(new Date());
            setLoading(false);
            setCoins(result);
          }),
      10000
    );

    return () => clearTimeout(timer);
  }, []);

  const filteredCoins = search
    ? coins.filter((c: any) => regex.test(c.name))
    : coins;

  return (
    <div className="main-container">
      <Head>
        <title>Voici la liste !</title>
        <meta name="description" content="La description de la liste" />
      </Head>
      <Header onChange={setSearch} />
      {loading && (
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", flex: 1 }}
        >
          <CircularProgress size={100} />
        </Grid>
      )}
      <Container sx={{ padding: "12px 0" }}>
        {!loading && (
          <>
            <Grid
              item
              container
              xs={12}
              justifyContent="flex-end"
              sx={{ padding: "6px 0" }}
            >
              {date &&
                `Update date - ${new Date(
                  date
                ).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}
            </Grid>
            <Grid>{filteredCoins && <Table rows={filteredCoins} />}</Grid>
          </>
        )}
      </Container>
    </div>
  );
}

export default Index;
