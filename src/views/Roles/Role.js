import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import useNiames from "hooks/useNiames";
import AsociadoForm from "components/organisms/AsociadoForm/AsociadoForm";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import useRole from "hooks/useRole";
import RolesList from "components/organisms/RolesList/RolesList";

export default function Role() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  const [roles, setRoles] = useState([]);
  //const { getNiames, addProvider, updateProvider } = useProvidersIM();
  const { getNiames, addNiame, updateNiame } = useNiames();
  const { getRoles } = useRole();

  const handleOnCloseModal = () => {
    setOpenModalEdit(false);
  };

  const getAllProviders = () => {
    setIsLoading(true);
    getNiames()
      .then((result) => {
        if (result) {
          setProviders(result);
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

  const saveNiame = (data) => {
    if (data.id) {
      return updateNiame(data);
    } else {
      return addNiame(data);
    }
  };

  const handleOnClickEditProvider = (warehouseId) => {
    setProviderId(warehouseId);
    setOpenModalEdit(true);
  };

  const addProviderButton = () => {
    setProviderId("");
    setOpenModalEdit(true);
  };

  useEffect(() => {
    getAllRoles();
    setProviders([
      {
        nombre: "Gabriel",
        apellido: "Atencia Gomez",
        telefono: "3013807818",
        documento: "1233456789",
      },
      {
        nombre: "Carlos",
        apellido: "Salazar",
        telefono: "7894520",
        documento: "1233456789",
      },
      {
        nombre: "Jose",
        apellido: "Morales",
        telefono: "78922645",
        documento: "1233456789",
      },
    ]);
  }, []);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Asignación de roles
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <RolesList
            handleOnClickEditProvider={handleOnClickEditProvider}
            addProviderButton={addProviderButton}
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
          <Autocomplete
            multiple
            id="tags-standard"
            options={roles}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Roles"
                placeholder="Roles"
              />
            )}
          />
        </ModalContainer>
      </Grid>
    </>
  );
}
