import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
} from "@material-ui/core";

import useCustomSnackbar from "components/useCustomSnackbar";
import { InputLabel } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function AsociadoForm({
  handleCloseModal,
  handleOnSubmit,
  asociadoId,
  getAllAsociados,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const showNotification = useCustomSnackbar();
  const nombre = useRef();
  const apellido = useRef();
  const documento = useRef();
  const telefono = useRef();

  //const { getProviderById } = useProvidersIM();

  const onSubmit = (data) => {
    setIsLoading(true);

    if (asociadoId) {
      data.id_asociado = asociadoId;
    }
    handleOnSubmit(data)
      .then(() => {
        showNotification("El asociado se guardo correctamente", "success");
        getAllAsociados();
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

  //   useEffect(() => {
  //     if (asociadoId) {
  //       setIsLoading(true);
  //       getProviderById(asociadoId)
  //         .then((resultCategory) => {
  //           reset(resultCategory);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     }
  //   }, [asociadoId]);

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
                label="Nombre"
                inputRef={nombre}
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
                label="Apellido"
                inputRef={apellido}
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
                label="Telefono"
                inputRef={telefono}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
              </FormControl>
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
              id_asociado: "",
              nombre: nombre.current.value,
              apellido: apellido.current.value,
              documento: documento.current.value,
              contrasena: password,
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
