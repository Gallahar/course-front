import { MainContext } from 'providers/MainProvider'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedAdminRoute = ({ children }) => {
	const { user, isLoading } = useContext(MainContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user?.isAdmin && !isLoading) {
			navigate('/login', { replace: true })
		}
	}, [isLoading])

	if (isLoading) {
		return <></>
	}

	return <div>{children}</div>
}
