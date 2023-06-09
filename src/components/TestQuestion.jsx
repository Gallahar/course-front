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
		<div
			style={{
				border: '3px solid gray',
				padding: '10px',
				marginBottom: '15px',
			}}
		>
			<div style={{ display: 'flex', gap: '10px' }}>
				<p>Вопрос</p>
				<input value={question} onChange={(e) => setQuestion(e.target.value)} />
			</div>
			<button onClick={addAnswer}>Добавить ответ</button>
			{answers.map((a, i) => (
				<TestAnswer
					key={a + i}
                    index={i}
					answerData={a}
					saveAnswerHandler={saveAnswerHandler}
					deleteAnswerHandler={() => deleteAnswerHandler(i)}
				/>
			))}
			<div style={{ display: 'flex', gap: '10px' }}>
				<p>Правильный ответ</p>
				<input
					value={correctAnswer}
					onChange={(e) => setCorrectAnswer(e.target.value)}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					border: '3px solid gray',
					padding: '10px',
				}}
			>
				<button
					onClick={() =>
						saveQuestionHandler(answers, correctAnswer, question, index)
					}
				>
					Сохранить
				</button>
				<button onClick={deleteQuestionHandler}>Удалить</button>
			</div>
		</div>
	)
}
