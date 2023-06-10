import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
				const data = await axios.get(`/test/${testId}`)
				setTest(data.data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		getTestById()
	}, [])

	const answerHandler = async (value) => {
		const token = Cookies.get('token')

		const currentQuestion = test.questions[questionNumber]
		if (currentQuestion.correctAnswer === value) {
			setCorrectAnswers((prev) => prev + 1)
		}
		if (questionNumber === test.questions.length - 1) {
			setAction('finish')
			await axios.post(
				'test/complete',
				{
					_id: test._id,
					result: `${correctAnswers} / ${test.questions.length}`,
				},
				{
					headers: {
						token: token ? JSON.parse(token) : null,
					},
				}
			)
			return
		}
		setQuestionNumber((prev) => prev + 1)
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
