import React, { useEffect, useState } from "react";
import ModalContainer from "../../moleculas/ModalContainer";
import MuiTable from "../../moleculas/MuiTable";
import { Grid, TextField, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function ModalSolicitudTransporte({
  handleOpenModal,
  transporte,
  openModal,
  confirmar,
  getSolicitudes,
  isLoading,
}) {
  const [transporteDetalles, setTransporteDetalles] = useState([]);

  useEffect(() => {
    const detalles = JSON.parse(JSON.stringify(transporte));
    setTransporteDetalles(detalles.transporteDetalles);
  }, [transporte]);

  const options = {
    print: false,
    filter: false,
    count: transporte?.transporteDetalles?.lenght,
    serverSide: true,
    search: false,
    viewColumns: false,
    download: false,
    rowHover: true,
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: false,
    isRowSelectable: (dataIndex) => {
      return false;
    },
  };

  const columns = [
    {
      name: "",
      label: "",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
    // 3 date_created -> Fecha del pedido
    {
      name: "niame",
      label: "Ñame",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography>{value.nombre}</Typography>
        ),
      },
    },
    {
      name: "cantidad",
      label: "Cantidad",
    },
    {
      name: "recibido",
      label: "Recibido",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            type="number"
            value={value}
            onChange={(e) => {
              const detalles = [...transporteDetalles];
              detalles[tableMeta.rowIndex].recibido = Number(e.target.value);
              setTransporteDetalles(detalles);
              updateValue(e.target.value);
            }}
          />
        ),
      },
    },
  ];

  return (
    <ModalContainer
      open={openModal}
      onClose={() => handleOpenModal(false)}
      title="Detalles de la solicitud de compra"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Fecha"
            value={transporte.fechaSolicitud}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        {/* name order number with prefix */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="nota"
            value={transporte.nota}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <MuiTable
            title=""
            isLoading={isLoading}
            columns={columns}
            data={transporteDetalles}
            options={options}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container justify="center">
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: "10px", backgroundColor: "green" }}
              onClick={async () => {
                await confirmar(transporteDetalles);
                await getSolicitudes();
                handleOpenModal(false);
              }}
            >
              Confirmar
            </Button>
            <Button
              color="default"
              variant="contained"
              onClick={() => handleOpenModal(false)}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ModalContainer>
  );
}
