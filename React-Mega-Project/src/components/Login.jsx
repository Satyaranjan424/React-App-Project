import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">

            {/* 🔥 Login Card */}
            <div className="w-full max-w-md bg-gray-300 rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Logo width="90px" />
                </div>

                {/* Heading */}
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Welcome Back
                </h2>

                <p className="mt-2 text-center text-sm text-gray-700">
                    Sign in to continue to your account
                </p>

                {/* Signup Link */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-black hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error */}
                {error && (
                    <p className="text-red-600 mt-4 text-center text-sm">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            }
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-full py-2 transition"
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Login