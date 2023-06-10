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
import { CourseStatistics } from 'pages/manage/read/CourseStatistics'
import { TestStatistics } from 'pages/manage/read/TestStatistics'
import { EditCourse } from 'pages/manage/edit/EditCourse'
import { UserCourse } from 'pages/UserCourse'
import { EditTest } from 'pages/manage/edit/EditTest'
import { Main } from 'pages/Main'
import { UserTests } from 'pages/UserTests'
import { UserCourses } from 'pages/UserCourses'
import { Profile } from 'pages/Profile'

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
			{ element: <CourseStatistics />, path: 'courses/:id' },
			{ element: <EditCourse />, path: 'courses/edit/:id' },
			{
				element: <Tests />,
				path: 'tests',
			},
			{ element: <TestStatistics />, path: 'tests/:id' },
			{ element: <EditTest />, path: 'tests/edit/:id' },
		],
	},
	{
		element: (
			<ProtectedUserRoute>
				<MainLayout />
			</ProtectedUserRoute>
		),
		children: [
			{ element: <Main />, path: '/' },
			{ element: <Profile />, path: 'profile' },
			{ element: <UserTest />, path: 'tests/:id' },
			{ element: <UserTests />, path: 'tests' },
			{ element: <UserCourse />, path: 'courses/:id' },
			{ element: <UserCourses />, path: 'courses' },
		],
	},
])
