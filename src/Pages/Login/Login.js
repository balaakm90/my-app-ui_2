import { Button, TextField } from "@mui/material";
import "./Login.css";
import styles from "./Login.module.css"
import { useState, useEffect } from "react";

export const Login = (props) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loginStatus, setLoginStatus] = useState("");
    const handleOnClickSubmit = () => {
        let uid = document.getElementById("login-username").value;
        let pwd = document.getElementById("login-password").value;
        setUserDetails({
            username: uid,
            password: pwd
        });
    };
    const validateUserDetails = (uDetails) => {
        if (uDetails !== null && uDetails.username.toLowerCase() === "balaakm90" && uDetails.password === "Bala@123") {
            return true;
        }
        else {
            return false;
        }
    };
    useEffect(() => {
        if (userDetails !== null) {
            if (validateUserDetails(userDetails)) {
                setLoginStatus("Login Success");
            }
            else {
                setLoginStatus("Login Failed");
            }
        }
    }, [userDetails]);
    return (
        <>
            <h2 className={styles.bigBlue}>Login Page</h2>
            <TextField
                id="login-username"
                className="login-input-field"
                variant="outlined"
                label="Username"
                type="text" />
            <TextField
                id="login-password"
                className="login-input-field"
                variant="outlined"
                label="Password"
                type="password" />
            <Button
                className="login-submit-btn"
                id="login-btn-01"
                variant="contained"
                onClick={handleOnClickSubmit}
            >
                Login
            </Button>
            <p>{loginStatus}</p>
        </>
    );
};