import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



let user: any = {};
let setUser: any = () => { }

const authContext = createContext({ user, setUser })

function AuthProvider({ children }) {
    [user, setUser] = useState({
        isLoggedIn: false,
        token: "",
        user: {},
        auth: {},
    });

    useEffect(() => {
        try {
            if (user.isLoggedIn === true) return
            let token = localStorage.getItem("token")

            if (!token) {
                setUser({
                    isLoggedIn: false,
                    token: "",
                    user: {},
                    auth: { none: true },
                })
            } else if (token) {

                axios.defaults.headers.common["x-auth-token"] = token
                axios.get("/auth/getuserdata").then((data) => {
                    setUser({
                        isLoggedIn: true,
                        token: token,
                        user: data.data.user,
                        auth: { none: true },
                    })

                }, (err) => {
                    toast.error("some error occured please relogin.")
                    console.log(err);
                })
            } else { console.log("Some error occured"); }
        } catch (err) { console.log(err) }
    }, [user.isLoggedIn])

    return (<authContext.Provider value={{ user, setUser }}>{children}</authContext.Provider>);

}

export { AuthProvider, authContext };