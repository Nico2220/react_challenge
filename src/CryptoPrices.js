import React, { useState, useEffect } from "react";
import { cryptoData } from "./cryptoPricesData";

const CRYPTO_PRICES_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/cryptocurrencies";

/**
 * {
 *    hasNext : true,
 *    coins :[
 *        {
 *            name: "Monero",
 *            price: "$146",
 *            markeCap: "$22222"
 *
 *        }
 *    ]
 * }
 *
 */

export default function CryptoPrices() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetch(
      //     `${CRYPTO_PRICES_API_BASE_URL}?page=${page}`
      //   );
      //   const responseJson = await response.json();

      //   setData(responseJson);
      setData(cryptoData);
    };

    fetchData();
  }, [page]);

  if (!data) return null;

  return (
    <>
      <table>
        <caption>Crypto Prices</caption>
        <thead>
          <tr>
            <th>Coins</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {data.coins.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Back
      </button>
      <button
        disabled={!data.hasNext}
        onClick={() => {
          if (data.hasNext) {
            setPage(page + 1);
          }
        }}
      >
        Next
      </button>
    </>
  );
}
