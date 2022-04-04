import { useContext } from "react";
import { Context } from "../../context/Context";
import TopNavBar from "../Navigation/topNavbar";
import AttendancePage from "./AttendancePage";
import AttendancePageTeacher from "./AttendancePageTeacher";

function AttendanceDecider() {
    const {user} = useContext(Context);

    return (
        <div style={{width : "100%"}}>
            <TopNavBar/>
            {user.role == "student" && <AttendancePage/>}
            {user.role == "teacher" && <AttendancePageTeacher/>}
        </div>
    )
}

export default AttendanceDecider;