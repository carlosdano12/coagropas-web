import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import useRole from "hooks/useRole";
import RolesList from "components/organisms/RolesList/RolesList";
import useAsociados from "hooks/useAsociados";
import useCustomSnackbar from "components/useCustomSnackbar";

export default function Role() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [asociado, setAsociado] = useState("");
  const [providers, setAsociados] = useState([]);
  const [rolesAsocido, setRolesAsociado] = useState([]);
  const showNotification = useCustomSnackbar();
  const [roles, setRoles] = useState([]);
  const { getAsociados, updateRoles } = useAsociados();
  const { getRoles } = useRole();
  const handleOnCloseModal = () => {
    setOpenModalEdit(false);
  };

  const getAllAsociados = () => {
    setIsLoading(true);
    getAsociados()
      .then((result) => {
        if (result) {
          setAsociados(result);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getAllRoles = () => {
    setIsLoading(true);
    getRoles()
      .then((result) => {
        if (result) {
          setRoles(result);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const save = (data) => {
    setIsLoading(true);
    updateRoles(data)
      .then(() => {
        showNotification("Los roles se guardaron correctamente", "success");
        getAllAsociados();
        handleOnCloseModal();
      })
      .catch((err) => {
        console.log(err.reponse?.data);
        showNotification("Ocurrió un error", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnClickEditProvider = (asociado) => {
    setAsociado(asociado);
    setRolesAsociado(asociado.roles);
    setOpenModalEdit(true);
  };

  useEffect(() => {
    getAllRoles();
    getAllAsociados();
  }, []);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Asignación de roles
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <RolesList
            handleOnClickEditProvider={handleOnClickEditProvider}
            asociados={providers}
            isLoading={isLoading}
            titleBtn="Roles"
          />
        </Grid>

        <ModalContainer
          title="Asignar roles"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <Grid container direction="row" spacing={2} justify="center">
            <Grid item xs={12} sm={12} md={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={roles}
                getOptionLabel={(option) => option.nombre}
                value={rolesAsocido}
                onChange={(e, data) => {
                  setRolesAsociado(data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Roles"
                    placeholder="Roles"
                  />
                )}
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              style={{ marginTop: 20 }}
              onClick={() => {
                save({ id: asociado.id, roles: rolesAsocido });
              }}
            >
              Guardar
            </Button>
          </Grid>
        </ModalContainer>
      </Grid>
    </>
  );
}
