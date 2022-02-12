import React, { useEffect, useRef } from "react";
import "./MiniChart.scss";

export const STATUS_RISE = 0;
export const STATUS_DESCENT = 1;

export default function MiniChart({ data, status }) {
  const canvas = useRef();

  const GRAPH_TOP = 50;
  const GRAPH_BOTTOM = 35;
  const GRAPH_LEFT = 5;
  const GRAPH_RIGHT = 300;

  const GRAPH_HEIGHT = 500;
  const GRAPH_WIDTH = 400;

  useEffect(() => {
    const context = canvas.current.getContext("2d");

    const length = data.length;
    let largest = 0;

    for (const item in data) {
      data[item] > largest && (largest = data[item]);
    }

    context.clearRect(0, 0, 125, 35);

    context.strokeStyle =
      status === STATUS_RISE
        ? "#33ff33"
        : status === STATUS_DESCENT
        ? "#ff3333"
        : "#ffffff";
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(
      GRAPH_LEFT,
      GRAPH_HEIGHT - (data[0] / largest) * GRAPH_HEIGHT + GRAPH_TOP
    );
    for (const item in data) {
      context.lineTo(
        (GRAPH_RIGHT / length) * item + GRAPH_LEFT,
        GRAPH_HEIGHT - (data[item] / largest) * GRAPH_HEIGHT + GRAPH_TOP
      );
    }
    context.stroke();
  }, []);

  return (
    <canvas
      className="miniChartMain"
      ref={canvas}
      height={125}
      width={300}
    ></canvas>
  );
}
