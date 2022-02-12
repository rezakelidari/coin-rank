import React, { useState } from "react";
import "./Coin.scss";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import convertPrice from "../../helper/convertPrice";
import Chart from "../../components/Chart";

export default function Coin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coinDetail, setCoinDetail] = useState({
    name: "",
    icon: "",
    desc: "",
    color: "",
    confirmed: false,
    volume: "",
    marketCap: "",
    price: "",
    change: "",
    rank: "",
    chart: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ state: false, messae: "" });

  useEffect(() => {
    !id && navigate("/");

    axios
      .get(`https://api.coinranking.com/v2/coin/${id}`)
      .then((response) => {
        setLoading(false);
        setError({ state: false, messae: "" });

        const data = response.data.data.coin;

        setCoinDetail({
          name: data.name,
          icon: data.iconUrl,
          color: data.color,
          confirmed: data.supply.confirmed,
          volume: data["24hVolume"],
          marketCap: data.marketCap,
          price: data.price,
          change: data.change,
          rank: data.rank,
          chart: data.sparkline,
        });
      })
      .catch((error) => {
        setLoading(false);
        setError({ state: true, messae: error.message });
      });
  }, []);

  return (
    <div className="coinMain">
      {!error.state & !loading ? (
        <div className="coinBanner">
          <div
            className="bg"
            style={{ backgroundColor: `${coinDetail.color}` }}
          ></div>
          <div className="header">
            <span className="rank">{coinDetail.rank}.</span>
            <div className="title">
              <img src={coinDetail.icon} alt="Icon" className="icon" />
              <h1 className="name">{coinDetail.name}</h1>
              <span className={`verify ${coinDetail.confirmed && "show"}`}>
                Verified
              </span>
            </div>
          </div>

          <div className="price">
            <span className="title">Price:</span>$
            {convertPrice(coinDetail.price)}{" "}
            <span
              className={`change ${
                coinDetail.change > 0
                  ? "rise"
                  : coinDetail.change < 0
                  ? "descent"
                  : ""
              }`}
            >
              {coinDetail.change}%
            </span>
          </div>
          <div className="coinTranDetail">
            <div className="detail">
              24H Volume:
              <span className="value">{convertPrice(coinDetail.volume)}</span>
            </div>
            <div className="detail">
              Market Cap:
              <span className="value">
                {convertPrice(coinDetail.marketCap)}
              </span>
            </div>
          </div>

          <div className="chart">
            {coinDetail.chart && <Chart data={coinDetail.chart} />}
          </div>
        </div>
      ) : null}

      {loading && <div className="loading">Loading ...</div>}
      {error.state && <div className="error">{error.messae}</div>}
    </div>
  );
}
