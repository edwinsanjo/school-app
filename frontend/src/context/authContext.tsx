import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let user: any
let setUser: any

const authContext = createContext({ user, setUser })

function AuthProvider({ children }) {
    [user, setUser] = useState({
        isLoggedIn: false,
        token: "",
        user: {},
        auth: {},
    });
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            if (user.isLoggedIn === true) return
            if (user.token === token) return
            axios.defaults.headers.common['x-auth-token'] = token;
            axios.get("/auth/getuserdata").then((data) => {
                console.log(data);
                setUser({
                    isLoggedIn: true,
                    token: token,
                    user: data.data.user,
                    auth: { none: true },
                })
                console.log("after useefeect");
                console.log(user);
            }, (err) => {
                toast.error("Authentication error Please Relogin")
                console.log(err);

            })
        }
    }, [])


    return (<authContext.Provider value={{ user, setUser }}>{children}</authContext.Provider>);
}

export { AuthProvider, authContext };