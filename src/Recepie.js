import { ReactComponent as Clap } from "./clap.svg";
import React from "react";

function Recipie(props) {
  return (
    <li key={props.item.uuid}>
      {`${props.item.title} (${props.item.type}/${props.item.difficulty})`}
      <button onClick={() => props.onClap(props.item)}>
        <Clap /> {props.item.claps.length}
      </button>
    </li>
  );
}

export default Recipie;
