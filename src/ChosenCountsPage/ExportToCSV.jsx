import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExportToCSV = () => {
  const navigate = useNavigate();
  const downloadCSV = (count) => {
    const headers = ["Type", "Timestamp", "PresentCount"];

    const rows = count.timestamps.map((ts) => [
      ts.type,
      ts.timestamp,
      ts.presentCount,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${count.title}.csv`); // File name with indication of data
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    navigate("/counts");
  };

  const exportClick = (e) => {
    e.stopPropagation();
    e.preventDefaults();
  };

  return <Button onClick={(e) => exportClick(e)}>Export</Button>;
};

export default ExportToCSV;
