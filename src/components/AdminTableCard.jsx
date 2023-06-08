import { Link } from 'react-router-dom'

export const AdminTableCard = ({ item, handleDelete }) => {
	const { _id, title } = item

	return (
		<div className="adminTableCard">
			<h1>{title}</h1>
			<div className="adminTableCard-controls">
				<Link to={`edit/${_id}`}>
					<button className="adminTableCardButton">
						редактировать
					</button>
				</Link>
				<Link to={`${_id}`}>
					<button className="adminTableCardButton">статистика</button>
				</Link>
				<button
					onClick={() => handleDelete(_id)}
					className="adminTableCardButton"
				>
					удалить
				</button>
			</div>
		</div>
	)
}
