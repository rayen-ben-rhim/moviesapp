import { auth, provider } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createrror, setcreatrror] = useState(false);
  const [signinerror, setsigninerror] = useState(false);
  const { name, setNamed } = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [signInError, setSignInError] = useState(false);
  const Navigate = useNavigate();
  localStorage.setItem("name", name);
  console.log(auth?.currentUser?.email);
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password, name)
      .then((userCredential) => {
        console.log(userCredential);
        const name = userCredential.user.displayName;
        const email = userCredential.user.email;
        const user = 'rayen'
        localStorage.setItem("name", user);
        localStorage.setItem("email", email);
        setSuccessMessage("Success")
        alert("✅success");
        Navigate("/");
      })
      .catch((error) => {
        console.log("404 Error: " + error);
        setcreatrror(true);
      });
  };
  const signout = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        // An error happened.
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

        console.log(result);
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message after 5 seconds
        }, 5000);
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setSignInError(true);
        setTimeout(() => {
          setSignInError(false); // Clear sign-in error after 5 seconds
        }, 2000);
      });
  };
  /*  const signInWithPopu = async () => {
   try {
    await signInWithPopup(auth , provider);
    console.log()
   }catch(error){
    console.log(error);
   }
  }*/
  return (
    <div className="sign-in-container">
      <form>
        <h1>Create Account</h1>
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
        {createrror && (
          <p className="error">
            password at least 6 charachter and vailid email
          </p>
        )}
        {signinerror && <p className="error">worng email or password</p>}
        <div className="buttons">
        
            <button onClick={signUp}>Sign Up</button>
          

          <button onClick={signout}>Login out</button>
          <button onClick={signInWithPopups}>google</button>
        </div>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {signInError && (
          <Alert severity="error">
            Sign-up failed. Please check your credentials.
          </Alert>
        )}
        <p>
          you have an Account <Link to={"/SigneUp"}>sign up</Link>{" "}
        </p>
       
      </form>
    </div>
  );
};

export default Auth;
