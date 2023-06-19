import { axios } from 'api/axios'
import dayjs from 'dayjs'
import { useIdLocation } from 'hooks/useIdLocation'
import { useEffect, useState } from 'react'

export const TestStatistics = () => {
	const [test, setTest] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const id = useIdLocation()

	useEffect(() => {
		const getTestById = async () => {
			try {
				const data = await axios.get(`/test/statistics/${id}`) // при инициализации компонента делаем запрос на сервер - получение статистики теста по идентификатору  который берем из адреса страницы.
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
			{isLoading ? null : (
				<div className='container'>
					<h1>Статистика теста "{test.title}"</h1>

					<div className='table'>
						<div className='table_head'>
							<p className='table_number head_item'>#</p>
							<p className='table_title head_item'>Пользователь</p>
							<p className='table_quantity head_item'>Результат</p>
							<p className='table_quantity head_item'>Дата</p>           
						</div>
						{test.results.map(({ user, result, date: notFormatedDate }, i) => {
							const date = dayjs(notFormatedDate).format('MMM, ddd - HH:mm')
							return (
								<div key={user + i} className='table_item'>
									<p className='table_number'>{i + 1}.</p>
									<p className='table_title'>{user.email}</p>
									<p className='table_quantity'>{result}</p>
									<p className='table_quantity'>{date}</p>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}
