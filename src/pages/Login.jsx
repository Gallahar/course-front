import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from 'api/axios'
import Cookies from 'js-cookie'
import { MainContext } from 'providers/MainProvider'

export const Login = () => {
	const { setUser } = useContext(MainContext)               
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	

	const handleSubmit = async (e) => {                     // функция для отправки данных на сервер
		e.preventDefault()

		if (!email.trim() || !password.trim())
			return alert('fields must not be empty')   // валидируем форму, проверяем на то чтобы поля не были пустыми.
		try {
			const data = await axios.post('auth/login', {
				email,
				password,
			})                        //дожидаемся ответа , в случае успеха сетим токен и данные юзера,перенаправляем его на главную страницу приложения
			Cookies.set('token', JSON.stringify(data.data.token))
			setUser(data.data.user)
			navigate('/')
		} catch (error) {                    // отлавливаем ошибку если что-то пошло не так.
			alert(error.message)
		}
	}

	return (
		<section className="auth_section">
			<div className="container">
				<form className="auth_form" onSubmit={handleSubmit}>
					<h1 className="auth_heading">Вход</h1>
					<input
						className="auth_input"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="введите адрес электронной почты"
					/>
					<input
						type="password"
						className="auth_input"
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="введите ваш пароль"
					/>
					<button className="auth_button" type="submit">
						войти
					</button>
					<Link className="auth_link" to="/register">
						{' '}
						У вас нету аккаунта?
					</Link>
				</form>
			</div>
		</section>
	)
}
