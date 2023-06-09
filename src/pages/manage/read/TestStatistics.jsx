import { axios } from 'api/axios'
import { useIdLocation } from 'hooks/useIdLocation'
import { useEffect, useState } from 'react'

export const TestStatistics = () => {
	const [test, setTest] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const id = useIdLocation()

	useEffect(() => {
		const getTestById = async () => {
			try {
				const data = await axios.get(`/test/statistics/${id}`)
				setTest(data.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		getTestById()
	}, [])

	return (
		<>
			{isLoading ? (
				<h1>Загружаю...</h1>
			) : (
				<div className="testCard">
					<h1>{test.title}</h1>
					<hr />
					<div className="resultWrapper">
						<h1>Статистика по тесту:</h1>
						{test.results.map(({ user, result }) => (
							<div className="resultCard">
								<p>{`Пользователь: ${user.email}`}</p>
								<p>{`Результат: ${result}`}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}
