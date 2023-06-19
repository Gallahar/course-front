import { Link } from 'react-router-dom'

export const AdminTableCard = ({ item, handleDelete }) => {  // деструктурируем пропсы, вытаскиваем  функцию удаления  и сам элемент.
	const { _id, title } = item // деструктурируем его и получаем его титл и айди, который затем будем передавать в функцию удаления.

	return (
		<>
			<div className='admin_table_item'>
				<p className='admin_table_title'>
					{title ? title : '"Пустой документ"'}
				</p>
				<div className='admin_table_card_controls'>
					<Link to={`edit/${_id}`}>
						<button className='admin_table_button'>редакт.</button>
					</Link>
					<Link to={`${_id}`}>
						<button className='admin_table_button'>стат.</button>
					</Link>
					<button
						onClick={() => handleDelete(_id)}
						className='admin_table_button'
					>
						удалить
					</button>
				</div>
			</div>
		</>
	)
}
