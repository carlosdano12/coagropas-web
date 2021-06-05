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
  TextField,
  Typography,
} from "@material-ui/core";
import useNiames from "hooks/useNiames";

const tableIcons = {
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
};
export default function ModalVenta({ openModal, handleOpenModal }) {
  const quantity = useRef();
  const showNotification = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [niame, setNiame] = useState({});
  const [niames, setNiames] = useState([]);
  const [total, setTotal] = useState(0);
  const { getNiames } = useNiames();

  useEffect(() => {
    getNiames().then((response) => {
      setNiames(response);
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
    if (!niame) {
      console.log("ntra aquie asd", niame);
      showNotification("Todos los campos son obligatorios", "warning");
    } else {
      setData([
        ...data,
        {
          niameId: niame.id_niame,
          nombre: niame.nombre,
          precio: niame.precio,
          cantidad: quantity.current.value,
          total: Number(quantity.current.value) * Number(niame.precio),
        },
      ]);
      setTotal(total + Number(quantity.current.value) * Number(niame.precio));
      setNiame({});
      quantity.current.value = "";
      console.log("data index", data);
    }
  };

  return (
    <ModalContainer
      open={openModal}
      onClose={() => handleOpenModal(false)}
      title="Crear venta"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2} style={{ margin: "10px 0" }}>
        <Grid item md={2} lg={2} xs={12}>
          <Autocomplete
            value={niame}
            fullWidth
            getOptionLabel={(option) => option.nombre}
            onChange={(event, newNiame) => {
              if (newNiame) {
                setNiame(newNiame);
              }
            }}
            id="niame"
            options={niames}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Tipo de ñame"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <TextField
            label="Cantidad"
            inputRef={quantity}
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
            onClick={addRow}
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
        title="DETALLES DE LA VENTA"
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
                  <Typography variant="h6">TOTAL: ${total}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ),
        }}
      />
      <br />
      <TextField fullWidth label="Nota:" variant="outlined" />
    </ModalContainer>
  );
}
