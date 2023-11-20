import React from "react";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

const ExportExcel = ({ data, filename }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Disney Characters");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Button variant="outlined" color="primary" onClick={exportToExcel}>
        Export PieChart data to Excel
      </Button>
    </div>
  );
};

export default ExportExcel;
