import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import NiameList from "components/organisms/NiameList/NiameList";
import useNiames from "hooks/useNiames";

export default function Niame() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  //const { getNiames, addProvider, updateProvider } = useProvidersIM();
  const { getNiames } = useNiames();

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

  // const saveProvider = (data) => {
  //   if (data.id) {
  //     return updateProvider(data);
  //   } else {
  //     return addProvider(data);
  //   }
  // };

  const handleOnClickEditProvider = (warehouseId) => {
    setProviderId(warehouseId);
    setOpenModalEdit(true);
  };

  const addProviderButton = () => {
    setProviderId("");
    setOpenModalEdit(true);
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Gestión de Proveedores
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <NiameList
            handleOnClickEditProvider={handleOnClickEditProvider}
            addProviderButton={addProviderButton}
            providers={providers}
            isLoading={isLoading}
          />
        </Grid>

        <ModalContainer
          title="Crear proveedor"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        ></ModalContainer>
      </Grid>
    </>
  );
}
