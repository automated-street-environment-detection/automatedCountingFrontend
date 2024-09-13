import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popAction } from "../redux/undoSlice";
import { undoCount } from "../redux/countsSlice";
import { setPlayerTime } from "../redux/playerSlice";

const UndoButton = () => {
  const dispatch = useDispatch();
  const lastAction = useSelector((state) => state.undo.lastAction);
  // const playerTime = useSelector((state) => state.player.playerTime);
  const onClick = () => {
    dispatch(popAction());
    if (lastAction) {
      dispatch(undoCount(lastAction[0]));
      dispatch(setPlayerTime(lastAction[1]));
    }
    // const [value, currTime] = lastAction;
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      Undo
    </Button>
  );
};

export default UndoButton;
