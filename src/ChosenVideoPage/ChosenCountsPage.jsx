import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { selectCount, deleteCount,addCounttoCountList } from "../redux/countsSlice";

const ChosenCountsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false); 
    const [newTitle, setNewTitle] = useState(""); 
    const selectedCount = useSelector(state => state.counts.counts);
    const countsList = useSelector(state => state.counts.countsList);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const filteredCounts = countsList.filter(count =>
        count.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateButton = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false); 
        setNewTitle(""); 
    };

    const handleSaveNewCount = () => {
      if (newTitle.trim() === "") {
          alert("Please enter a title for the count.");
          return;
      }
  
      const newCount = {
          title: newTitle,
          timestamps: [], 
      };
  
      dispatch(addCounttoCountList(newCount)); 
  
      handleClose(); 
  };

    const handleCountSelect = (count) => {
        dispatch(selectCount(count)); 
        navigate("/counting");
    };

    const downloadCSV = (count) => {
        const headers = ["Type", "Timestamp", "PresentCount"];
        const rows = count.timestamps.map(ts => [ts.type, ts.timestamp, ts.presentCount]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${count.title}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        navigate('/counts');
    };

    const handleCountRightClick = (e, count) => {
        e.preventDefault();
        const confirmDelete = window.confirm(`Are you sure you want to delete the count titled "${count.title}"?`);
        if (confirmDelete) {
            dispatch(deleteCount(count.title)); 
        }
    };

    const handleBack = () => { 
        navigate('/video'); 
    };

    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%', 
            padding: '100px',
        }}>
            {/* Button section for creating and going back */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                onClick={handleCreateButton} 
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Create New Counts
              </button>
              <button 
                onClick={handleBack} 
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
            </div>
          
            {/* Search input */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search Count by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  width: '100%',
                  maxWidth: '400px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          
            {/* Counts Table */}
            <div style={{ width: '100%', maxWidth: '800px' }}>
              {filteredCounts.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Count Title</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCounts.map((count) => (
                      <tr 
                        key={count.title} 
                        style={{ cursor: 'pointer', backgroundColor: selectedCount && selectedCount.title === count.title ? '#d1e7dd' : '#fff' }}
                        onClick={() => handleCountSelect(count)}
                        onContextMenu={(e) => handleCountRightClick(e, count)}
                      >
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          {count.title}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <button 
                            onClick={() => downloadCSV(count)} 
                            style={{
                              padding: '5px 10px',
                              fontSize: '14px',
                              backgroundColor: '#28a745',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
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

            {/* Dialog for title input */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Title for New Count</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNewCount} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChosenCountsPage;
