import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import InsumoList from "components/organisms/InsumoList/InsumoList";
import InsumoForm from "components/organisms/InsumoForm/InsumoForm";
import useInsumos from "hooks/useInsumos";

export default function Insumo() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  const { getInsumos, addInsumo, updateInsumo } = useInsumos();

  const handleOnCloseModal = () => {
    setOpenModalEdit(false);
  };

  const getAllProviders = () => {
    setIsLoading(true);
    getInsumos()
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
      return updateInsumo(data);
    } else {
      return addInsumo(data);
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
    getAllProviders();
  }, []);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Gestión de insumos
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <InsumoList
            handleOnClickEditProvider={handleOnClickEditProvider}
            addProviderButton={addProviderButton}
            providers={providers}
            isLoading={isLoading}
          />
        </Grid>

        <ModalContainer
          title="Crear insumo"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <InsumoForm
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
