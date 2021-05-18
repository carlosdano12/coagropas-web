import React from "react";

// Material ui core
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Material ui icons
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(2),
  },
}));

const CustomToolbar = (props) => {
  const { tooltip, onClick } = props;
  const classes = useStyles();
  return (
    <Tooltip title={tooltip} onClick={onClick}>
      <Fab size="small" color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};
export default CustomToolbar;
