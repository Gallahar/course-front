import { useState } from 'react'
import { TestAnswer } from './TestAnswer'

export const TestQuestion = ({
	q,
	deleteQuestionHandler,
	saveQuestionHandler,
	index,
}) => {
	const {
		question: questionData,
		_id,
		answers: answersData,
		correctAnswer: correctAnswerData,
	} = q

	const [question, setQuestion] = useState(questionData)
	const [answers, setAnswers] = useState(answersData)
	const [correctAnswer, setCorrectAnswer] = useState(correctAnswerData)

	const addAnswer = () => {
		setAnswers((prev) => [...prev, ''])
	}

	const saveAnswerHandler = (answer, index) => {
		const updatedAnswers = []
		for (let i = 0; i < answers.length; i++) {
			if (i !== index) {
				updatedAnswers.push(answers[i])
			} else {
				updatedAnswers.push(answer)
			}
		}
		setAnswers(updatedAnswers)
		alert('Ответ сохранен!')
	}

	const deleteAnswerHandler = (index) => {
		const updatedAnswers = []
		for (let i = 0; i < answers.length; i++) {
			if (i !== index) {
				updatedAnswers.push(answers[i])
			}
		}
		setAnswers(updatedAnswers)
	}

	return (
		<div className='admin_form_wrapper'>
			<div className='admin_test_wrapper'>
				<p className='admin_course_title'>Вопрос</p>
				<input
					className='admin_input'
					onChange={(e) => setQuestion(e.target.value)}
					value={question}
				/>
			</div>
			<button
				style={{ marginTop: '10px' }}
				className='admin_table_button'
				onClick={addAnswer}
			>
				Добавить ответ
			</button>
			{answers.map((a, i) => (
				<TestAnswer
					key={a + i}
					index={i}
					answerData={a}
					saveAnswerHandler={saveAnswerHandler}
					deleteAnswerHandler={() => deleteAnswerHandler(i)}
				/>
			))}
			<div style={{ marginTop: '20px' }}>
				<p className='admin_course_title'>Правильный ответ</p>
				<input
					className='admin_input'
					onChange={(e) => setCorrectAnswer(e.target.value)}
					value={correctAnswer}
				/>
			</div>
			<div style={{ marginTop: '20px' }}>
				<button
					className='admin_table_button'
					style={{ marginRight: '10px' }}
					onClick={() =>
						saveQuestionHandler(answers, correctAnswer, question, index)
					}
				>
					Сохранить вопрос
				</button>
				<button className='admin_table_button' onClick={deleteQuestionHandler}>
					Удалить вопрос
				</button>
			</div>
		</div>
	)
}
