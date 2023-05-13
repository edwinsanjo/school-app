import axios from "axios"
import { useContext } from "react"
import { authContext } from "../context/authContext"

export const userFunctions = () => {
    let { user, setUser } = useContext(authContext)
    const fetchUser = async () => {
        let token = localStorage.getItem("token")
        if (!token) return
        if (token) {
            try {
                axios.defaults.headers.common["x-auth-token"] = token
                await axios.get("/auth/getuserdata").then((data: any) => {
                    setUser({
                        isLoggedIn: true,
                        token: token,
                        user: data.user
                    })
                }, (err) => {
                    throw new Error(err.response.data.error)
                    console.log(err)
                })
            } catch (err) {
                throw new Error("Please try again later")
            }
        }
    }
    const emailAuth = (emali: string) => {
        
    }
    return { fetchUser, emailAuth }
}