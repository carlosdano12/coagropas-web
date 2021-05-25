import React, { useState } from "react";
import useCompras from "../../hooks/useOrders";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import MuiTable from "../../components/moleculas/MuiTable";
import CreateShippingModal from "../../components/organisms/CreateShippingModal";
import ModalCompra from "./Compra";
import { useOrdersContext } from "contextApi/OrdersContext";

export default function Compras() {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [totalCompras, setTotalCompras] = useState(0);
  const [compras, setCompras] = useState([
    {
      asociadoIdAsociado: "90bc58f2-c9d9-405a-8df8-a53a30e33e6a",
      estado: true,
      fechaVenta: "2021-05-01",
      id: "23b659ea-b8c3-41ec-b383-fdea141720e0",
      nota: "Compras detal",
      total: 352000,
    },
    {
      asociadoIdAsociado: "90bc58f2-c9d9-405a-8df8-a53a30e33e6a",
      estado: true,
      fechaVenta: "2021-05-02",
      id: "23b659ea-b8c3-41ec-b383-fdea141720e0",
      nota: "Sin novedades",
      total: 150000,
    },
    {
      asociadoIdAsociado: "90bc58f2-c9d9-405a-8df8-a53a30e33e6a",
      estado: true,
      fechaVenta: "2021-05-03",
      id: "23b659ea-b8c3-41ec-b383-fdea141720e0",
      nota: "",
      total: 20000,
    },
  ]);
  const { getCompras } = useCompras();
  const { setVenta, handleOpenModalCompra } = useOrdersContext();

  const createShipping = (position) => {
    setIsLoading(true);

    setVenta(compras[position]);
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

  // useEffect(() => {
  //   let m = false;
  //   if (!m) handleGetOrders();
  //   return () => {
  //     m = true;
  //   };
  // }, [pagination]);

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
            onClick={() => handleOpenModalCompra(true)}
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
      <CreateShippingModal getOrders={handleGetOrders} />
      <ModalCompra />
    </>
  );
}
