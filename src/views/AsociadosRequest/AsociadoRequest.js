import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import useAsociados from "hooks/useAsociados";
import AsociadoRequestList from "components/organisms/AsociadoRequestList/AsociadoRequestList";
import AsociadoRequestForm from "components/organisms/AsociadoRequestForm/AsociadoRequestForm";

export default function AsociadoRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [asociadoId, setasociadoId] = useState("");
  const [asociados, setAsociados] = useState([]);
  //const { getNiames, addProvider, updateProvider } = useProvidersIM();
  const {
    getAsociadosRequest,
    addAsociadoRequest,
    updateAsociadoRequest,
  } = useAsociados();

  const handleOnCloseModal = () => {
    setOpenModalEdit(false);
  };

  const getAllAsociados = () => {
    setIsLoading(true);
    getAsociadosRequest()
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
    if (data.id) {
      return updateAsociadoRequest(data);
    } else {
      return addAsociadoRequest(data);
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
            Gestión de solicitudes de asociados
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <AsociadoRequestList
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
          <AsociadoRequestForm
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
