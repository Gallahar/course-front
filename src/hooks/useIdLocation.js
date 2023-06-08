import { useLocation } from 'react-router-dom'

export const useIdLocation = () => {
	const location = useLocation().pathname.split('/')

	return location[location.length - 1]
}
