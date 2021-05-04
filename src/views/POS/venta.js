import MaterialTable, { MTableToolbar } from "material-table";
import React, { forwardRef, useRef, useState } from "react";
import ModalContainer from "../../components/moleculas/ModalContainer";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { useOrdersContext } from "contextApi/OrdersContext";

const tableIcons = {
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
};
export default function ModalVenta() {
  const generateBarCodesOfProducts = 0;
  const code = useRef();
  const name = useRef();
  const quantity = useRef();
  const { openModalVenta, handleOpenModalVenta } = useOrdersContext();
  //const showNotification = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [validateInput, setValidateInput] = useState({
    codeHaveError: false,
    quantityHaveError: false,
    message: "Este campo es obligatorio",
  });
  const columns = [
    { title: "Codigo", field: "code" },
    {
      title: "Nombre",
      field: "name",
    },
    { title: "Cantidad", field: "quantity", type: "numeric" },
  ];

  const [data, setData] = useState([]);

  const addRow = () => {
    if (!code.current.value) {
      setValidateInput({ ...validateInput, codeHaveError: true });
    } else if (!quantity.current.value) {
      setValidateInput({ ...validateInput, quantityHaveError: true });
    } else {
      setValidateInput({
        ...validateInput,
        codeHaveError: false,
        quantityHaveError: false,
      });
      setData([
        ...data,
        {
          code: code.current.value,
          name: name.current.value,
          quantity: quantity.current.value,
        },
      ]);
      code.current.value = "";
      name.current.value = "";
      quantity.current.value = "";
      code.current.focus();
    }
  };

  const printProducts = async () => {
    if (data.length > 0) {
      const pdf = await generateBarCodesOfProducts(data);
      //downloadPDF(pdf, `códigos`);
      setData([]);
      code.current.value = "";
      name.current.value = "";
      quantity.current.value = "";
      code.current.focus();
    } else {
      //   showNotification(
      //     "Debe haber por lo menos un código para imprimir",
      //     "error"
      //   );
    }
  };

  const searchProductNameByCode = async () => {
    try {
      if (code.current.value) {
        setValidateInput({ ...validateInput, codeHaveError: false });
        setIsLoading(true);
        const response = await axios.get(`/code/${code.current.value}`);
        if (!response.data) {
          //showNotification("No se encontró el Producto", "error");
          setIsLoading(false);
          return;
        }
        name.current.value = response.data.name;
        setIsLoading(false);
        quantity.current.focus();
      } else {
        setValidateInput({ ...validateInput, codeHaveError: true });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error");
    }
  };
  return (
    <ModalContainer
      open={openModalVenta}
      onClose={() => handleOpenModalVenta(false)}
      title="Crear venta"
      maxWidth="lg"
    >
      <Grid container justify="center" spacing={2} style={{ margin: "10px 0" }}>
        <Grid item md={2} lg={2} xs={12}>
          <TextField
            label="Codigo"
            autoFocus
            error={validateInput.codeHaveError}
            helperText={
              validateInput.codeHaveError ? validateInput.message : ""
            }
            inputRef={code}
            onKeyPress={(e) => {
              if (e.key === "Enter") searchProductNameByCode();
            }}
          />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <TextField label="Nombre" disabled inputRef={name} />
        </Grid>
        <Grid item md={2} lg={2} xs={12}>
          <TextField
            label="Cantidad"
            inputRef={quantity}
            error={validateInput.quantityHaveError}
            helperText={
              validateInput.quantityHaveError ? validateInput.message : ""
            }
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
            color="primary"
            onClick={addRow}
          >
            Adicionar
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
        title="Impresion de codigos"
        columns={columns}
        data={data}
        actions={[
          (oldData) => ({
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: () => {
              const dataDelete = [...data];
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
          pageSize: 20, // make initial page size
          emptyRowsWhenPaging: true, // to make page size fix in case of less data rows
          pageSizeOptions: [20, 50, 100], // rows selection options
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />

              <Grid container justify="flex-end" style={{ margin: "0 -10px" }}>
                <Grid>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={printProducts}
                  >
                    Imprimir
                  </Button>
                </Grid>
              </Grid>
            </div>
          ),
        }}
      />
    </ModalContainer>
  );
}
