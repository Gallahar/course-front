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
			navigate('/sign')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<section className="section">
			<div className="container">
				<form className="container-form" onSubmit={handleSubmit}>
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
					<button type="submit">register</button>
					<Link to="/login"> Already have an account?</Link>
				</form>
			</div>
		</section>
	)
}
