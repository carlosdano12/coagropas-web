import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import AsociadoForm from "components/organisms/AsociadoForm/AsociadoForm";
import AsociadoList from "components/organisms/AsociadoList/AsociadoList";
import useAsociados from "hooks/useAsociados";

export default function AsociadoRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [asociadoId, setasociadoId] = useState("");
  const [asociados, setAsociados] = useState([]);
  //const { getNiames, addProvider, updateProvider } = useProvidersIM();
  const { getAsociados, addAsociado, updateAsociado } = useAsociados();

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

  const saveAsociado = (data) => {
    if (data.id_asociado) {
      return updateAsociado(data);
    } else {
      return addAsociado(data);
    }
  };

  const handleOnClickEditProvider = (asociadoId) => {
    setasociadoId(asociadoId);
    setOpenModalEdit(true);
  };

  const addProviderButton = () => {
    setasociadoId("");
    setOpenModalEdit(true);
  };

  useEffect(() => {
    getAllAsociados();
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
            asociados={asociados}
            isLoading={isLoading}
            titleBtn="Editar"
          />
        </Grid>

        <ModalContainer
          title="Crear asociado"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <AsociadoForm
            handleCloseModal={handleOnCloseModal}
            handleOnSubmit={saveAsociado}
            asociadoId={asociadoId}
            getAllAsociados={getAllAsociados}
          />
        </ModalContainer>
      </Grid>
    </>
  );
}
