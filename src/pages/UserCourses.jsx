import { axios } from 'api/axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const UserCourses = () => {
	const [courses, setCourses] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await axios.get('course/find')
				setCourses(data.data)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchCourses()
	}, [])

	return isLoading ? (
		null
	) : (
		<div className='container'>
			<div className='table'>
				<div className='table_head'>
					<p className='table_number head_item'>#</p>
					<p className='table_title head_item'>Название курса</p>
					<p className='table_quantity head_item'>Тестов</p>
					<p className='table_quantity head_item'>Пройден раз</p>
				</div>
				{courses.map(({ title, tests, _id, userCompleted }, i) => (
					<div key={_id} className='table_item'>
						<p className='table_number'>{i + 1}.</p>
						<Link to={`/courses/${_id}`} className='table_title'>
							{title}
						</Link>
						<p className='table_quantity'>{tests.length} шт.</p>
						<p className='table_quantity'>{userCompleted.length} р.</p>
					</div>
				))}
			</div>
		</div>
	)
}
