import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import useCustomSnackbar from "components/useCustomSnackbar";
import useInsumos from "hooks/useInsumos";

export default function InsumoForm({
  handleCloseModal,
  handleOnSubmit,
  insumoId,
  getAllProviders,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const nombre = useRef();
  const showNotification = useCustomSnackbar();
  //const { getProviderById } = useProvidersIM();
  const { getInsumoById } = useInsumos();

  const onSubmit = (data) => {
    setIsLoading(true);

    if (insumoId) {
      data.id = insumoId;
    }
    handleOnSubmit(data)
      .then(() => {
        showNotification("El insumo se guardo correctamente", "success");
        getAllProviders();
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err.reponse?.data);
        showNotification("Ocurrió un error", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (insumoId) {
      setIsLoading(true);
      getInsumoById(insumoId)
        .then((response) => {
          nombre.current.value = response.data.nombre;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [insumoId]);

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
                inputRef={nombre}
                autoComplete="name"
                autoFocus
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ marginTop: 20 }}
          onClick={() => {
            onSubmit({ id: 0, nombre: nombre.current.value });
          }}
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
