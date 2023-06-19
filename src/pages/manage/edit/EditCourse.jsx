import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { AdminContext } from 'providers/AdminProvider'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

export const EditCourse = () => {
	const [loading, setLoading] = useState(true)
	const [currentCourse, setCurrentCourse] = useState({})
	const { setCourses, tests } = useContext(AdminContext)                                 // берем состояние тестов из глобального контекста
	const courseId = useIdLocation()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [addedTests, setAddedTests] = useState([])

	useEffect(() => {
		const getCurrentCourse = async () => {
			try {
				const data = await axios.get(`course/${courseId}`)                                // получение курса: делаем запрос на сервер и указываем  идентификатор курса, который получаем из адреса страницы.
				setCurrentCourse(data.data)
				setAddedTests(data.data.tests)
				setTitle(data.data.title)                            // при успехе устанавливаем новое состояние курса и добавленных в него тестов.
				setText(data.data.text)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		getCurrentCourse()
	}, [])

	const handleChangeTests = (e, test) => {
		if (e.target.checked) {
			setAddedTests((prev) => [...prev, test])                                                 // добавление тестов в курсу, в случае если чекбокс стоит  - фильтруем массив добавленных тестов, если же нет - добавляем выбранный тест к курсу. 
		} else {
			setAddedTests((prev) => prev.filter((item) => item._id !== test._id))
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		if (!text.trim() || !title.trim())
			return alert('Поля не могут быть пустыми')                               // Валидируем поля , чтобы небыли пустыми.
		try {
			const dto = {
				_id: courseId,
				dto: {
					title,
					text,                                                                              
					tests: addedTests,
				},
			}
			const res = await axios.post('course/update', dto)             // Отправляем запрос на сервер с новыми данными курса и добавленными тестами, в случае успеха меняем состояние на новое.
			setCurrentCourse(res.data)
			setCourses((prev) =>
				prev.map((course) => (course._id === courseId ? res.data : course))
			)
			alert('Курс успешно обновлен')                                           
		} catch (error) {
			alert(error.message)              // не забываем отловить ошибку.
		}
	}

	return (
		<>
			{loading ? null : (
				<form onSubmit={handleUpdate} className='container'>
					{currentCourse?.title ? (
						<p className='admin_course_heading'>{`Обновить курс "${currentCourse.title}"`}</p>
					) : null}
					<div>
						<div className='admin_form_wrapper'>
							<p className='admin_course_title'>Название курса</p>
							<input
								className='admin_input'
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
						</div>
						<div className='admin_form_wrapper'>
							<p className='admin_course_title'>Содержание курса</p>
							<textarea
								className='admin_area'
								onChange={(e) => setText(e.target.value)}
								rows={15}
								value={text}
							/>
						</div>
					</div>
					<div className='admin_course_tests'>
						<p className='admin_course_heading'>Добавить тесты к курсу</p>
						{tests?.length ? (
							<div className='admin_course_tests_wrapper'>
								{tests.map((test) => {
									if (!test.title) return
									return (
										<label className='course_test_wrapper' key={test._id}>
											<p className='admin_course_test_title'>{test.title}</p>
											<input
												onChange={(e) => handleChangeTests(e, test)}
												type='checkbox'
												defaultChecked={addedTests?.some((t) => {
													return t._id === test._id
												})}
											/>
										</label>
									)
								})}
							</div>
						) : null}
					</div>
					<button className='admin_table_button'>обновить</button>
				</form>
			)}
		</>
	)
}
