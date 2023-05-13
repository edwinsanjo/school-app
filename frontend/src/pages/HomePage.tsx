import { Link } from "react-router-dom";
import React from "react";
import { useTitle } from "../hooks/useChangeTitle";
import { authContext } from "../context/authContext";
export const HomePage = () => {


    useTitle("New Title")
    return (
        <div className="h-screen bg-[#282A36] w-screen flex text-white justify-center">
            <div>
                <h1 className="font-bold text-3xl pb-6">Big School Name</h1>
                <p className="pb-6">
                    this is amazing
                </p>
            </div>
        </div>
    )
}