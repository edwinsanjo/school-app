import React, { useContext, useEffect } from "react"
import { authContext } from "../context/authContext"
import { useNavigate } from "react-router-dom"

export const AppPage = () => {
    let { user, setUser }: any = useContext(authContext)

    const navigate = useNavigate();
    useEffect(() => {
        if (!user.user) return navigate("/logout")
        if (user.isLoggedIn === false) return navigate("/auth")
    }, [user.isLoggedIn])
    return (
        <div className="flex justify-center h-screen w-screen pt-32">
            <h1>Dashboard logged in as {user.user.user}</h1>
        </div>
    )
}