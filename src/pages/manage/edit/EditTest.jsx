import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { AdminContext } from 'providers/AdminProvider'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { TestQuestion } from 'components/admin/TestQuestion'

export const EditTest = () => {
	const [loading, setLoading] = useState(true)
	const [currentTest, setCurrentTest] = useState({})
	const [questions, setQuestions] = useState([])
	const { setTests } = useContext(AdminContext)
	const testId = useIdLocation()
	const [title, setTitle] = useState('')

	useEffect(() => {
		const getCurrentTest = async () => {
			try {
				const data = await axios.get(`test/${testId}`)                      // при загрузке компонента делаем запрос на сервер, используя идентификатор страницы и получаем тест, передаем в функцию данные которые нам пришли с сервера.
				setCurrentTest(data.data)
				setTitle(data.data.title)
				setQuestions(data.data.questions)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)                  // не забываем отловить ошибку и отметить что загрузка была завершена.
			}
		}
		getCurrentTest()
	}, [])


	const handleUpdate = async () => {
		if (!title) return alert('Название теста обязательно')
		if (questions.length === 0)
			return alert('Необходимо добавить хотя бы 1 вопрос')            // функция для отправки новых данных по тесту
		for (let i = 0; i < questions.length; i++) {
			const { answers, question, correctAnswer } = questions[i]                   // проходимся по массиву вопросов,проверяем чтобы хотя бы один ответ совпадал с правильным.
			if (answers.length < 2) return alert('Введите минимум 2 ответа')
			if (!question) return alert('Введите название вопроса')
			if (!answers.includes(correctAnswer))
				return alert(
					'Правильный ответ должен совпадать с одним из ответов'
				)
			for (let i = 0; i < answers.length; i++) {
				if (!answers[i]) return alert('Ответ не может быть пустым')            // проверяем чтобы ни один ответ не был пустым.
			}
		}
		try {
			const dto = {
				_id: currentTest._id,
				dto: {
					title,
					questions,
				},
			}
			const res = await axios.post('test/update', dto)                  // делаем запрос на сервер если валидация успешна, берем данные с ответа и меняем состояние теста, а так же все состояние тестов в глобальном контексте.
			setCurrentTest(res.data)
			setTests((prev) =>
				prev.map((test) =>
					test._id === currentTest._id ? res.data : test
				)
			)
			alert('Тест успешно обновлен')
		} catch (e) {
			console.log(e)
		}
	}

	const addQuestionHandler = () => {
		setQuestions((prev) => [
			...prev,
			{ answers: [], correctAnswer: '', question: '' },                 // создание вопроса, копируем предыдущее состояние, и добавляем новый вопрос.
		])
	}

	const saveQuestionHandler = (answers, correctAnswer, question, index) => {               // функция сохранения  каждого вопроса, передаем в нее массив ответов, правильный ответ , сам вопрос и его индекс.
		if (answers.length < 2) return alert('Введите минимум 2 ответа')
		if (!question) return alert('Введите название вопроса')
		if (!answers.includes(correctAnswer))
			return alert('Правильный ответ должен совпадать с одним из ответов')         
		for (let i = 0; i < answers.length; i++) {
			if (!answers[i]) return alert('Ответ не может быть пустым')          
		}
		const updatedQuestions = []
		for (let i = 0; i < questions.length; i++) {
			if (i !== index) {
				updatedQuestions.push(questions[i])
			} else {
				updatedQuestions.push({ answers, correctAnswer, question })
			}
		}
		setQuestions(updatedQuestions)              // при успешной валидации сохраняем состояние вопросов.
		alert('Вопрос сохранен!')
	}

	const deleteQuestionHandler = (index) => {
		const updatedQuestions = []                             // функция удаления вопроса по его индексу.
		for (let i = 0; i < questions.length; i++) {
			if (i !== index) {
				updatedQuestions.push(questions[i])       // если индекс не совпадает с переменной в цикле оставляем вопрос в массиве.
			}
		}
		setQuestions(updatedQuestions)
	}

	return (
		<>
			{loading ? null : (
				<div className="container">
					{currentTest?.title ? (
						<h1>{`Обновить тест: "${currentTest.title}"`}</h1>
					) : null}
					<div
						className="admin_form_wrapper"
						style={{ marginBottom: '10px' }}
					>
						<p className="admin_course_title">Название теста</p>
						<input
							className="admin_input"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
						/>
					</div>
					<button
						onClick={addQuestionHandler}
						className="admin_table_button"
					>
						Добавить вопрос
					</button>
					<div>
						{questions.map((question, i) => (
							<TestQuestion
								q={question}
								key={question.question + i}
								deleteQuestionHandler={() =>
									deleteQuestionHandler(i)
								}
								index={i}
								saveQuestionHandler={saveQuestionHandler}
							/>
						))}
					</div>
					<button
						style={{ marginTop: '30px' }}
						className="admin_table_button"
						onClick={handleUpdate}
					>
						Обновить тест
					</button>
				</div>
			)}
		</>
	)
}
