import { useContext, useState, useEffect } from 'react'
import { axios } from 'api/axios'
import { MainContext } from 'providers/MainProvider'
import { useIdLocation } from 'hooks/useIdLocation'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'


export const UserCourse = () => {

	const token = Cookies.get('token')
	const { user } = useContext(MainContext)
	const [isCompleted, setIsCompleted] = useState(false)
	const courseId = useIdLocation()
	const [isLoading, setIsLoading] = useState(true)
	const [course, setCourse] = useState({})
	useEffect(() => {
		const getCourseById = async () => {
			try {
				const data = await axios.get(`/course/${courseId}`)                   //при инициализации компонента(страницы) делаем запрос на сервер и получаем курс по идентификатору.
				setCourse(data.data)
				setIsCompleted(data.data.userCompleted.includes(user._id))  // если курс уже был завершен - меняем состояние .
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		getCourseById()
	}, [])
 
	const completeHandler = async () => {           // запрос на сервер , передаем идентификатор курса и помечаем его выполненным для текущего пользователя.
		setIsCompleted(true)
		await axios.post(
			'course/complete',
			{
				_id: course._id,
			},
			{
				headers: {
					token: token ? JSON.parse(token) : null,
				},
			}
		)
	}

	return (
		<>
			{isLoading ? null : (
				<section>
					<div className="container">
						<div className="course_wrapper">
							<p className="course_title">
								Курс "{course.title}"
							</p>
							<p className="course_text">{course.text}</p>
						</div>
						<p className="course_tests_title">
							Тесты по данному курсу
						</p>
						<div className="table">
							<div className="table_head">
								<p className="table_number head_item">#</p>
								<p className="table_title head_item">
									Название теста
								</p>
							</div>
							{course.tests.map(({ title, _id }, i) => {
								return (
									<div key={title} className="table_item">
										<p className="table_number">{i + 1}.</p>
										<Link
											to={`/tests/${_id}`}
											className="table_title"
										>
											{title}
										</Link>
									</div>
								)
							})}
						</div>
						{!isCompleted && (
							<>
								<br />
								<button
									className="admin_table_button"
									onClick={completeHandler}
								>
									Я прошел курс
								</button>
							</>
						)}
					</div>
				</section>
			)}
		</>
	)
}

