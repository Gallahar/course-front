import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { AdminContext } from 'providers/AdminProvider'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

export const EditCourse = () => {
	const [loading, setLoading] = useState(true)
	const [currentCourse, setCurrentCourse] = useState({})
	const { setCourses, tests } = useContext(AdminContext)
	const courseId = useIdLocation()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [addedTests, setAddedTests] = useState([])

	useEffect(() => {
		const getCurrentCourse = async () => {
			try {
				const data = await axios.get(`course/${courseId}`)
				setCurrentCourse(data.data)
				setAddedTests(data.data.tests)
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
			setAddedTests((prev) => [...prev, test])
		} else {
			setAddedTests((prev) =>
				prev.filter((item) => item._id !== test._id)
			)
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		if (!text.trim() || !title.trim())
			return alert('Поля не могут быть пустыми')
		try {
			const dto = {
				_id: courseId,
				dto: {
					title,
					text,
					tests: addedTests,
				},
			}
			await axios.post('course/update', { ...dto })
			setCurrentCourse((prev) => ({ ...prev, title, text }))
			setCourses((prev) =>
				prev.filter((course) => course._id !== courseId)
			)
			setCourses((prev) => [...prev, currentCourse])
			alert('Курс успешно обновлен')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<>
			{loading ? (
				<h1>Загружаю...</h1>
			) : (
				<form onSubmit={handleUpdate} className="container-form">
					{currentCourse?.title ? (
						<h1>{`Обновить курс: "${currentCourse.title}"`}</h1>
					) : null}
					<input
						onChange={(e) => setTitle(e.target.value)}
						placeholder="обновить название"
					/>
					<textarea
						onChange={(e) => setText(e.target.value)}
						placeholder="обновить содержание"
					/>
					<div>
						<h1>Добавить тесты:</h1>
						{tests?.length ? (
							<ul>
								{tests.map((test) => (
									<label key={test._id}>
										{test.title}
										<input
											onChange={(e) =>
												handleChangeTests(e, test)
											}
											type="checkbox"
											defaultChecked={addedTests?.some(
												(t) => {
													return t._id === test._id
												}
											)}
										/>
									</label>
								))}
							</ul>
						) : null}
					</div>
					<button>обновить</button>
				</form>
			)}
		</>
	)
}
