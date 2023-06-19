import { axios } from 'api/axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const UserTests = () => {
	const [tests, setTests] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const data = await axios.get('test/find') // делаем запрос на сервер и получаем массив всех тестов.
				setTests(data.data)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchTests()
	}, [])

	return isLoading ? null : (
		<div className='container'>
			<div className='table'>
				<div className='table_head'>
					<p className='table_number head_item'>#</p>
					<p className='table_title head_item'>Название теста</p>
					<p className='table_quantity head_item'>Вопросов</p>
					<p className='table_quantity head_item'>Пройден раз</p>
				</div>
				{tests.map(({ title, questions, _id, results }, i) => (
					<div key={_id} className='table_item'>
						<p className='table_number'>{i + 1}.</p>
						<Link to={`/tests/${_id}`} className='table_title'>
							{title}
						</Link>
						<p className='table_quantity'>{questions.length} в.</p>
						<p className='table_quantity'>{results.length} р.</p>
					</div>
				))}
			</div>
		</div>
	)
}
