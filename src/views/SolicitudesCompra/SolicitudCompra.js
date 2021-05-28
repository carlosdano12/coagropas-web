import React, { useState, useEffect } from "react";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import MuiTable from "../../components/moleculas/MuiTable";
import ModalSolicitudCompra from "components/organisms/ModalSolicitudesCompra/ModalSolicitudesCompra";
import useSolicitudesCompras from "hooks/useSolicitudCompra";

export default function SolicitudesCompras() {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [totalVentas, setTotalVentas] = useState(0);
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitud, setSolicitud] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { getSolicitudesCompras } = useSolicitudesCompras();

  const openModall = (position) => {
    setIsLoading(true);
    setOpenModal(true);
    setSolicitud(solicitudes[position]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSolicitudesCompras()
      .then((response) => {
        if (response) {
          console.log("asdas", response);
          setSolicitudes(response);
          setTotalVentas(response.length);
        }
      })
      .catch((err) => {
        // TODO redireccionar en 403
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagination]);

  const options = {
    print: false,
    filter: false,
    count: totalVentas,
    serverSide: true,
    search: false,
    viewColumns: false,
    download: false,
    rowHover: true,
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: false,
    onChangeRowsPerPage: (numberOfRows) => {},
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        const newPagination = {
          ...pagination,
          page: tableState.page + 1,
        };
        setPagination(newPagination);
      }
      if (action === "changeRowsPerPage") {
        const newPagination = {
          ...pagination,
          limit: tableState.rowsPerPage,
        };
        setPagination(newPagination);
      }
    },
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
    {
      name: "asociado",
      label: "Asociado",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography>
            {value.nombre}  {value.apellido}
          </Typography>
        ),
      },
    },
    {
      name: "fechaSolicitud",
      label: "Fecha de la solicitud",
    },
    {
      name: "nota",
      label: "Nota",
    },
    {
      name: "action",
      label: "Acción",
      options: {
        customBodyRender: (value, tableMeta, update) => {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled={isLoading}
              color="primary"
              onClick={async () => {
                openModall(tableMeta.rowIndex);
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : ""} VER
            </Button>
          );
        },
      },
    },
  ];

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" component="h1" align="center">
            Solicitudes de compras
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiTable
            title="Lista de solicitudes"
            isLoading={isLoading}
            columns={columns}
            data={solicitudes}
            options={options}
          />
        </Grid>
      </Grid>
      <ModalSolicitudCompra
        handleOpenModal={setOpenModal}
        solicitudCompra={solicitud}
        openModal={openModal}
      />
    </>
  );
}
