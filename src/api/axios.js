import axios from 'axios'
import Cookies from 'js-cookie'

export const Axios = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	responseType: 'json',
	headers: {
		token: Cookies.get('token') ?? null,
	},
})
