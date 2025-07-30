import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";

import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../Utils/slice/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />

        },
        {
            path: "/browse",
            element: <Browse />

        }
    ]);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));

                console.log("email", email)
            } else {
                dispatch(removeUser());
            }
        });
    }, []);


    return (
        <RouterProvider router={appRouter} />
    )
}

export default Body