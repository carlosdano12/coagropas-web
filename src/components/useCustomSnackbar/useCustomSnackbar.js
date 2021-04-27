import React, { useEffect } from "react"; // Fragment,
import { useSnackbar } from "notistack";

// Material ui core
import IconButton from "@material-ui/core/IconButton";

// Material ui icons
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  icon: {
    fontSize: 20,
  },
}));

const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = styles();
  useEffect(() => () => {}, []);

  const action = (key) => (
    <>
      <IconButton
        color="inherit"
        aria-label="cerrar toast"
        onClick={() => {
          closeSnackbar(key);
        }}
        size="small"
      >
        <CloseIcon className={classes.icon} />
      </IconButton>
    </>
  );

  const showNotistack = (message, variant = "success") => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      action,
    });
  };
  return showNotistack;
};
export default useCustomSnackbar;
