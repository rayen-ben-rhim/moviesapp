import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../auth/firebase";
import React, { useState, useEffect } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert"; // Import the Alert component from Material-UI
import "./auth.css";
import Logo from "../../assets/logo_google_g_icon.png";

const SingeUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(false); // State to track sign-in errors
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const navigate = useNavigate();

  const signout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        setSuccessMessage("Sign-out successful");
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message after 5 seconds
        }, 5000);
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const signInWithPopups = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photoURL = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("photoURL", photoURL);
        setSuccessMessage("Success! You are now connected");
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message after 5 seconds
          navigate("/");
        }, 5000); // 5000 milliseconds (5 seconds)
        console.log(result);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        setSignInError(true);
        setTimeout(() => {
          setSignInError(false); // Clear sign-in error after 5 seconds
        }, 5000); // 5000 milliseconds (5 seconds)
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign-in successful:", userCredential);
        setSuccessMessage("Sign-in successful");
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message after 5 seconds
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        setSignInError(true);
        setTimeout(() => {
          setSignInError(false); // Clear sign-in error after 5 seconds
        }, 5000); // 5000 milliseconds (5 seconds)
      });
  };

  return (
    <div className="sign-in-container">
      <form>
        <h1>Connect Account</h1>
        <div className="input_form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </div>

        <div className="buttons">
          <button onClick={signIn}>Sign In</button>

          <button onClick={signout}>Logout</button>
          <button onClick={signInWithPopups}> Google</button>
        </div>

        {/* Display success message */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {/* Display sign-in error */}
        {signInError && (
          <Alert severity="error">
            Sign-in failed. Please check your credentials.
          </Alert>
        )}
      </form>
    </div>
  );
};

export default SingeUp;
