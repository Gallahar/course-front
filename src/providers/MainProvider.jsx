import { createContext, useState } from 'react'

const MainContextInitialValue = {
	user: {},
	setUser: () => {},
}

export const MainContext = createContext(MainContextInitialValue)

export const MainProvider = ({ children }) => {
	const [user, setUser] = useState(localStorage.getItem('user')??{})

	return (
		<MainContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</MainContext.Provider>
	)
}
