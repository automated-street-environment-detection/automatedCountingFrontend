// import { useState } from "react";
import CountingButtons from "../components/CountingButtons";
import { useSelector } from "react-redux";

const CountingControl = () => {
  const playerTime = useSelector((state) => state.player.playerTime);
  const values = [
    "E-bikes",
    "Motorbikes",
    "Cars (personal)",
    "Busses",
    "Trucks",
    "Cars (Commercial)",
    "Vans/Minibuses",
    "Cyclos",
  ];
  return (
    <div className="counting-buttons">
      <div>Counting</div>
      <CountingButtons name="Test" currTime={playerTime} />
      {values.map((value, index) => (
        <CountingButtons key={index} name={value} currTime={playerTime} />
      ))}
    </div>
  );
};

export default CountingControl;
