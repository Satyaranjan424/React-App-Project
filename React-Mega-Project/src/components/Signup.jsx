import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">

            {/* 🔥 Signup Card */}
            <div className="w-full max-w-md bg-gray-300 rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Logo width="90px" />
                </div>

                {/* Heading */}
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Create Account
                </h2>

                <p className="mt-2 text-center text-sm text-gray-700">
                    Join us and start sharing your posts
                </p>

                {/* Login Link */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Error */}
                {error && (
                    <p className="text-red-600 mt-4 text-center text-sm">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">

                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email must be valid",
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
                        Create Account
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Signup