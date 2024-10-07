import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
// import VideoPlayer from "./video_process/VideoPlayer";
import CountingPage from "./video_process/CountingPage";
import ChosenVideoPage from "./ChosenVideoPage/ChosenVideoPage";
import ChosenBoundaryPage from "./ChosenBoundaryPage/ChosenBoundaryPage";
import CreateBoundary from "./ChosenVideoPage/CreateBoundary";
import ChosenCountspage from "./ChosenCountsPage/ChosenCountsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}

        <Route path="/video" element={<ChosenVideoPage />} />
        <Route path="/counting" element={<CountingPage />} />
        <Route path="/boundary" element={<ChosenBoundaryPage />} />
        <Route path="/boundaryCreate" element={<CreateBoundary />} />
        <Route path="/ChosenCountsPage" element={<ChosenCountspage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
