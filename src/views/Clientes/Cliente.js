import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ModalContainer from "components/moleculas/ModalContainer";
import ClienteForm from "components/organisms/ClienteForm/ClienteForm";
import ClienteList from "components/organisms/ClienteList/ClienteList";
import useClientes from "hooks/useClientes";

export default function Cliente() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [clientes, setClientes] = useState([]);
  const { getClientes, addCliente, updateCliente } = useClientes();

  const handleOnCloseModal = () => {
    setOpenModalEdit(false);
  };

  const getAllClientes = () => {
    setIsLoading(true);
    getClientes()
      .then((result) => {
        if (result) {
          setClientes(result);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveCliente = (data) => {
    if (data.id) {
      return updateCliente(data);
    } else {
      return addCliente(data);
    }
  };

  const handleOnClickEditProvider = (clienteId) => {
    setProviderId(clienteId);
    setOpenModalEdit(true);
  };

  const addProviderButton = () => {
    setProviderId("");
    setOpenModalEdit(true);
  };

  useEffect(() => {
    getAllClientes();
  }, []);

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Gestión de clientes
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <ClienteList
            handleOnClickEditProvider={handleOnClickEditProvider}
            addProviderButton={addProviderButton}
            clientes={clientes}
            isLoading={isLoading}
          />
        </Grid>

        <ModalContainer
          title="Crear cliente"
          open={openModalEdit}
          onClose={handleOnCloseModal}
        >
          <ClienteForm
            handleCloseModal={handleOnCloseModal}
            handleOnSubmit={saveCliente}
            providerId={providerId}
            getAllClientes={getAllClientes}
          />
        </ModalContainer>
      </Grid>
    </>
  );
}
