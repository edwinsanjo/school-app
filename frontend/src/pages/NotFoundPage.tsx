import { Link } from "react-router-dom";
import React from "react";
import { useTitle } from "../hooks/useChangeTitle";

export const NotFoundPage = () => {
    useTitle("Page Not Found | 404")


    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="md:flex">
                <h1 className="text-8xl md:text-9xl text-center md:text-left font-semibold">404 <span className="hidden md:inline-block font-normal">|</span></h1>
                <div className="flex-row">
                    <p className="text-xl mb-2 mt-3 text-center font-bold">Page Not Found</p>
                    <div className="flex justify-center">
                        <Link to="/" className="border-8 border-black px-9 py-3">Go Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}