import React from "react";
import {
  Dialog,
  useTheme,
  DialogTitle,
  useMediaQuery,
  DialogContent,
} from "@material-ui/core";

const ModalContainer = (props) => {
  const {
    open,
    onClose,
    title,
    children,
    maxWidth,
    disableBackdropClick,
    disableEscapeKeyDown,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        onClose={onClose}
        open={open}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent dividers style={{ paddingBottom: 40 }}>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalContainer;
