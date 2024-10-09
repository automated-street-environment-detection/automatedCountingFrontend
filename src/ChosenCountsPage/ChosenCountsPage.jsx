import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCount,
  deleteCount,
  addCounttoCountList,
  clearCountsList,
  setCountList,
} from "../redux/countsSlice";
import { deleteDataInstance, getDataInstanceNames,getDataInstance } from "../api/instanceApi";
import CreateCountsButton from "./CreateCountsButton";

const ChosenCountsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCount = useSelector((state) => state.counts.counts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countsList = useSelector((state) => state.counts.countsList);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const filteredCounts = countsList.filter((count) =>
    count.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountSelect = (count) => {
    const getCounts1 = async () => {
    try {
      const payload = {
        user_id: localStorage.getItem("username"),
        video_name: selectedVideo.title,
        boundary_name: selectedBoundary.title,
      };
      // console.log(payload);
      const response = await getDataInstance(payload);
      count = JSON.parse(response.body.instance_data);
      dispatch(selectCount(count));
    } catch (error) {
      console.error(error);
    }
  };
    getCounts1();
    navigate("/counting");
    
  };

  const downloadCSV = (count) => {
    const getCounts1 = async () => {
      try {
        const payload = {
          user_id: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
        };
        // console.log(payload);
        const response = await getDataInstance(payload);
        count = JSON.parse(response.body.instance_data);
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
    navigate("/ChosenCountsPage");
      } catch (error) {
        console.error(error);
      }
    };
    
    getCounts1();
    console.log(count);
  };

  const handleCountRightClick = (e, count) => {
    const deleteCounts = async () => {
      try {
        const payload = {
          user_email: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
          instance_name: count.title,
        };
        console.log(payload);
        const response = await deleteDataInstance(payload);
        navigate("/ChosenCountsPage");
      } catch (err) {
        console.error(err);
      }
    };

    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the count titled "${count.title}"?`
    );
    if (confirmDelete) {
      // dispatch(clearCountsList());
      deleteCounts();
    }
  };
  const handleBack = () => {
    navigate("/video");
  };

  useEffect(() => {
    const getCounts = async () => {
      try {
        const payload = {
          user_id: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
        };
        dispatch(clearCountsList());
        // console.log(payload);
        const response = await getDataInstanceNames(payload);
        // console.log(response);
        if (response.status == 1) {
          // console.log(response);
          const countsList = response.body.instance_name.map((ins) => {
            return { title: ins };
          });
          // console.log(countsList);
          dispatch(setCountList(countsList));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCounts();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "100px",
      }}
    >
      {/* Button section for creating and going back */}
      <div style={{ marginBottom: "20px" }}>
        {/* <button
          onClick={handleCreateButton}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Create New Counts
        </button> */}
        <CreateCountsButton />
        <button
          onClick={handleBack}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      {/* Search input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Count by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Counts Table */}
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {filteredCounts.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Count Title
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCounts.map((count) => (
                <tr
                  key={count.title}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCount && selectedCount.title === count.title
                        ? "#d1e7dd"
                        : "#fff",
                  }}
                  onClick={() => handleCountSelect(count)}
                  onContextMenu={(e) => handleCountRightClick(e, count)}
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {count.title}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={() => downloadCSV(count)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "14px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Export to CSV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Counts Found</h2>
        )}
      </div>
    </div>
  );
};

export default ChosenCountsPage;
