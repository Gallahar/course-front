import { createContext, useEffect, useState } from 'react'
import { axios } from 'api/axios.js'

const AdminContextInitialValue = {
	courses: [],
	tests: [],
	setCourses: () => {},
	setTests: () => {},
}

export const AdminContext = createContext(AdminContextInitialValue)

export const AdminProvider = ({ children }) => {
	const [courses, setCourses] = useState([])
	const [tests, setTests] = useState([])

	useEffect(() => {
		const getCourses = async () => {
			try {
				const data = await axios.get('/course/find-admin')
				console.log(data)
				setCourses(data.data)
			} catch (error) {
				alert(error.message)
			}
		}

        const getTests = async () => {
			try {
				const data = await axios.get('/test/find-admin')
				console.log(data)
				setTests(data.data)
			} catch (error) {
				alert(error.message)
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
			}}
		>
			{children}
		</AdminContext.Provider>
	)
}
