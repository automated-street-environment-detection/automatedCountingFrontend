import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataInstance } from "../api/instanceApi"; // Make sure to import this
import { useState } from "react";

const ExportToCSV = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const getCounts1 = async () => {
    try {
      const payload = {
        user_id: localStorage.getItem("username"),
        video_name: selectedVideo.title,
        boundary_name: selectedBoundary.title,
      };
      const response = await getDataInstance(payload);
      const count = JSON.parse(response.body.instance_data);
      console.log(count);

      const headers = ["Type", "Timestamp"];
      const rows = count.timestamps.map((ts) => [
        ts.object,
        ts.timestamp
      ]);

      const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${count.title}.csv`); // File name
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      navigate("/ChosenCountsPage"); // Redirect after download
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const exportClick = async (e) => {
    e.stopPropagation();
    e.preventDefault(); // Correct method
    await getCounts1();
  };

  return (
    <Button onClick={(e) => exportClick(e)}>Export</Button>
  );
};

export default ExportToCSV;

