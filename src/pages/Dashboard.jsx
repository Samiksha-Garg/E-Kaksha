import CardT from "../components/Card/CardT.js"
import React, {useState, useEffect, useContext} from 'react'
import TopNavbar from "../components/Navigation/topNavbar.js";
import { Context } from "../context/Context.js";
import axios from "axios";

function DashBoard(){

      const {user} = useContext(Context);
      const [userCourses, setCourses] = useState([])

      useEffect(async () => {
            let courseArray = user.courses;
            let l = courseArray.length;
            let courses = []
            for (let i = 0; i < l; i++) {
                  // console.log(courseArray[i]);
                  const res = await axios.get("/course/" + courseArray[i]);
                  // console.log(res.data);
                  courses.push(res.data);
            }                
           setCourses(courses);
      },[])

    return(
        <div>
      

<TopNavbar />
{userCourses.map((event) => {
          return <CardT title={event.name} ImageUrl={event.image} body = {event.desc} />;
        })} 
      </div>    
    )
}

export default DashBoard;