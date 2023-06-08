import { AdminContext } from "providers/AdminProvider"
import { useContext } from "react"

export const Tests = () => {
const {tests} = useContext(AdminContext)


  return (
		<div className="adminPageWrapper">
			<div className="adminPageHeader">
				<h1>Тесты</h1>
				<button className="adminTableCardButton">Добавить новый</button>
			</div>
			<div className="adminCardsContainer">
				{tests?.map((test) => (
					<AdminTableCard test={test} />
				))}
			</div>
		</div>
  )
}