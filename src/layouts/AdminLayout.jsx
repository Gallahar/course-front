import { Outlet } from 'react-router-dom'
import { AdminHeader } from 'components/admin/AdminHeader'
import { AdminProvider } from 'providers/AdminProvider'

export const AdminLayout = () => {
	//Создаем лейаут который будет оборачивать все роуты(страницы) в админ панеле а так же оборачиваем его в контекст админа, чтобы мы могли получить его данные во всех дочерних компонентах.
	return (
		<AdminProvider>
			<section className="admin-section">
				<AdminHeader />
				<div className="user_section">
					<Outlet />
				</div>
			</section>
		</AdminProvider>
	)
}
