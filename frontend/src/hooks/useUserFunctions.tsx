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
                        user: data.data.user,
                        auth: { none: true },
                    })
                    return
                }, (err) => {
                    console.log(err)
                    throw new Error(err.response.data.error)
                })
            } catch (err) {
                console.log(err);

            }
        }
    }
    const emailAuth = async (email: string) => {
        try {
            let data = await axios.post("/auth/email", { email }).then((data: any) => {
                console.log(data.data.type);
                setUser({
                    isLoggedIn: false,
                    token: "",
                    user: {},
                    auth: data.data
                })
                return data.data.type
            }, (err) => {
                console.log(err);
                throw new Error(err.response.data.error)
            })
            return data

        } catch (err) {
            console.log(err);
        }
    }

    const passwordAuth = async (password: string) => {
        try {
            let authToken = user.auth.token
            if (!authToken) throw new Error("no token")
            if (authToken) {
                await axios.post("/auth/password", { password, token: authToken }).then((data: any) => {
                    console.log(data);
                    setUser({
                        isLoggedIn: true,
                        token: data.token,
                        user: data.user,
                    })
                }, (err) => {
                    console.log(err);
                    throw new Error(err.response.data.error)
                })
            }


        } catch (err) {
            console.log(err);
        }
    }

    return { fetchUser, emailAuth, passwordAuth }
}