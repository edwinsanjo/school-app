import { Link } from "react-router-dom";
import React from "react";
import { useTitle } from "../utils/changeTitle";
import { authContext } from "../context/authContext";
export const HomePage = () => {
    const { user }: any = React.useContext(authContext);
    console.log("times");


    useTitle("New Title")
    return (
        <div className="h-screen w-screen flex justify-center pt-32">
            <div>
                <h1 className="font-bold text-3xl pb-6">Advanced MERN auth Template</h1>
                <p className="pb-6">
                    Thanks for cheking out my mern auth template. I'm sure you<br />
                    will love it. There are no comments but the code is written <br />
                    in a very simple manner so please try to go through the code <br />
                    if you dont have that time just make time to read the readme <br />
                    in github. please star this repo please. Accepting pull requests.
                </p>
                <div>
                    <p className="font-mono p-2 bg-gray-100 rounded text-center">IsLoggedIn: {user.isLoggedIn ? "True" : "False"}</p>
                </div>
                {user.isLoggedIn ?
                    <div className="flex justify-center gap-4 mt-10">
                        <Link to="/profile" className="text-white bg-black border-2 w-full border-black text-center py-3">Profile</Link>
                        <Link to="/logout" className="text-black bg-white border-2 w-full border-black text-center py-3">LogOut</Link>
                    </div>
                    :
                    <div className="flex justify-center gap-4 mt-10">
                        <Link to="/login" className="text-white bg-black border-2 w-full border-black text-center py-3">Login</Link>
                        <Link to="/register" className="text-black bg-white border-2 w-full border-black text-center py-3">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
}