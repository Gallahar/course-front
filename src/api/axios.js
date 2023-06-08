import Axios from 'axios'
import Cookies from 'js-cookie'

export const axios = Axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	responseType: 'json',
	headers: {
		token: Cookies.get('token') ?? null,
	},
})
