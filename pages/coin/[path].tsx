import React, { useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";

import Header from "components/header/Header";
import { API_HOST, COINS_DETAIL } from "utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const { params, res } = context;
  const { path } = params;
  const data = await getData(path);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coin: data,
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

  useEffect(() => {
    const id = setInterval(async () => {
      const data = await getData(path);
      if (data) {
        setCoin(coin);
      }
    }, 60000);
    return () => clearInterval(id);
  }, [path]);

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
          {last_updated && date &&
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
