import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

import useCustomSnackbar from "components/useCustomSnackbar";
import useClientes from "hooks/useClientes";

export default function ClienteForm({
  handleCloseModal,
  handleOnSubmit,
  providerId,
  getAllClientes,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const nombre = useRef();
  const apellido = useRef();
  const documento = useRef();
  const telefono = useRef();
  const { getClienteById } = useClientes();
  const showNotification = useCustomSnackbar();

  const onSubmit = (data) => {
    setIsLoading(true);

    if (providerId) {
      data.id = providerId;
    }
    handleOnSubmit(data)
      .then(() => {
        showNotification("El cliente se guardo correctamente", "success");
        getAllClientes();
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
    if (providerId) {
      setIsLoading(true);
      getClienteById(providerId)
        .then((response) => {
          nombre.current.value = response.data.nombre;
          apellido.current.value = response.data.apellido;
          documento.current.value = response.data.documento;
          telefono.current.value = response.data.telefono;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [providerId]);

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
                name="apellido"
                label="Apellido"
                inputRef={apellido}
                autoComplete="apellido"
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
                inputRef={documento}
                autoComplete="documento"
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
                inputRef={telefono}
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
          onClick={() => {
            onSubmit({
              id: "",
              nombre: nombre.current.value,
              apellido: apellido.current.value,
              documento: documento.current.value,
              telefono: telefono.current.value,
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
