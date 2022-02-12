import React, { useEffect, useState } from "react";
import axios from "axios";
import convertPrice from "../../helper/convertPrice";

import "./Home.scss";
import MiniChart, {
  STATUS_RISE,
  STATUS_DESCENT,
} from "../../components/Minichart";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ state: false, message: "" });
  const [coins, setCoins] = useState([]);
  const [coinsData, setCoinsData] = useState({});

  useEffect(() => {
    axios
      .get("https://api.coinranking.com/v2/coins", {
        "x-access-token":
          "coinranking2182412c1e6d5415a9047e74441289fe8b8650649ac5fa3e",
        "Access-Control-Allow-Origin": "*",
      })
      .then((response) => {
        setLoading(false);
        setError({ state: false, message: "" });
        console.log(response.data.data);
        setCoins(response.data.data.coins);
        setCoinsData(response.data.data.stats);
      })
      .catch((error) => {
        setLoading(false);
        setError({ state: true, message: error.message });
      });
  }, []);

  return (
    <div className="homeMain">
      <section className="header">
        <h3>All cryptocurrency prices</h3>
        {!error.state & !loading ? (
          <div className="coinsData">
            <div className="data">
              Total Coins:
              <span className="value">{coinsData.totalCoins}</span>
            </div>
            <div className="data">
              Total Markets:
              <span className="value">{coinsData.totalMarkets}</span>
            </div>
            <div className="data">
              Total Market Cap:
              <span className="value">
                ${convertPrice(coinsData.totalMarketCap)}
              </span>
            </div>
          </div>
        ) : null}
      </section>

      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <CoinsList list={coins} />
      )}
      {error.state && <div className="error">{error.message}</div>}
    </div>
  );
}

function CoinsList({ list }) {
  return (
    <div className="coinsListSection">
      <div className="listHeader">
        <span>Crypto Name</span>
        <span>Price</span>
        <span>Market Cap</span>
        <span>24H</span>
      </div>
      <ul className="coinsList">
        {list.map((item) => {
          return (
            <li key={item.name} className="coin">
              <div className="title">
                <img src={item.iconUrl} alt="Icon" className="coinIcon" />

                <h3 className="coinTitle">
                  <div className="coinName">{item.name}</div>
                  <span className="coinSymbol">{item.symbol}</span>
                </h3>
              </div>

              <div className="coinPrice">${convertPrice(item.price)}</div>

              <div className="coinMC">${convertPrice(item.marketCap)}</div>

              <div className="coinChart">
                <span
                  className={`coinChange ${
                    item.change > 0 ? "rise" : "descent"
                  }`}
                >
                  {item.change}%
                </span>
                <MiniChart
                  data={item.sparkline}
                  status={item.change > 0 ? STATUS_RISE : STATUS_DESCENT}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
