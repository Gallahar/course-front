import { axios } from 'api/axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

export const Profile = () => {
	const [profile, setProfile] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const token = Cookies.get('token') // при инициализации(маунте) компонента далаем запрос на сервер  для получения данных пользователя.
		const fetchProfile = async () => {
			try {
				const data = await axios.get('auth/profile', {
					headers: {
						token: token ? JSON.parse(token) : null,
					},
				})
				setProfile(data.data) //в случае успеха передаем данные с ответа в состояние пользователя.
			} catch (e) {
				console.log(e) // отлавливаем ошибку.
			} finally {
				setIsLoading(false) // в конце в любом случае меняем состоянии загрузки(на статус завершенной)
			}
		}
		fetchProfile()
	}, [])

	const { coursesCompleted, testsCompleted, isAdmin, email } = profile // деструктуризация профиля пользователя, получаем выполненные тесты, курсы статистику по ним, проверяем роль пользователя, если роль - админ так же отрисовываем ссылку на админ панель в навигации.

	return isLoading ? null : (
		<div className="container">
			<div className="profile_info">
				<p className="profile_field">
					Пользователь - {email}{' '}
					<span>( {isAdmin ? 'админ' : 'студент'} )</span>
				</p>
			</div>
			<p className="profile_heading">Пройденные курсы</p>
			<div className="table">
				<div className="table_head">
					<p className="table_number head_item">#</p>
					<p className="table_title head_item">Название курса</p>
				</div>
				{coursesCompleted.map(({ title, _id }, i) => (
					<div key={_id} className="table_item">
						<p className="table_number">{i + 1}.</p>
						<Link to={`/courses/${_id}`} className="table_title">
							{title}
						</Link>
					</div>
				))}
			</div>
			<p className="profile_heading">Пройденные тесты</p>

			<div className="table">
				<div className="table_head">
					<p className="table_number head_item">#</p>
					<p className="table_title head_item">Название теста</p>
					<p className="table_quantity head_item">Результат</p>
					<p className="table_quantity head_item">Дата</p>
				</div>
				{testsCompleted.map(
					({ test, result, _id, date: notFormatedDate }, i) => {
						const date =
							dayjs(notFormatedDate).format('MMM, ddd - HH:mm')
						return (
							<div key={date + i} className="table_item">
								<p className="table_number">{i + 1}.</p>
								<Link
									to={`/tests/${_id}`}
									className="table_title"
								>
									{test}
								</Link>
								<p className="table_quantity">{result}</p>
								<p className="table_quantity">{date}</p>
							</div>
						)
					}
				)}
			</div>
		</div>
	)
}
