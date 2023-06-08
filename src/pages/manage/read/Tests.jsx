import { AdminContext } from 'providers/AdminProvider'
import { useContext } from 'react'
import { AdminTableCard } from 'components/AdminTableCard'

export const Tests = () => {
	const { tests, setTests } = useContext(AdminContext)

	const deleteTest = async (id) => {
		try {
			await axios.delete(`test/${id}`)
			setTests((prev) => prev.filter((course) => course._id !== id))
			alert('Тест успешно удален')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<div className="adminPageWrapper">
			<div className="adminPageHeader">
				<h1>Тесты</h1>
				<button className="adminTableCardButton">Добавить новый</button>
			</div>
			<div className="adminCardsContainer">
				{tests.length
					? tests.map((test) => (
							<AdminTableCard
								key={test._id}
								item={test}
								handleDelete={deleteTest}
							/>
					  ))
					: null}
			</div>
		</div>
	)
}
