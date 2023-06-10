import { useState } from 'react'

export const TestAnswer = ({
	answerData,
	deleteAnswerHandler,
	saveAnswerHandler,
	index,
}) => {
	const [answer, setAnswer] = useState(answerData)

	return (
		<div className='admin_test_answer_wrapper'>
			<div>
				<p className='admin_course_title'>{index + 1}) Ответ</p>
				<input
					className='admin_input'
					onChange={(e) => setAnswer(e.target.value)}
					value={answer}
				/>
			</div>
			<button
				className='admin_table_button'
				style={{ marginRight: '10px', marginTop: '10px' }}
				onClick={() => saveAnswerHandler(answer, index)}
			>
				Сохранить ответ
			</button>
			<button className='admin_table_button' onClick={deleteAnswerHandler}>
				Удалить ответ
			</button>
		</div>
	)
}
