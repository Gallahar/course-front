import { AdminTableCard } from 'components/AdminTableCard'
import { AdminContext } from 'providers/AdminProvider'
import { useContext } from 'react'
import { axios } from 'api/axios.js'

export const Courses = () => {
	const { courses, setCourses } = useContext(AdminContext)

	const deleteCourse = async (id) => {
		try {
			await axios.delete(`course/${id}`)
			setCourses((prev) => prev.filter((course) => course._id === id))
			alert('Course deleted successfully')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<div className="adminPageWrapper">
			<div className="adminPageHeader">
				<h1>Курсы</h1>
				<button className="adminTableCardButton">Добавить новый</button>
			</div>
			<div className="adminCardsContainer">
				{courses?.map((course) => (
					<AdminTableCard item={course} handleDelete={deleteCourse} />
				))}
			</div>
		</div>
	)
}
