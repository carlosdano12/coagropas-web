import React from "react";
import MuiTable from "components/moleculas/MuiTable";
import { Button, Chip, Grid } from "@material-ui/core";
import CustomToolbar from "components/moleculas/CustomToolBar/CustomToolBar";

export default function RolesList(props) {
  const { asociados, isLoading, handleOnClickEditProvider, titleBtn } = props;

  const columns = [
    {
      name: "id_asociado",
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
      name: "roles",
      label: "Roles",
      options: {
        customBodyRender: (value) => (
          <Grid container justify="flex-start" alignItems="center">
            {value &&
              value.map((rol) => {
                return (
                  <Grid
                    container
                    justify="flex-start"
                    alignItems="center"
                    key={rol.id_rol}
                  >
                    <Chip
                      variant="outlined"
                      size="small"
                      color="primary"
                      label={`${rol.nombre}`}
                      clickable
                      style={{ marginBottom: 10 }}
                    />
                  </Grid>
                );
              })}
          </Grid>
        ),
      },
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
                  handleOnClickEditProvider({
                    id: tableMeta.rowData[0],
                    roles: tableMeta.rowData[5],
                  });
                }}
              >
                {titleBtn}
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
  };

  return (
    <React.Fragment>
      <div>
        <MuiTable
          title="Asociados"
          isLoading={isLoading}
          columns={columns}
          data={asociados}
          options={options}
        />
      </div>
    </React.Fragment>
  );
}
