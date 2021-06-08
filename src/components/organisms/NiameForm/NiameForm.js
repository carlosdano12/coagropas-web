import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import useCustomSnackbar from "components/useCustomSnackbar";
import useNiames from "hooks/useNiames";

export default function NiameForm({
  handleCloseModal,
  handleOnSubmit,
  niameId,
  getAllProviders,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const showNotification = useCustomSnackbar();
  const nombre = useRef();
  const precio = useRef();
  const cantidad = useRef();
  //const { getProviderById } = useProvidersIM();
  const { getNiameById } = useNiames();

  const onSubmit = (data) => {
    setIsLoading(true);

    if (niameId) {
      data.id_niame = niameId;
    }
    handleOnSubmit(data)
      .then(() => {
        showNotification("El ñame se guardo correctamente", "success");
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
    if (niameId) {
      setIsLoading(true);
      getNiameById(niameId)
        .then((response) => {
          nombre.current.value = response.data.nombre;
          precio.current.value = response.data.precio;
          cantidad.current.value = response.data.cantidad;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [niameId]);

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
            <Grid item xs={8}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                inputRef={precio}
                name="precio"
                label="Precio"
                autoComplete="precio"
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={cantidad}
                required
                fullWidth
                id="cantidad"
                label="Cantidad"
                name="cantidad"
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
            onSubmit({
              id_niame: 0,
              nombre: nombre.current.value,
              precio: Number(precio.current.value),
              cantidad: Number(cantidad.current.value),
            });
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
