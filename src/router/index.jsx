import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from 'layouts/AdminLayout'
import { MainLayout } from 'layouts/MainLayout'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { ProtectedUserRoute } from './ProtectedUserRoute'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'
import { Courses } from 'pages/manage/read/courses'
import { Tests } from 'pages/manage/read/Tests'
import { Course } from 'pages/manage/read/Course'
import { AdminProvider } from 'providers/AdminProvider'

export const router = createBrowserRouter([
	{ element: <Login />, path: '/login' },
	{ element: <Register />, path: '/register' },
	{
		element: (
			<ProtectedAdminRoute>
				<AdminProvider>
					<AdminLayout />
				</AdminProvider>
			</ProtectedAdminRoute>
		),
		path: '/manage',
		children: [
			{
				element: <Courses />,
				path: 'courses',
				children: [{ element: <Course />, path: ':id' }],
			},
			{
				element: <Tests />,
				path: 'tests',
			},
		],
	},
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
