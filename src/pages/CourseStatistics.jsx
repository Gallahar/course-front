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
			{isLoading ? null : (
				<div className='container'>
					<h1>Статистика курса "{course?.title}"</h1>
					<div className='table'>
						<div className='table_head'>
							<p className='table_number head_item'>#</p>
							<p className='table_title head_item'>Пользователь</p>
						</div>
						{course.userCompleted.map(({ email }, i) => {
							return (
								<div key={email + i} className='table_item'>
									<p className='table_number'>{i + 1}.</p>
									<p className='table_title'>{email}</p>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}
