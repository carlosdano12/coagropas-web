import React from "react";
import MuiTable from "components/moleculas/MuiTable";
import { Button, Grid } from "@material-ui/core";
import CustomToolbar from "components/moleculas/CustomToolBar/CustomToolBar";

export default function ClienteList(props) {
  const {
    clientes,
    isLoading,
    handleOnClickEditProvider,
    addProviderButton,
  } = props;

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "false",
      },
    },
    {
      name: "nombre",
      label: "Nombre",
    },
    {
      name: "apellido",
      label: "Apellido",
    },
    {
      name: "documento",
      label: "Documento",
    },
    {
      name: "telefono",
      label: "Telefono",
    },
    {
      name: "",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        download: false,
        print: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <Grid container justify="flex-start">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                style={{ marginRight: 5 }}
                onClick={() => {
                  handleOnClickEditProvider(tableMeta.rowData[0]);
                }}
              >
                Editar
              </Button>
            </Grid>
          );
        },
      },
    },
  ];

  const options = {
    download: false,
    filter: false,
    print: false,
    selectableRowsHeader: false,
    selectableRows: "none",
    viewColumns: false,
    customToolbar: () => {
      return (
        <CustomToolbar tooltip="Agregar cliente" onClick={addProviderButton} />
      );
    },
  };

  return (
    <React.Fragment>
      <div>
        <MuiTable
          title="Clientes"
          isLoading={isLoading}
          columns={columns}
          data={clientes}
          options={options}
        />
      </div>
    </React.Fragment>
  );
}
