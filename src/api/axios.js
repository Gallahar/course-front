import Axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
                  
export const axios = Axios.create({                         // Создание axios instance  для того чтобы переиспользовать его во всем приложении.
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	responseType: 'json',
	headers: {
		token: token ? JSON.parse(token) : null,
	},
})
