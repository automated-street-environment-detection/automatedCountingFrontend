// import { useState } from "react";
import CountingButtons from "../components/CountingButtons";
import { useSelector } from "react-redux";
import UndoButton from "./UndoButton.jsx";
import SaveButton from "./SaveBotton.jsx";
import Grid from "@mui/material/Grid2";
import AddVechileType from "./AddVechileType.jsx";
import { useEffect, useState } from "react";
import RemoveCategory from "./RemoveCategory.jsx";

const CountingControl = () => {
  const playerTime = useSelector((state) => state.player.playerTime);
  const values = useSelector((state) => state.counts.objects);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={12}>
        <h2>Counting Controls</h2>
      </Grid>
      <Grid size={6}>
        <AddVechileType values={values} />
      </Grid>
      <Grid size={6}>
        <RemoveCategory values={values} />
      </Grid>
      {/* <CountingButtons name="Test" currTime={playerTime} /> */}
      {values.map((value, index) => (
        <CountingButtons key={index} name={value} currTime={playerTime} />
      ))}
      <Grid size={6}>
        <UndoButton />
      </Grid>
      <SaveButton />
    </Grid>
  );
};

export default CountingControl;
