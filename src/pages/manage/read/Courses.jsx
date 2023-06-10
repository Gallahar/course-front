import { AdminTableCard } from 'components/admin/AdminTableCard'
import { AdminContext } from 'providers/AdminProvider'
import { useContext } from 'react'
import { axios } from 'api/axios.js'

export const Courses = () => {
	const { courses, setCourses } = useContext(AdminContext)

	const createCourse = async () => {
		try {
			const data = await axios.post('course/create')
			setCourses((prev) => [...prev, data.data])
		} catch (error) {
			if (error.response.status === 400) {
				alert('Пустой документ уже существует')
			}
		}
	}

	const deleteCourse = async (id) => {
		try {
			await axios.delete(`course/${id}`)
			setCourses((prev) => prev.filter((course) => course._id !== id))
			alert('Курс успешно удален')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<div className='container'>
			<h1>Список курсов</h1>
			<button onClick={createCourse} className='admin_table_button'>
				Добавить новый
			</button>

			<div className='table'>
				<div className='table_head' style={{ justifyContent: 'space-between' }}>
					<p className='admin_table_title head_item'>Название курса</p>
					<p className='admin_table_action_title admin_table_title head_item'>
						Действия
					</p>
				</div>
				{courses?.map((course) => (
					<AdminTableCard
						key={course._id}
						item={course}
						handleDelete={deleteCourse}
					/>
				))}
			</div>
		</div>
	)
}
