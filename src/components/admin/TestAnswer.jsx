import { useState } from 'react'

export const TestAnswer = ({
	answerData,
	deleteAnswerHandler,
	saveAnswerHandler,
	index,
}) => {
	const [answer, setAnswer] = useState(answerData)

	return (
		<div
			style={{
				border: '1px solid gray',
				padding: '5px',
				marginTop: '15px',
			}}
		>
			<div style={{ display: 'flex', gap: '10px' }}>
				<p className='editTestInputTitle'>Ответ</p>
				<input
					className='editTestInput'
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
				/>
			</div>
			<button className='' onClick={() => saveAnswerHandler(answer, index)}>
				Сохранить
			</button>
			<button onClick={deleteAnswerHandler}>Удалить</button>
		</div>
	)
}
