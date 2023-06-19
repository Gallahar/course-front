import { useLocation } from 'react-router-dom'

export const useIdLocation = () => {
	const location = useLocation().pathname.split('/')    // простой хук в котором  получаем id страницы.

	return location[location.length - 1]
}
