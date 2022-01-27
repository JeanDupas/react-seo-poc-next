import React, { useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";

import Header from "components/header/Header";
import { API_HOST, COINS_DETAIL } from "utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";
import cacheData from "memory-cache";

export async function getServerSideProps(context: any) {
  const { params, res } = context;
  const { path } = params;
  let cached = cacheData.get(path);

  if (!cached) {
    const data = await getData(path);

    if (data) {
      cacheData.put(path, data, 1000 * 10 * 60);
      cached = data;
    } else {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      coin: cached,
    },
  };
}

const getData = async (path: string | string[] | undefined) => {
  if (!path) {
    return null;
  }

  try {
    const res = await fetch(`${API_HOST}${COINS_DETAIL}/${path}`);
    return await res.json();
  } catch (e) {
    return null;
  }
};

type Props = {
  coin: any;
};

const Coin = ({ coin: initialCoin }: Props) => {
  const [coin, setCoin] = useState<any>(initialCoin);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const { path } = router.query;

  const { last_updated } = coin || {};
  const date = last_updated ? new Date(last_updated) : null;

  return (
    <div>
      <Header onChange={setSearch} />
      <Head>
        <title>{`${path} details !`}</title>
        <meta name="description" content={`This the details of ${path} !`} />
      </Head>
      <Container sx={{ padding: "12px 0" }}>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ padding: "6px 0" }}
        >
          {last_updated &&
            date &&
            `Update date - ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="h1">{coin && coin.name}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="h3">
            {coin && coin.market_data.current_price.usd} $
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="body1">
            <span
              dangerouslySetInnerHTML={{
                __html: coin && coin?.description?.en,
              }}
            ></span>
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Coin;
