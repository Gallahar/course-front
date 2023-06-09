import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useFBX } from '@react-three/drei'
import { Suspense, useContext, useEffect } from 'react'
import { MainContext } from 'providers/MainProvider'
import { Link } from 'react-router-dom'

const Metano = () => {
	const Metano = useFBX('../../3d-models/metano.fbx')

	return <primitive object={Metano} scale={12} />
}

const Etilen = () => {
	const Etilen = useFBX('../../3d-models/Etilen.fbx')

	return <primitive style={{}} object={Etilen} scale={1.5} />
}

const Etan = () => {
	const Etan = useFBX('../../3d-models/Etan.fbx')

	return <primitive object={Etan} scale={1.5} />
}

export const Main = () => {
	const { courses, tests } = useContext(MainContext)

	return (
		<section>
			<div className="container">
				<p className="mainTitle">Модели атомов</p>
				<div className="mainModelsWrapper">
					<Canvas className="mainCanvas">
						<Suspense fallback={null}>
							<Etilen />
							<OrbitControls />
						</Suspense>
					</Canvas>
					<Canvas className="mainCanvas">
						<Suspense fallback={null}>
							<Metano />
							<OrbitControls />
						</Suspense>
					</Canvas>
					<Canvas className="mainCanvas">
						<Suspense fallback={null}>
							<Etan />
							<OrbitControls />
						</Suspense>
					</Canvas>
				</div>
				<div className="coursesWrapper">
					<h1>Курсы:</h1>
					{courses.map((course) => (
						<Link to={`/courses/${course._id}`}>
							{course.title}
						</Link>
					))}
				</div>
				<div className="testsWrapper">
					<h1>Тесты:</h1>
					{tests.map((test) => (
						<Link to={`/tests/${test._id}`}>{test.title}</Link>
					))}
				</div>
			</div>
		</section>
	)
}
