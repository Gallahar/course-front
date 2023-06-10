import { Link } from 'react-router-dom'

export const AdminHeader = () => {
	return (
		<header className='user_header'>
			<div className='container'>
				<nav className='user_header_navbar' style={{ display: 'flex' }}>
					<p className='admin_panel'>Админ панель</p>
					<Link className='user_header_link' to='courses'>
						Курсы
					</Link>
					<Link className='user_header_link' to='tests'>
						Тесты
					</Link>
				</nav>
			</div>
		</header>
	)
}
