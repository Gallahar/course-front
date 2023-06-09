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
		} catch (error) {}
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
		<div className="adminPageWrapper">
			<div className="adminPageHeader">
				<h1>Курсы</h1>
				<button onClick={createCourse} className="adminTableCardButton">
					Добавить новый
				</button>
			</div>
			<div className="adminCardsContainer">
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
