import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './utility/context/authContext'

export const PrivateRoute = () => {
	const { user } = useContext(AuthContext)

	return user ? <Outlet /> : <Navigate to="/login" />
}


