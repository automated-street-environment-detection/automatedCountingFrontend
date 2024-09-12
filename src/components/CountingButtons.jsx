/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAction } from "../redux/undoSlice";
import { incrementCount } from "../redux/countsSlice";

const CountingButtons = ({ name, currTime }) => {
  const dispatch = useDispatch();
  // const [value, setValue] = useState(0);
  const value = useSelector((state) => state.counts.counts)[name];

  const buttonClick = () => {
    dispatch(incrementCount(name));
    console.log(`Clicked button at ${currTime}}`);
    dispatch(addAction([name, currTime]));
  };

  return (
    <div>
      <Button onClick={buttonClick}>{name}</Button>
      <h1>{value ? value : 0}</h1>
    </div>
  );
};

export default CountingButtons;
