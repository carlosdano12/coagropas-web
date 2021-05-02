import React from "react";
import MUIDataTable from "mui-datatables";
import { Typography, CircularProgress } from "@material-ui/core";

const optionsDefault = {
  print: false,
  filter: false,
  viewColumns: false,
  download: false,
  selectableRows: "none",
  rowHover: true,
  rowsPerPageOptions: [],
};
export default function MuiTable(props) {
  const { columns, options = optionsDefault, isLoading, data, title } = props;
  return (
    <MUIDataTable
      title={
        <Typography variant="h6">
          {title}
          {isLoading && (
            <CircularProgress
              size={24}
              style={{ marginLeft: 15, position: "relative", top: 4 }}
            />
          )}
        </Typography>
      }
      data={data}
      columns={columns}
      options={options}
    />
  );
}
