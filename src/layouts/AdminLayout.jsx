import { Outlet } from 'react-router-dom'
import { AdminHeader } from 'components/admin/AdminHeader'
import { AdminProvider } from 'providers/AdminProvider'

export const AdminLayout = () => {
	return (
		<AdminProvider>
			<section className="admin-section">
				<AdminHeader />
				<div className="admin-container-table">
					<Outlet />
				</div>
			</section>
		</AdminProvider>
	)
}
