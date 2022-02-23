import React from "react";
import logo from "../../assets/logo.png"
import styles from "../../styles/SignIn.module.css"

const SignIn = () => {
    return (
        <div className={styles.home}>
            <img src={logo} alt="logo"></img>
            <div></div>
        </div>
    );
}

export default SignIn;