/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@mui/material";

const CountingButtons = ({ name, currTime }) => {
  const [value, setValue] = useState(0);
  const buttonClick = () => {
    setValue(value + 1);
    console.log(`Clicked button at ${currTime}}`);
  };

  return (
    <div>
      <Button onClick={buttonClick}>{name}</Button>
      <h1>{value}</h1>
    </div>
  );
};

export default CountingButtons;
