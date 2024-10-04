// import { useState } from "react";
import CountingButtons from "../components/CountingButtons";
import { useSelector } from "react-redux";
import UndoButton from "./UndoButton.jsx";
import SaveButton from "./SaveBotton.jsx";
import Grid from "@mui/material/Grid2";
import AddVechileType from "./AddVechileType.jsx";

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
    <Grid container spacing={2} alignItems="center">
      <Grid size={12}>
        <h2>Counting Controls</h2>
      </Grid>
      <AddVechileType values={values} />
      {/* <CountingButtons name="Test" currTime={playerTime} /> */}
      {values.map((value, index) => (
        <CountingButtons key={index} name={value} currTime={playerTime} />
      ))}
      <UndoButton />
      <SaveButton />
    </Grid>
  );
};

export default CountingControl;
