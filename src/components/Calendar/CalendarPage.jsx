import React from "react";
import { render } from "react-dom";
import Calendar from "./Calendar";
import "./index.css";
import styles from "../../styles/Calendar.module.css"

export default () => (
  <div style={{display : "flex"}}>
    <div className={styles.filters} style={{width : "20%"}}> 
      <h1> Filters</h1>
     </div>
    <Calendar />
  </div>);

