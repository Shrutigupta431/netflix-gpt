import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidate } from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/slice/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidate(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrMsg(message);
    if (message) return;

    if (!isSignInForm) {
      // Signed up logic

      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
              // console.log("user", user);
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + " " + errorMessage);
          console.log(errMsg);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg("User not found");
          console.log(errMsg);
        });

      console.log("signUp");
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_small.jpg"
          alt="Netflix-page"
        />
      </div>
      <div className="flex items-center justify-center h-screen bg-transparent relative">
        <div className="bg-black bg-opacity-80  p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-4 text-white ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {!isSignInForm && (
              <div className="mb-4">
                <label for="text" className="block text-white mb-2">
                  Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  id="text"
                  class="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 "
                  placeholder=" Full Name"
                />
              </div>
            )}
            <div className="mb-4">
              <label for="email" className="block text-white mb-2">
                Email
              </label>
              <input
                ref={emailRef}
                type="text"
                id="email"
                class="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Email Address"
              />
            </div>
            <div className="mb-4">
              <label for="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                id="password"
                className="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Password"
              />
            </div>
            <p className="text-red-500 py-2 font-bold">{errMsg}</p>
            <button
              type="submit"
              onClick={handleButtonClick}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="py-4 mt-4 text-white cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignInForm
                ? "New to Netflix ? Sign Up Now"
                : "Already Registered ? Sign In Now "}{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
