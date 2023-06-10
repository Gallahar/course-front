import { Link } from 'react-router-dom'

export const AdminTableCard = ({ item, handleDelete }) => {
	const { _id, title } = item

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
