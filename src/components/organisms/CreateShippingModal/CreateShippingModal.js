import React, { useState } from "react";
import { useOrdersContext } from "../../../contextApi/OrdersContext";
import ModalContainer from "../../moleculas/ModalContainer";
import MuiTable from "../../moleculas/MuiTable";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

export default function CreateTrackingId(props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    openModalCreateShipping,
    venta,
    orderPackageShipping,
    orderPackages,
    setOrderPackageShipping,
    handleOpenModalCreateShipping,
  } = useOrdersContext();
  console.log("venta", venta);
  const options = {
    print: false,
    filter: false,
    count: venta.ventaDetalles.lenght,
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
      name: "niame.nombre",
      label: "Ñame",
    },
    {
      name: "cantidad",
      label: "Cantidad",
    },
  ];

  return (
    <ModalContainer
      open={openModalCreateShipping}
      onClose={() => handleOpenModalCreateShipping(false)}
      title="Detalles de la venta"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="fecha"
            value={venta.fechaVenta}
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
            value={venta.nota}
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
            data={venta.ventaDetalles}
            options={options}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            label="TOTAL"
            InputProps={{
              readOnly: true,
            }}
            variant="h4"
          >
            TOTAL = $1000
          </Typography>
        </Grid>
      </Grid>
    </ModalContainer>
  );
}
