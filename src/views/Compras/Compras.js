import React, { useEffect, useState } from "react";
import useCompras from "../../hooks/useCompras";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import MuiTable from "../../components/moleculas/MuiTable";
import ModalCompra from "./Compra";
import ModalCompraDetalle from "components/organisms/ModalCompra";

export default function Compras() {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [totalCompras, setTotalCompras] = useState(0);
  const [compra, setCompra] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalCompra, setOpenModalCompra] = useState(true);
  const [compras, setCompras] = useState([]);
  const { getCompras } = useCompras();

  const createShipping = (position) => {
    setIsLoading(true);
    setOpenModal(true);
    setCompra(compras[position]);
    setIsLoading(false);
  };

  const handleGetOrders = () => {
    setIsLoading(true);
    getCompras()
      .then((response) => {
        if (response) {
          setCompras(response);
          setTotalCompras(response.length);
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
    count: totalCompras,
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
      name: "fechaCompra",
      label: "Fecha de la compra",
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
            Compras
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModalCompra(true)}
          >
            Registar compra
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MuiTable
            title="Lista de compras"
            isLoading={isLoading}
            columns={columns}
            data={compras}
            options={options}
          />
        </Grid>
      </Grid>
      <ModalCompraDetalle
        compra={compra}
        openModal={openModal}
        handleOpenModal={setOpenModal}
      />
      <ModalCompra
        openModalCompra={openModalCompra}
        handleOpenModalCompra={setOpenModalCompra}
        getCompras={handleGetOrders}
      />
    </>
  );
}
