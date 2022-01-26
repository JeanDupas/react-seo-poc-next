import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styles from "./Table.module.css";
import { useRouter } from "next/router";

interface Props {
  rows: Array<any>;
}

const BasicTable: React.FC<Props> = ({ rows }) => {
  const navigate = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Market Cap Rank</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Price change 24h</TableCell>
            <TableCell align="right">Market cap</TableCell>
            <TableCell align="right">ATH</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={styles["table-row"]}
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => navigate.push(`/coin/${row.id}`)}
            >
              <TableCell component="th" scope="row">
                {row.market_cap_rank}
              </TableCell>
              <TableCell align="right" sx={{ alignItems: "center" }}>
                <div className={styles.cell}>
                  <img
                    src={row.image}
                    style={{ width: "20px", paddingRight: "6px" }}
                  />
                  <span className={styles.bold}>{row.name}</span>
                </div>
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.current_price)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.price_change_24h)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.market_cap)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.ath)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
