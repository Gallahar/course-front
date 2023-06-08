import Axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const axios = Axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	responseType: 'json',
	headers: {
		token: token ? JSON.parse(token) : null,
	},
})
