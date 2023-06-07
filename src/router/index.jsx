import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from 'layouts/AdminLayout'
import { MainLayout } from 'layouts/MainLayout'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { ProtectedUserRoute } from './ProtectedUserRoute'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'

export const router = createBrowserRouter([
	{ element: <Login />, path: '/login' },
	{ element: <Register />, path: '/register' },
	
])








// {
// 		element: (
// 			<ProtectedUserRoute>
// 				<MainLayout />
// 			</ProtectedUserRoute>
// 		),
// 		path: '/',
// 		children: [
// 			{ path: 'test/:id', element: <Chats /> },
// 			{ path: 'course/:id', element: <ChatPage /> },
// 			{ path: 'profile/:id', element: <ProfilePage /> },
// 		],
// 	},
// 	{
// 		element: (
// 			<ProtectedAdminRoute>
// 				<AdminLayout />
// 			</ProtectedAdminRoute>
// 		),
// 		path: '/manage',
// 		children: [
// 			{
// 				path: 'courses',
// 				children: [{ path: ':id' }, { path: '/edit/:id' }],
// 			},
// 			{
// 				path: 'tests',
// 				children: [{ path: ':id' }, { path: '/edit/:id' }],
// 			},
// 		],
// 	},