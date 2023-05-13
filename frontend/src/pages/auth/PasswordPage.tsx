import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useTitle } from "../../hooks/useChangeTitle";
import { toast } from 'react-toastify';
import axios from 'axios'
import { authContext } from "../../context/authContext";

export const PasswordPage = () => {
    useTitle("Login")
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const { user, setUser }: any = useContext(authContext)
    useEffect(() => {
        if (user.isLoggedIn || user.auth.none === true) return navigate("/app")
    }, [])
    const submitHandler = async () => {
        if (!password) return toast.error("Email Not Found")

        try {
            await axios.post("/auth/password", {
                password,
                token: user.auth.token
            }).then(({ data }) => {
                if (data) {
                    console.log(data);
                    setUser({
                        isLoggedIn: true,
                        token: data.token,
                        user: data.user,
                        auth: { none: true },
                    })
                    localStorage.setItem("token", data.token)
                    navigate("/app")
                } else navigate("/auth")
            }, (err) => {
                toast.error(err.response.data.error)
            })
        } catch (error) {
            toast.error("some error occured. please try again later")
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center">
            <div className="pt-32 flex-col">
                <h1 className="font-bold text-4xl mb-8">Authentication</h1>

                <div className="mb-6">
                    <p className="">Password</p>
                    <div className="flex mb-5 border-2 border-black border-opacity-25">
                        <div className="h-10 w-10 opacity-25 p-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <input size={30} className="focus:outline-none" placeholder="" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <button className="text-white bg-black border-1 border-black w-full sm:px-16 py-3" onClick={() => submitHandler()} >Login</button>
            </div>
        </div>
    )
}