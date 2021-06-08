import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import NiameList from "components/organisms/NiameList/NiameList";
import useNiames from "hooks/useNiames";
import NiameForm from "components/organisms/NiameForm/NiameForm";

export default function Niame() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [niameId, setNiameId] = useState("");
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
    if (data.id_niame) {
      return updateNiame(data);
    } else {
      return addNiame(data);
    }
  };

  const handleOnClickEditProvider = (niameId) => {
    setNiameId(niameId);
    setOpenModalEdit(true);
  };

  const addProviderButton = () => {
    setNiameId("");
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
            Gestión de Tipos de ñame
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
          title="Crear tipo de ñame"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <NiameForm
            handleCloseModal={handleOnCloseModal}
            handleOnSubmit={saveNiame}
            niameId={niameId}
            getAllProviders={getAllProviders}
          />
        </ModalContainer>
      </Grid>
    </>
  );
}
