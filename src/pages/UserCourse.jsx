import { useContext, useState, useEffect } from 'react'
import { axios } from 'api/axios'
import { MainContext } from 'providers/MainProvider'
import { useIdLocation } from 'hooks/useIdLocation'
import { Link } from 'react-router-dom'

export const UserCourse = () => {
	const { user } = useContext(MainContext)
	const [isCompleted, setIsCompleted] = useState(false)
	const courseId = useIdLocation()
	const [isLoading, setIsLoading] = useState(true)
	const [course, setCourse] = useState({})
	useEffect(() => {
		const getCourseById = async () => {
			try {
				const data = await axios.get(`/course/${courseId}`)
				setCourse(data.data)
				setIsCompleted(data.data.userCompleted.includes(user._id))
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		getCourseById()
	}, [])

	const completeHandler = async () => {
		setIsCompleted(true)
		await axios.post('course/complete', {
			_id: course._id,
		})
	}

	return (
		<>
			{isLoading ? (
				<h1>Загружаю...</h1>
			) : (
				<section>
					<div className='container'>
						<h2>Курс "{course.title}"</h2>
						<p className='courseText'>{course.text}</p>
						<p className='courseTestsTitle'>Тесты по данному курсу</p>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							{course.tests.map((t, i) => (
								<Link
									className='courseTestLink'
									key={t._id}
									to={`/tests/${t._id}`}
								>
									{i + 1}) {t.title}
								</Link>
							))}
						</div>
						{!isCompleted && (
							<button onClick={completeHandler}>Я прошел курс</button>
						)}
					</div>
				</section>
			)}
		</>
	)
}
