import { Outlet } from 'react-router-dom'
import { AdminHeader } from 'components/AdminHeader'


export const AdminLayout = () => {
	return (
		<section className="admin-section">
			<AdminHeader />
			<div className="admin-container-table">
				<Outlet />
			</div>
		</section>
	)
}
