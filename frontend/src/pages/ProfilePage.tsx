
import React, { useEffect } from "react";
import { useTitle } from "../utils/changeTitle";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const navigate = useNavigate()
    const { user }: any = React.useContext(authContext)
    useEffect(() => {
        if (user.isLoggedIn === false) return navigate("/login")
    }, [])
    useTitle(user.user.name)
    return (
        <div className="flex justify-center h-screen w-screen pt-32">
            <div>
                <h1 className="font-bold text-2xl mb-2">User Details</h1>
                <p>Id: {user.user.id}</p>
                <p>Name: {user.user.name}</p>
                <p>Email: {user.user.email}</p>
            </div>
        </div>
    )
}