import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from 'api/axios'

export const Register = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim() || !password.trim())
			return alert('fields must not be empty')
		try {
			const data = await Axios.post('/register', {
				data: { email, password },
			})
			Cookies.set('token', JSON.stringify(data.data.token))
			navigate('/sign')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className="section">
			<form onSubmit={handleSubmit} className="form-container">
				<h1>Register</h1>
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
				<button type="submit" className="form-btn">
					Login
				</button>
				<Link to="/login"> Already have an account?</Link>
			</form>
		</section>
	)
}
