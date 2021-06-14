import React, { useState } from "react";
import ModalContainer from "../../moleculas/ModalContainer";
import MuiTable from "../../moleculas/MuiTable";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

export default function ModalCompraDetalle(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, compra, handleOpenModal } = props;

  const options = {
    print: false,
    filter: false,
    count: compra?.compraDetalles?.lenght,
    serverSide: true,
    search: false,
    viewColumns: false,
    download: false,
    rowHover: true,
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: false,
    onChangeRowsPerPage: (numberOfRows) => {},
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
    {
      name: "precio",
      label: "Precio",
    },
    {
      name: "total",
      label: "Total",
    },
  ];

  return (
    <ModalContainer
      open={openModal}
      onClose={() => handleOpenModal(false)}
      title="Detalles de la compra"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="fecha"
            value={compra.fechaCompra}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        {/* name order number with prefix */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="nota"
            value={compra.nota}
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
            data={compra.compraDetalles}
            options={options}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={10}>
          <Grid container justify="center">
            <Typography
              label="TOTAL"
              InputProps={{
                readOnly: true,
              }}
              variant="h4"
            >
              TOTAL = ${compra.total}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="inherit"
              onClick={() => handleOpenModal(false)}
            >
              cerrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ModalContainer>
  );
}
