import { MainContext } from 'providers/MainProvider'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedAdminRoute = ({ children }) => {
	const { user, isLoading } = useContext(MainContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user?.isAdmin && !isLoading) {
			// проверяем является ли пользователь админом, если загрузка уже завершилась и пользователь не администратор - перенаправляем его на главную страницу
			navigate('/', { replace: true })
		}
	}, [isLoading])

	if (isLoading) {
		return <></>
	}

	return <div>{children}</div>
}
