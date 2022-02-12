import React from "react";
import "./Coin.scss";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Coin() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    !id && navigate("/");
  }, []);

  return <div>Coin {id}</div>;
}
