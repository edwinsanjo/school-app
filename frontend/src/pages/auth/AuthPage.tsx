import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useTitle } from "../../hooks/useChangeTitle";
import { toast } from 'react-toastify';
import axios from 'axios'
import { authContext } from "../../context/authContext";

export const AuthPage = () => {
    useTitle("Login")
    const navigate = useNavigate()
    const { user, setUser } = useContext(authContext)
    const [email, setEmail] = useState("")
    useEffect(() => {
        if (user.isLoggedIn === true && user.auth.none === true) return navigate("/app")
    }, [user.isLoggedIn])

    const submitHandler = async () => {
        if (!email) return toast.error("Please Enter Your Email")
        try {


            await axios.post("/auth/email", { email }).then((data: any) => {
                setUser({
                    isLoggedIn: false,
                    token: "",
                    user: {},
                    auth: data.data
                })

                if (data.data.type === "password") {
                    navigate("/auth/password")
                } else if (data.data.type == "secret") {
                    navigate("/auth/secret")
                } else { toast.error("Some error occured please try again later. if the issue persist please contact us.") }

            }, (err) => {
                console.log(err);

                toast.error(err.response.data.error)
            })

        } catch (err) {
            toast.error("Some error occured please try again later. if the issue persist please contact us.")
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center">
            <div className="pt-32 flex-col">
                <h1 className="font-bold text-4xl mb-8">Login</h1>

                <div className="mb-6">
                    <p className="">email</p>
                    <div className="flex mb-5 border-2 border-black border-opacity-25">
                        <div className="h-10 w-10 opacity-25 p-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <input size={30} className="focus:outline-none" placeholder="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <button className="text-white bg-black border-1 border-black w-full sm:px-16 py-3" onClick={() => submitHandler()} >Next</button>
            </div>
        </div>
    )
}