import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
// import VideoPlayer from "./video_process/VideoPlayer";
import CountingPage from "./video_process/CountingPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/videoplayer" element={<CountingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
