import { useNavigate } from "react-router-dom";
import React from "react";
import { useTitle } from "../utils/changeTitle";
import { authContext } from "../context/authContext";

export const Logout = () => {
    let navigate = useNavigate();
    const { setUser, user }: any = React.useContext(authContext)
    useTitle("Logging out")
    React.useEffect(() => {
        if (user.isLoggedIn === false) return navigate("/")
        setUser({
            isLoggedIn: false,
            token: "",
            user: {}
        })
        localStorage.removeItem("token")
        navigate("/")
    })
    return (
        <div>

        </div>
    )
}