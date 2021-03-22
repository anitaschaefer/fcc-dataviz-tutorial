import React from "react";
import ReactDOM from "react-dom";
import { arc } from "d3";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 10;
const radius = centerY - strokeWidth / 2;

const eyeOffsetX = 110;
const eyeOffsetY = 50;
const eyeRadius = 35;

const mouthWidth = 12;
const mouthSize = 170;
const mouthAngle = 140;

function degreeToRadian(degree) {
  return (degree * Math.PI) / 180;
}

function calculateMouthAngles(position) {
  if (position == "start") {
    // 90° + (180° - mouthAngle) / 2
    return Math.PI / 2 + (Math.PI - degreeToRadian(mouthAngle)) / 2;
  } else if (position == "end") {
    // 270° - (180° - mouthAngle) / 2
    return (Math.PI * 3) / 2 - (Math.PI - degreeToRadian(mouthAngle)) / 2;
  } else {
    console.error("Invalid position parameter");
  }
}

const mouthArc = arc()
  .innerRadius(mouthSize)
  .outerRadius(mouthSize + mouthWidth)
  .startAngle(calculateMouthAngles("start"))
  .endAngle(calculateMouthAngles("end"));

const App = () => (
  <svg width={width} height={height}>
    <g transform={`translate(${centerX}, ${centerY})`}>
      <circle
        r={radius}
        fill="yellow"
        stroke="black"
        stroke-width={strokeWidth}
      />
      <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} fill="black" />
      <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} fill="black" />
      <path d={mouthArc()} />
    </g>
  </svg>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
