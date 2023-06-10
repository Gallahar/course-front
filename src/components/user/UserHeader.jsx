import Cookies from 'js-cookie'
import { MainContext } from 'providers/MainProvider'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const UserHeader = () => {
	const { user } = useContext(MainContext)
	const [isBurgerActive, setBurgerActive] = useState(false)
	const nav = useNavigate()

	const logoutHandler = () => {
		Cookies.remove('token')
		nav('/login')
	}

	return (
		<header className='user_header'>
			{isBurgerActive && (
				<div className='menu__box'>
					<button
						className='user_header_close_button'
						onClick={() => setBurgerActive(false)}
					>
						✖
					</button>
					<nav className='user_header_burger_navbar'>
						<Link className='user_header_link' to='/'>
							Главная
						</Link>
						<Link className='user_header_link' to='/courses'>
							Курсы
						</Link>
						<Link className='user_header_link' to='/tests'>
							Тесты
						</Link>
						<Link className='user_header_link' to='/profile'>
							Профиль
						</Link>
					</nav>
				</div>
			)}
			<div className='container'>
				<div className='user_header_wrapper'>
					<div className='user_header_burger_wrapper'>
						<input
							id='menu__toggle'
							type='checkbox'
							onClick={() => setBurgerActive((prev) => !prev)}
						/>
						<label className='menu__btn' htmlFor='menu__toggle'>
							<span></span>
						</label>
					</div>
					<nav className='user_header_navbar'>
						<Link className='user_header_link' to='/'>
							Главная
						</Link>
						<Link className='user_header_link' to='/courses'>
							Курсы
						</Link>
						<Link className='user_header_link' to='/tests'>
							Тесты
						</Link>
						<Link className='user_header_link' to='/profile'>
							Профиль
						</Link>
					</nav>
					<div className='user_header_info_wrapper'>
						<p className='user_header_email'>{user.email}</p>
						<button onClick={logoutHandler} className='user_header_link'>
							Выход
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
