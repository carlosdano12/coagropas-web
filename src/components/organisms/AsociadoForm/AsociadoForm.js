import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

import useCustomSnackbar from "components/useCustomSnackbar";

export default function AsociadoForm({
  handleCloseModal,
  handleOnSubmit,
  providerId,
  getAllProviders,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { showNotistack } = useCustomSnackbar();
  //const { getProviderById } = useProvidersIM();

  const onSubmit = (data) => {
    setIsLoading(true);

    if (providerId) {
      data.id = providerId;
    }
    handleOnSubmit(data)
      .then((response) => {
        if (response === true) {
          showNotistack({ message: "El proveedor se guardó correctamente" });
          getAllProviders();
          handleCloseModal();
        } else {
          showNotistack({ message: "Ocurrió un error" });
        }
      })
      .catch((err) => {
        console.log(err.reponse?.data);
        showNotistack({ message: "Ocurrió un error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   useEffect(() => {
  //     if (providerId) {
  //       setIsLoading(true);
  //       getProviderById(providerId)
  //         .then((resultCategory) => {
  //           reset(resultCategory);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     }
  //   }, [providerId]);

  return (
    <form noValidate>
      <Grid container direction="row" spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={12}>
          <Grid container direction="row" spacing={2} justify="center">
            <Grid item xs={8}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="name"
                label="Nombre"
                autoComplete="name"
                autoFocus
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="apellido"
                label="Apellido"
                autoComplete="precio"
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="documento"
                label="Documento"
                autoComplete="precio"
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cantidad"
                label="Telefono"
                name="telefono"
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ marginTop: 20 }}
        >
          {isLoading ? <CircularProgress size={24} /> : ""} Guardar
        </Button>
        <Button
          variant="contained"
          color="default"
          disabled={isLoading}
          style={{ marginTop: 20, marginLeft: 20 }}
          onClick={handleCloseModal}
        >
          {isLoading ? <CircularProgress size={24} /> : ""} Cancelar
        </Button>
      </Grid>
    </form>
  );
}
