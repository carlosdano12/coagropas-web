import React, { useState } from "react";
import ModalContainer from "../../moleculas/ModalContainer";
import MuiTable from "../../moleculas/MuiTable";
import { Grid, TextField, Typography } from "@material-ui/core";

export default function ModalSolicitudCompra({
  handleOpenModal,
  solicitudCompra,
  openModal,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    print: false,
    filter: false,
    count: solicitudCompra?.compraDetalles?.lenght,
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
      name: "insumo",
      label: "Insumo",
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
            label="fecha"
            value={solicitudCompra.fechaSolicitud}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        {/* name order number with prefix */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="nota"
            value={solicitudCompra.nota}
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
            data={solicitudCompra.compraDetalles}
            options={options}
          />
        </Grid>
      </Grid>
    </ModalContainer>
  );
}
