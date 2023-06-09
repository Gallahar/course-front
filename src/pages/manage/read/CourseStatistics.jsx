import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { useEffect, useState } from 'react'

export const CourseStatistics = () => {
	const [course, setCourse] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const id = useIdLocation()

	useEffect(() => {
		const getCourseById = async () => {
			try {
				const data = await axios.get(`/course/statistics/${id}`)
				setCourse(data.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		getCourseById()
	}, [])

	return (
		<>
			{isLoading ? (
				<h1>Загружаю...</h1>
			) : (
				<div className="courseCard">
					<h1>{course?.title}</h1>
					<hr />
					<p>{course?.text}</p>
					<hr />
					<ul>
						Выполнен пользователями:
						{course.userCompleted.map(({ email, _id }) => (
							<li key={_id}>{email}</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}
