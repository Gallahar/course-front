import { useState } from 'react'
import { TestAnswer } from './TestAnswer'

export const TestQuestion = ({ // прокидываем в компонент функции для обработчиков событий :  удаление вопроса, сохранение вопроса. 
	q,
	deleteQuestionHandler,
	saveQuestionHandler,
	index,
}) => {
	const {
		question: questionData, // деструктурируем прокинутые данные - вопрос, массив ответов и правильный ответ.
		_id,
		answers: answersData,
		correctAnswer: correctAnswerData,
	} = q

	const [question, setQuestion] = useState(questionData)
	const [answers, setAnswers] = useState(answersData)
	const [correctAnswer, setCorrectAnswer] = useState(correctAnswerData)

	const addAnswer = () => {
		setAnswers((prev) => [...prev, '']) // функция добавления нового ответа, копируем  массив ответов и добавляем у нему "пустой ответ " который затем можно будет изменить.
	}

	const saveAnswerHandler = (answer, index) => {
		// функция сохранения ответа, принимает в себя индекс ответа который мы хотим сохранить и его новое значение, если индекс совпадает со значением переменной в цикле - добавляем в массив новое значение, в противном случае добавляем старое.
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
		// функция удаления ответа -  передаем в нее индекс ответа, если он совпадает с переменной в цикле, мы его пропускаем, а остальные добавляем в массив.
		const updatedAnswers = []
		for (let i = 0; i < answers.length; i++) {
			if (i !== index) {
				updatedAnswers.push(answers[i])
			}
		}
		setAnswers(updatedAnswers)
	}

	return (
		<div className="admin_form_wrapper">
			<div className="admin_test_wrapper">
				<p className="admin_course_title">Вопрос</p>
				<input
					className="admin_input"
					onChange={(e) => setQuestion(e.target.value)}
					value={question}
				/>
			</div>
			<button
				style={{ marginTop: '10px' }}
				className="admin_table_button"
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
				<p className="admin_course_title">Правильный ответ</p>
				<input
					className="admin_input"
					onChange={(e) => setCorrectAnswer(e.target.value)}
					value={correctAnswer}
				/>
			</div>
			<div style={{ marginTop: '20px' }}>
				<button
					className="admin_table_button"
					style={{ marginRight: '10px' }}
					onClick={() =>
						saveQuestionHandler(
							answers,
							correctAnswer,
							question,
							index
						)
					}
				>
					Сохранить вопрос
				</button>
				<button
					className="admin_table_button"
					onClick={deleteQuestionHandler}
				>
					Удалить вопрос
				</button>
			</div>
		</div>
	)
}
