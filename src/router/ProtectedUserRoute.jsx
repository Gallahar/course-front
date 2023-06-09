import { MainContext } from 'providers/MainProvider'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedUserRoute = ({ children }) => {
	const { user, isLoading } = useContext(MainContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user && !isLoading) {
			navigate('/login', { replace: true })
		}
	}, [user, isLoading])

	if (isLoading) {
		return <h1>Загружаю...</h1>
	}

	return <div>{children}</div>
}
