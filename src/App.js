import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useContext} from "react";
import { Context } from "./context/Context";

//Different components imported to create routes
import HomePage from "./components/HomePage";
import CoursePage from "./pages/CoursePage.jsx";
import NavBar from "./components/Navigation/NavBar";
import CalendarPage from "./components/Calendar/CalendarPage";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./components/Chat/Chat";
import Attendance from "./components/Attendance/AttendanceDecider";
import ToDoAsnPage from "./components/ToDoAsn/ToDoAsnPage";
import Display from "./components/TakeQuiz/Dispaly";

// import "./App.css";

function App() {
  const { user } = useContext(Context);
  console.log("app");
  return (
    <Router>
      <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
        {user ? <NavBar /> : null}
        <Routes>
          <Route exact path={"/"} element={<HomePage />} />
          <Route
            path={"/calendar"}
            element={<ProtectedRoute Component={CalendarPage} />}
          />
          <Route path={"/chat"} element={<ProtectedRoute Component={Chat} />} />
          <Route
            path={"/assignments"}
            element={<ProtectedRoute Component={ToDoAsnPage} />}
          />
          <Route
            path="/coursepage/:cid"
            element={<ProtectedRoute Component={CoursePage} />}
          />
          <Route
            path={"/attendance"}
            element={<ProtectedRoute Component={Attendance} />}
          />
          <Route
            path={"/quiz"}
            element={<ProtectedRoute Component={Display} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
