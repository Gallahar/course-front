import { axios } from 'api/axios'
import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const MainContextInitialValue = {
	user: {},
	setUser: () => {},
}

export const MainContext = createContext(MainContextInitialValue)

export const MainProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [courses, setCourses] = useState([])
	const [tests, setTests] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const token = Cookies.get('token')

		const refreshUser = async () => {
			try {
				const data = await axios.get('auth/refresh', {               // при обновлении страницы делаем запрос на сервер, и прикрепляем к нему токен авторизации, при успехе получаем данные пользователя.
					headers: {
						token: token ? JSON.parse(token) : null,
					},
				})
				setUser(data.data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		refreshUser()
	}, [])

	useEffect(() => {
		const getCourses = async () => {
			try {
				const data = await axios.get('course/find')             // получаем все курсы для пользователя с сервера.
				setCourses(data.data)
			} catch (error) {
				console.log(error)
			}
		}

		const getTests = async () => {
			try {
				const data = await axios.get('test/find') // получаем все тесты для пользователя с сервера.
				setTests(data.data)
			} catch (error) {
				console.log(error)
			}
		}
		getCourses()
		getTests()
	}, [])

	return (
		<MainContext.Provider
			value={{
				user,
				setUser,            // прокидываем пропсы(свойства/данные) ниже , чтобы все дочерние компоненты могли ими пользоваться, а т.е. : данные пользователя, функция для изменения данных пользователя , массив тестов и курсов, а так же индикатор загрузки.
				isLoading,
				courses,
				tests,
			}}
		>
			{children}
		</MainContext.Provider>
	)
}
