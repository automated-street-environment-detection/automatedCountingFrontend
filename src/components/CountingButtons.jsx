/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAction } from "../redux/undoSlice";
import { incrementCount, incrementTimeStamp } from "../redux/countsSlice";
import Grid from "@mui/material/Grid2";

const CountingButtons = ({ name, currTime }) => {
  const dispatch = useDispatch();
  // const [value, setValue] = useState(0);
  const value = useSelector((state) => state.counts.counts)[name];
  const buttonClick = () => {
    dispatch(incrementCount(name));
    dispatch(incrementTimeStamp({ type: name, timestamp: currTime })); 
    console.log(`Clicked button at ${currTime}}`);
    dispatch(addAction([name, currTime]));
  };

  return (
    <>
      <Grid size={8}>
        <Button variant="contained" onClick={buttonClick} fullWidth>
          {name}
        </Button>
      </Grid>
      <Grid size={4}>
        <div>{value ? value : 0}</div>
      </Grid>
    </>
  );
};

export default CountingButtons;
