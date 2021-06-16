import MaterialTable, { MTableToolbar } from "material-table";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ModalContainer from "../../components/moleculas/ModalContainer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useCustomSnackbar from "../../components/useCustomSnackbar";
import { DeleteOutline } from "@material-ui/icons";
import {
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import useInsumos from "hooks/useInsumos";
import useCompras from "hooks/useCompras";

const tableIcons = {
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
};
export default function ModalCompra({
  openModalCompra,
  handleOpenModalCompra,
  getCompras,
}) {
  const quantity = useRef();
  const precio = useRef();
  const nota = useRef();
  const showNotification = useCustomSnackbar();
  //const showNotification = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [insumo, setInsum] = useState({});
  const [insumos, setInsumo] = useState([]);
  const [total, setTotal] = useState(0);
  const { getInsumos } = useInsumos();
  const { crearCompra } = useCompras();

  useEffect(() => {
    getInsumos().then((resposne) => {
      setInsumo(resposne);
    });
  }, []);

  const columns = [
    { title: "Nombre", field: "nombre" },
    {
      title: "Precio",
      field: "precio",
    },
    { title: "Cantidad", field: "cantidad", type: "numeric" },
    { title: "Total", field: "total", type: "numeric" },
  ];

  const [data, setData] = useState([]);

  const addRow = () => {
    if (!insumo.nombre) {
      showNotification("Todos los campos son obligatorios", "warning");
    } else {
      setData([
        ...data,
        {
          insumoId: insumo.id,
          nombre: insumo.nombre,
          precio: precio.current.value,
          cantidad: quantity.current.value,
          total: Number(quantity.current.value) * Number(precio.current.value),
        },
      ]);
      setTotal(
        total + Number(quantity.current.value) * Number(precio.current.value)
      );
      setInsum({});
      quantity.current.value = "";
      precio.current.value = "";
    }
  };

  const finalizar = () => {
    setIsLoading(true);
    crearCompra({
      nota: nota.current.value,
      total: total,
      compraDetalles: data,
    })
      .then(() => {
        showNotification("Compra registrada correctamente", "success");
        setIsLoading(false);
        setData([]);
        nota.current.value = "";
        setTotal(0);
        getCompras();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalContainer
      open={openModalCompra}
      onClose={() => handleOpenModalCompra(false)}
      title="Crear compra"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2} style={{ margin: "10px 0" }}>
        <Grid item md={2} lg={2} xs={12}>
          <Autocomplete
            value={insumo}
            fullWidth
            getOptionLabel={(option) => option.nombre}
            onChange={(event, newInsumo) => {
              if (newInsumo) {
                setInsum(newInsumo);
              }
            }}
            id="insumo"
            options={insumos}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Insumos"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <TextField label="Cantidad" inputRef={quantity} type="number" />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <TextField
            label="Precio"
            inputRef={precio}
            type="number"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addRow();
              }
            }}
          />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={addRow}
          >
            Adicionar
          </Button>
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={finalizar}
          >
            Finalizar
          </Button>
        </Grid>
        <Grid>
          {isLoading ? (
            <CircularProgress size={24} style={{ marginLeft: 10 }} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <MaterialTable
        icons={tableIcons}
        title="DETALLES DE LA COMPRA"
        columns={columns}
        data={data}
        actions={[
          (oldData) => ({
            icon: tableIcons.Delete,
            tooltip: "Eliminar",
            onClick: () => {
              const dataDelete = [...data];
              setTotal(total - oldData.total);
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          search: false,
          paging: true,
          pageSize: 5, // make initial page size
          emptyRowsWhenPaging: true, // to make page size fix in case of less data rows
          pageSizeOptions: [10, 20, 50], // rows selection options
        }}
        components={{
          Toolbar: (props) => (
            <Grid container justify="flex-start" alignItems="center">
              <Grid item md={8}>
                <MTableToolbar {...props} />
              </Grid>

              <Grid item just md={3}>
                <Grid container justify="flex-end">
                  <TextField
                    label="TOTAL:$"
                    autoFocus
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                  />
                </Grid>
              </Grid>
            </Grid>
          ),
        }}
      />
      <br />
      <TextField fullWidth label="Nota:" inputRef={nota} variant="outlined" />
    </ModalContainer>
  );
}
