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
		const currentQuestion = test.questions[questionNumber]
		if (currentQuestion.correctAnswer === value) {
			setCorrectAnswers((prev) => prev + 1)
		}
		if (questionNumber === test.questions.length - 1) {
			setAction('finish')
			await axios.post('test/complete', {
				_id: test._id,
				result: `${correctAnswers} / ${test.questions.length}`,
			})
			return
		}
		setQuestionNumber((prev) => prev + 1)
	}

	return (
		<>
			{loading ? (
				<h1>Загружаю...</h1>
			) : (
				<section>
					<div className="container">
						<p>{test.title}</p>
						{action === 'preview' && (
							<button onClick={() => setAction('process')}>
								Начать
							</button>
						)}
						{action === 'process' && (
							<div>
								<p>
									Вопрос {questionNumber + 1}.{' '}
									{test.questions[questionNumber].question}
								</p>
								<div>
									{test.questions[questionNumber].answers.map(
										(a) => {
											return (
												<button
													key={a}
													onClick={() =>
														answerHandler(a)
													}
												>
													{a}
												</button>
											)
										}
									)}
								</div>
							</div>
						)}
						{action === 'finish' && (
							<div>
								<p>
									Результат:{' '}
									{`${correctAnswers} / ${test.questions.length}`}
								</p>
							</div>
						)}
					</div>
				</section>
			)}
		</>
	)
}
