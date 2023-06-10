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
			if (error.response.status === 400) {
				alert('Пустой документ уже существует')
			}
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
		<div className='container'>
			<h1>Список тестов</h1>
			<button onClick={createTest} className='admin_table_button'>
				Добавить новый
			</button>
			<div className='table'>
				<div className='table_head' style={{ justifyContent: 'space-between' }}>
					<p className='admin_table_title head_item'>Название теста</p>
					<p className='admin_table_card_controls admin_table_title head_item'>
						Действия
					</p>
				</div>
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
