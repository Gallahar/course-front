import { axios } from 'api/axios'
import { createContext, useState, useEffect } from 'react'

const MainContextInitialValue = {
	user: {},
	setUser: () => {},
}

export const MainContext = createContext(MainContextInitialValue)

export const MainProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const refreshUser = async () => {
			try {
				const data = await axios.get('auth/refresh')
				setUser(data.data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		refreshUser()
	}, [])

	return (
		<MainContext.Provider
			value={{
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</MainContext.Provider>
	)
}
