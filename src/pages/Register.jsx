import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from 'api/axios'
import Cookies from 'js-cookie'
import { MainContext } from 'providers/MainProvider'

export const Register = () => {
	const { setUser } = useContext(MainContext)
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim() || !password.trim())
			return alert('fields must not be empty')
		try {
			const data = await axios.post('auth/register', {
				email,
				password,
			})
			Cookies.set('token', JSON.stringify(data.data.token))
			setUser(data.data.user)
			navigate('/')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className="auth_section">
			<div className="container">
				<form className="auth_form" onSubmit={handleSubmit}>
					<h1 className="auth_heading">Регистрация</h1>
					<input
						className="auth_input"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="введите адрес электронной почты"
					/>
					<input
						className="auth_input"
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="введите ваш пароль"
					/>
					<button className="auth_button" type="submit">
						зарегистрироваться
					</button>
					<Link className="auth_link" to="/login">
						{' '}
						У вас уже есть аккаунт?
					</Link>
				</form>
			</div>
		</section>
	)
}
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from 'api/axios'
import Cookies from 'js-cookie'
import { MainContext } from 'providers/MainProvider'

export const Register = () => {
	const { setUser } = useContext(MainContext)
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim() || !password.trim())
			return alert('fields must not be empty')
		try {
			const data = await axios.post('auth/register', {
				email,
				password,
			})
			Cookies.set('token', JSON.stringify(data.data.token))
			setUser(data.data.user)
			navigate('/')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className="auth_section">
			<div className="container">
				<form className="auth_form" onSubmit={handleSubmit}>
					<h1 className="auth_heading">Регистрация</h1>
					<input
						className="auth_input"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="enter your email"
					/>
					<input
						className="auth_input"
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="enter your password"
					/>
					<button className="auth_button" type="submit">
						зарегистрироваться
					</button>
					<Link className="auth_link" to="/login">
						{' '}
						У вас уже есть аккаунт?
					</Link>
				</form>
			</div>
		</section>
	)
}
