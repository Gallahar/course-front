import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { AdminContext } from 'providers/AdminProvider'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

export const EditTest = () => {
	const [loading, setLoading] = useState(true)
	const [currentTest, setCurrentTest] = useState({})
	const [addedQuestions, setAddedQuestions] = useState([])
	const { setTests } = useContext(AdminContext)
	const testId = useIdLocation()
	const [title, setTitle] = useState('')

	useEffect(() => {
		const getCurrentTest = async () => {
			try {
				const data = await axios.get(`test/${testId}`)
				setCurrentTest(data.data)
				setAddedQuestions(data.data.questions)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		getCurrentTest()
	}, [])

	const handleUpdate = async (e) => {
		e.preventDefault()
	}

	return (
		<>
			{loading ? (
				<h1>Загружаю...</h1>
			) : (
				<form onSubmit={handleUpdate} className="container-form">
					{currentTest?.title ? (
						<h1>{`Обновить тест: "${currentTest.title}"`}</h1>
					) : null}
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="обновить название"
					/>
					<div>
            
						{addedQuestions.map(({ question, _id, answers }) => (
							<div key={_id}>
								<h1>{question}</h1>
								<ul>
									{answers.map((answer,id) => (
										<p key={id}>{answer}</p>
									))}
								</ul>
							</div>
						))}
					</div>
					<button>обновить</button>
				</form>
			)}
		</>
	)
}
