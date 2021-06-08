import React from "react";
import MuiTable from "components/moleculas/MuiTable";
import { Button, Grid } from "@material-ui/core";
import CustomToolbar from "components/moleculas/CustomToolBar/CustomToolBar";

export default function NiameList(props) {
  const {
    providers,
    isLoading,
    handleOnClickEditProvider,
    addProviderButton,
  } = props;

  const columns = [
    {
      name: "id_niame",
      label: "id",
      options: {
        display: "false",
      },
    },
    {
      name: "nombre",
      label: "Tipo",
    },
    {
      name: "precio",
      label: "Precio",
    },
    {
      name: "cantidad",
      label: "Cantidad",
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
    searchOpen: false,
    customToolbar: () => {
      return (
        <CustomToolbar
          tooltip="Agregar proveedor"
          onClick={addProviderButton}
        />
      );
    },
  };

  return (
    <React.Fragment>
      <div>
        <MuiTable
          title="Listado de Ñames"
          isLoading={isLoading}
          columns={columns}
          data={providers}
          options={options}
        />
      </div>
    </React.Fragment>
  );
}
