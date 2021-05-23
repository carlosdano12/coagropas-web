import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import useNiames from "hooks/useNiames";
import AsociadoForm from "components/organisms/AsociadoForm/AsociadoForm";
import AsociadoList from "components/organisms/AsociadoList/AsociadoList";

export default function Asociado() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  //const { getNiames, addProvider, updateProvider } = useProvidersIM();
  const { getNiames, addNiame, updateNiame } = useNiames();

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
    //getAllProviders();
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
            Gestión de asociados
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <AsociadoList
            handleOnClickEditProvider={handleOnClickEditProvider}
            addProviderButton={addProviderButton}
            providers={providers}
            isLoading={isLoading}
          />
        </Grid>

        <ModalContainer
          title="Crear asociado"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <AsociadoForm
            handleCloseModal={handleOnCloseModal}
            handleOnSubmit={saveNiame}
            providerId={providerId}
            getAllProviders={getAllProviders}
          />
        </ModalContainer>
      </Grid>
    </>
  );
}
