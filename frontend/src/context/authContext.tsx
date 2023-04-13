import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const authContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        token: "",
        user: {}
    });

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            if (user.isLoggedIn === true) return


            axios.defaults.headers.common['x-auth-token'] = token;
            axios.get("/auth/getuserdata").then((data) => {
                setUser({
                    isLoggedIn: true,
                    token: token,
                    user: data.data.user,
                })
            }, (err) => {
                toast.error("Authentication error Please Relogin")
            })
        }
    }, [])

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
}

export { AuthProvider, authContext };