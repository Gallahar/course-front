import { AdminContext } from 'providers/AdminProvider'
import { useContext } from 'react'
import { AdminTableCard } from 'components/admin/AdminTableCard'
import { axios } from 'api/axios.js'

export const Tests = () => {
	const { tests, setTests } = useContext(AdminContext)

	const createTest = async () => {
		try {
			const data = await axios.post('test/create')
			setTests((prev) => [...prev, data.data])
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTest = async (id) => {
		try {
			await axios.delete(`test/${id}`)
			setTests((prev) => prev.filter((test) => test._id !== id))
			alert('Тест успешно удален')
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<div className="adminPageWrapper">
			<div className="adminPageHeader">
				<h1>Тесты</h1>
				<button onClick={createTest} className="adminTableCardButton">
					Добавить новый
				</button>
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
