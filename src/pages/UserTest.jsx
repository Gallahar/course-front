import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axios } from 'api/axios'
import Cookies from 'js-cookie'
import { useIdLocation } from 'hooks/useIdLocation'

export const UserTest = () => {
	const testId = useIdLocation()
	const [loading, setIsLoading] = useState(true)
	const [test, setTest] = useState({})
	const [action, setAction] = useState('preview')
	const [questionNumber, setQuestionNumber] = useState(0)
	const [correctAnswers, setCorrectAnswers] = useState(0)

	useEffect(() => {
		const getTestById = async () => {
			try {
				const data = await axios.get(`/test/${testId}`)   // делаем запрос на сервер и получаем данные курса по его идентификатору.
				setTest(data.data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		getTestById()
	}, [])

	const answerHandler = async (value) => {          // функция ответа на вопрос в тесте, передаем в нее значение которое выбрал пользователь, если оно совпадает с правильным ответом - увеличиваем количество правильных ответов на 1.
		const token = Cookies.get('token')

		const currentQuestion = test.questions[questionNumber]

		const isAnswerCorrect = currentQuestion.correctAnswer === value

		if (isAnswerCorrect) {
			setCorrectAnswers((prev) => prev + 1)
		}
		if (questionNumber === test.questions.length - 1) {      // если индекс текущего вопроса равняется индексу последнего элемента в массиве вопросов завершаем тест, и отправляем статистику с ответами на сервер.
			setAction('finish')
			await axios.post(
				'test/complete',
				{
					_id: test._id,
					result: `${
						isAnswerCorrect ? correctAnswers + 1 : correctAnswers
					} / ${test.questions.length}`,
				},
				{
					headers: {
						token: token ? JSON.parse(token) : null,
					},
				}
			)
			return
		}
		setQuestionNumber((prev) => prev + 1)        // если ни одно условие не совпало увеличиваем индекс текущего вопроса на 1.
	}

	return (
		<>
			{loading ? null : (
				<section>
					<div className="container">
						<div className="test_container">
							<p className="test_title">Тест "{test.title}"</p>
							{action === 'preview' && (
								<button
									className="test_button_start"
									onClick={() => setAction('process')}
								>
									Начать
								</button>
							)}
							{action === 'process' && (
								<div className="test_questions_wrapper">
									<div className="test_question_wrapper">
										<p className="test_question">
											{
												test.questions[questionNumber]
													.question
											}
										</p>
										<p className="test_question_number">
											Вопрос {questionNumber + 1} /{' '}
											{test.questions.length}{' '}
										</p>
									</div>
									<div className="test_answers_wrapper">
										{test.questions[
											questionNumber
										].answers.map((a, i) => {
											return (
												<button
													className="test_answer_button"
													key={a}
													onClick={() =>
														answerHandler(a)
													}
												>
													{i + 1}. {a}
												</button>
											)
										})}
									</div>
								</div>
							)}
							{action === 'finish' && (
								<div>
									<p className="test_result">
										Ваш результат:{' '}
										{`${correctAnswers} / ${test.questions.length}`}
									</p>
									<Link to="/profile">
										<p className="test_note">
											* Перейдите в профиль для просмотра
											всех своих результатов
										</p>
									</Link>
								</div>
							)}
						</div>
					</div>
				</section>
			)}
		</>
	)
}
