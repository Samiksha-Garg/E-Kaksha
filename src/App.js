import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Calendar from "./pages/Calendar.jsx";
import Chat from "./pages/Chat.jsx";
import Attendance from "./pages/Attendence.jsx";
import Assignments from "./pages/Assignments.jsx";
import CoursePage from "./pages/CoursePage.jsx";

import "./App.css";

import NavBar from "./components/Navigation/NavBar.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TopNavbar from "./components/Navigation/topNavbar.js";

function App() {
  return (
    <div className='main-page'>

      
      <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/attendence" element={<Attendance />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/coursepage" element={<CoursePage />}/>
        </Routes>
      
    </div>
  );
}

export default App;
