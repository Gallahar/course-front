import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from 'api/axios'
import Cookies from 'js-cookie'

export const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim() || !password.trim())
			return alert('fields must not be empty')
		try {
			const data = await axios.post('auth/login', {
				email,
				password,
			})
			Cookies.set('token', JSON.stringify(data.data.token))
			navigate('/sign')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className="section">
			<div className="container">
				<form className="container-form" onSubmit={handleSubmit}>
					<h1>Login</h1>
					<input
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="enter your email"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="enter your password"
					/>
					<button type="submit">Login</button>
					<Link to="/register"> Need an account?</Link>
				</form>
			</div>
		</section>
	)
}
