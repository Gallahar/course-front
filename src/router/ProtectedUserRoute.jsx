import { MainContext } from 'providers/MainProvider'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedUserRoute = ({ children }) => {
	const { user, isLoading } = useContext(MainContext)
	const navigate = useNavigate()

	useEffect(() => {
		// проверяем  - авторизовался ли пользователь, если загрузка уже завершилась и пользователь не авторизован  - перенаправляем его на страницу аутентификации .
		if (!user && !isLoading) {
			navigate('/login', { replace: true })
		}
	}, [user, isLoading, navigate])

	if (isLoading) {
		return <h1>Загружаю...</h1>
	}

	return <div>{children}</div>
}
