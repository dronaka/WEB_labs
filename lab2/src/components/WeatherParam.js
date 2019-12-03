import React from "react";



export default function WeatherParam(props) {
  return (
    <div className="param">
      <div className="name">{props.name}</div>
      <div className="value">{props.value}</div>
    </div>
  );
}