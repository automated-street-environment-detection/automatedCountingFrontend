import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, deleteCount } from "../redux/countsSlice"; 

const ChosenCountsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const selectedCount = useSelector((state) => state.counts.counts);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const selectedVideo = useSelector((state) => state.player.selectedVideo); // Access selectedVideo

   

    const countsList = useSelector(state => state.counts.countsList);

    const filteredCounts = countsList.filter(count =>
        count.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateButton = () => {
        dispatch(selectCount({ title: null }));
        navigate("/counting");
    };

    const handleCountSelect = (count) => {
        dispatch(selectCount(count)); 
        navigate("/counting");
    };

    const downloadCSV = (count) => {
        const headers = Object.keys(count); 
        const row = Object.values(count);   
        const csvContent = [headers, row].map(e => e.join(",")).join("\n");
        
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${count.title}.csv`); 
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCountRightClick = (e, count) => {
        e.preventDefault();
        const confirmDelete = window.confirm(`Are you sure you want to delete the count titled "${count.title}"?`);
        if (confirmDelete) {
            dispatch(deleteCount(count.title)); 
        }
    };
    const handleBack = () => { 
        navigate('/'); 
    };

    return (
        <div>
            <div>
                <button onClick={handleCreateButton}>Create New Counts</button>
                <button onClick={handleBack}>Back</button>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search Count by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                {filteredCounts.length > 0 ? (
                    filteredCounts.map((count) => (
                        <div key={count.title}>
                            <h2
                                onClick={() => handleCountSelect(count)}
                                onContextMenu={(e) => handleCountRightClick(e, count)} 
                                style={{
                                    cursor: "pointer",
                                    color: selectedCount && selectedCount.title === count.title ? "blue" : "black",
                                }}
                            >
                                {count.title}
                            </h2>
                            <button onClick={() => downloadCSV(count)}>Export to CSV</button>
                        </div>
                    ))
                ) : (
                    <h2>No Counts Found</h2>
                )}
            </div>
        </div>
    );
};

export default ChosenCountsPage;


