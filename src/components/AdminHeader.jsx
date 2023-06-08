import { Link } from 'react-router-dom'

export const AdminHeader = () => {
	return (
		<header className="admin-container">
			<ul className="admin-header">
				<Link to="courses">Курсы</Link>
				<Link to="tests">Тесты</Link>
			</ul>
		</header>
	)
}
