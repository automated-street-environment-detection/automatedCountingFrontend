import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
// import VideoPlayer from "./video_process/VideoPlayer";
import CountingPage from "./video_process/CountingPage";
import ChosenVideoPage from "./ChosenVideoPage/ChosenVideoPage";
import ChosenBoundaryPage from "./ChosenVideoPage/ChosenBoundaryPage";
import CreateBoundary from "./ChosenVideoPage/CreateBoundary";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<ChosenVideoPage />} />
        <Route path="/counting" element={<CountingPage />} />
        <Route path="/boundary" element={<ChosenBoundaryPage />} />
        <Route path="/boundaryCreate" element={<CreateBoundary />} />
      </Routes>
    </Router>
  );
}

export default App;
