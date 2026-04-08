import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            onClick={logoutHandler}
            className="
                px-5 py-2 
                rounded-full 
                text-sm font-medium 
                text-white 
                bg-gray-700
                transition-all duration-300
                hover:bg-red-500 
                hover:scale-105
                hover:shadow-lg
                active:scale-95
            "
        >
            Logout
        </button>
    )
}

export default LogoutBtn