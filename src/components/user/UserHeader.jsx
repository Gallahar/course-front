import { MainContext } from 'providers/MainProvider'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export const UserHeader = () => {
	const { user } = useContext(MainContext)

	return (
		<header className="userHeader">
			<nav className="userNavbar">
				<Link className="userLink" to="courses">
					Курсы
				</Link>
				<Link className="userLink" to="tests">
					Тесты
				</Link>
			</nav>
			<h1 className="userInfo">{user.email}</h1>
		</header>
	)
}
