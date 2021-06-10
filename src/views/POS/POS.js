import React, { useState, useEffect } from "react";
import useVentas from "../../hooks/useOrders";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import MuiTable from "../../components/moleculas/MuiTable";
import CreateShippingModal from "../../components/organisms/CreateShippingModal";
import ModalVenta from "./venta";

export default function POS() {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [totalVentas, setTotalVentas] = useState(0);
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalVenta, setOpenModalVenta] = useState(false);
  const { getVentas } = useVentas();

  const createShipping = (position) => {
    setIsLoading(true);
    setOpenModal(true);
    setVenta(ventas[position]);
    setIsLoading(false);
  };

  const handleGetOrders = () => {
    setIsLoading(true);
    getVentas()
      .then((response) => {
        if (response) {
          setVentas(response);
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
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

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
    // 3 date_created -> Fecha del pedido
    {
      name: "fechaVenta",
      label: "Fecha de la venta",
    },
    {
      name: "nota",
      label: "Nota",
    },
    {
      name: "total",
      label: "Total",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ fontSize: 15 }}>${value}</div>
        ),
      },
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
                createShipping(tableMeta.rowIndex);
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
            VENTAS
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModalVenta(true)}
          >
            CREAR VENTA
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiTable
            title="Lista de pedidos"
            isLoading={isLoading}
            columns={columns}
            data={ventas}
            options={options}
          />
        </Grid>
      </Grid>
      <CreateShippingModal
        venta={venta}
        handleOpenModal={setOpenModal}
        openModal={openModal}
        getOrders={handleGetOrders}
      />
      <ModalVenta
        openModal={openModalVenta}
        handleOpenModal={setOpenModalVenta}
        getOrders={handleGetOrders}
      />
    </>
  );
}
