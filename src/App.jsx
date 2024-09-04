import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import VideoPlayer from "./video_process/VideoPlayer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VideoPlayer />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
