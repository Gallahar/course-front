import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MainProvider } from 'providers/MainProvider'
import { router } from 'router/index.jsx'

import 'assets/styles/global.css'             // инициализация всего приложения, оборачиваем его в главный контекст и подключаем наш router.


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MainProvider>
			<RouterProvider router={router} />
		</MainProvider>
	</React.StrictMode>
)
