import { createContext, useEffect, useState } from 'react'
import { axios } from 'api/axios.js'
import { useNavigate } from 'react-router-dom'

const AdminContextInitialValue = {
	courses: [],
	tests: [],
	setCourses: () => {},
	setTests: () => {},
}

export const AdminContext = createContext(AdminContextInitialValue)

export const AdminProvider = ({ children }) => {
	const nav = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [courses, setCourses] = useState([])
	const [tests, setTests] = useState([])

	useEffect(() => {
		const getCourses = async () => {
			try {
				const data = await axios.get('/course/find-admin')
				setCourses(data.data)
			} catch (error) {
				if (error.response.status === 403) {
					nav('/', { replace: true })
				} else if (error.response.status === 401) {
					nav('/login', { replace: true })
				} else {
					alert(error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		const getTests = async () => {
			try {
				const data = await axios.get('/test/find-admin')
				setTests(data.data)
			} catch (error) {
				if (error.response.status === 403) {
					nav('/', { replace: true })
				} else if (error.response.status === 401) {
					nav('/login', { replace: true })
				} else {
					alert(error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		getCourses()
		getTests()
	}, [])

	return (
		<AdminContext.Provider
			value={{
				courses,
				tests,
				setCourses,
				setTests,
				isLoading,
			}}
		>
			{children}
		</AdminContext.Provider>
	)
}
