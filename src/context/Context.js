
import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./Reducer";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  isChecked : true
};

export const Context = createContext(INITIAL_STATE);

//children are components which can provide the context
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [userCourses, setUserCourses] = useState([]);

  const getCourses = async (courseArray) => {
    let l = courseArray.length;
    let courses = []
    for (let i = 0; i < l; i++) {
      // console.log(courseArray[i]);
      const res = await axios.get("/course/" + courseArray[i]);
      // console.log(res.data);
      courses.push(res.data);
    }

    setUserCourses(courses);
  }

  useEffect(() => {
    if (state.isChecked) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }

    if (state.user) {
      const currUser = state.user;
      console.log(currUser);
      getCourses(currUser.courses);
      
    } else {
      setUserCourses([]);
    }
    
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        courses : userCourses,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};