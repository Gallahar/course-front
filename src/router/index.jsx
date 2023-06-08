import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from 'layouts/AdminLayout'
import { MainLayout } from 'layouts/MainLayout'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { ProtectedUserRoute } from './ProtectedUserRoute'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'
import { Courses } from 'pages/manage/read/courses'
import { Tests } from 'pages/manage/read/Tests'
import { UserTest } from 'pages/UserTest'
import { Course } from 'pages/manage/read/Course'
import { EditCourse } from 'pages/manage/edit/EditCourse'
import { UserCourse } from 'pages/UserCourse'
import { EditTest } from 'pages/manage/edit/EditTest'

export const router = createBrowserRouter([
	{ element: <Login />, path: '/login' },
	{ element: <Register />, path: '/register' },
	{
		element: (
			<ProtectedAdminRoute>
				<AdminLayout />
			</ProtectedAdminRoute>
		),
		path: '/manage',
		children: [
			{
				element: <Courses />,
				path: 'courses',
			},
			{ element: <Course />, path: 'courses/:id' },
			{ element: <EditCourse />, path: 'courses/edit/:id' },
			{
				element: <Tests />,
				path: 'tests',
			},
			{ element: <EditTest />, path: 'tests/edit/:id' },
		],
	},
	{
		element: <MainLayout />,
		path: '/',
		children: [
			{ element: <UserTest />, path: 'tests/:id' },
			{ element: <UserCourse />, path: 'courses/:id' },
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
