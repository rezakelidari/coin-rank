import React, { useEffect, useRef } from "react";

export default function Chart({ data }) {
  const canvas = useRef();

  let GRAPH_TOP = 100;
  const GRAPH_BOTTOM = 500;
  const GRAPH_LEFT = 0;
  const GRAPH_RIGHT =
    window.screenX > 0 ? window.screenX - 25 : window.screen.availWidth - 50;

  const GRAPH_HEIGHT = 1000;
  const GRAPH_WIDTH = 400;

  const length = data.length;

  let largest = 0;
  for (const item in data) {
    data[item] > largest && (largest = data[item]);
  }

  let smallest = largest;
  for (const item in data) {
    data[item] < smallest && (smallest = data[item]);
  }

  GRAPH_TOP =
    ((largest / smallest) * 50 - 50) * 10 > 75
      ? 25
      : ((largest / smallest) * 50 - 50) * 10 > 50
      ? 50
      : ((largest / smallest) * 50 - 50) * 10 > 25
      ? 75
      : 100;
  console.log(
    ((largest / smallest) * 50 - 50) * 10 > 75
      ? 25
      : ((largest / smallest) * 50 - 50) * 10 > 50
      ? 50
      : ((largest / smallest) * 50 - 50) * 10 > 25
      ? 75
      : 100
  );
  console.log(((largest / smallest) * 50 - 50) * 10);

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, GRAPH_RIGHT, GRAPH_HEIGHT);

    context.strokeStyle = "#00aaff";
    context.lineWidth = 2;
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
      className="chartMain"
      ref={canvas}
      height={200}
      width={885}
    ></canvas>
  );
}
