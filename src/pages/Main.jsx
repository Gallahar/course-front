import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useFBX } from '@react-three/drei'
import { Suspense, useContext } from 'react'
import { MainContext } from 'providers/MainProvider'

const Etilen = () => {
	const Etilen = useFBX('../../3d-models/Etilen.fbx')

	return <primitive style={{}} object={Etilen} scale={1.5} />
}

const Etan = () => {
	const Etan = useFBX('../../3d-models/Etan.fbx')

	return <primitive object={Etan} scale={1.5} />
}

export const Main = () => {
	return (
		<section>
			<div className='container'>
				<h1>Courses.ru - лучшая образовательная платформа для студентов!</h1>
				<div className='main_info'>
					<p className='main_heading'>На нашем ресурсе вы найдете</p>
					<div className='main_list'>
						<p className='main_list_item'>- более 1000 курсов</p>
						<p className='main_list_item'>- более 500 тестов</p>
						<p className='main_list_item'>- удобную систему оценивания</p>
						<p className='main_list_item'>- круглосуточную поддержку</p>
					</div>
				</div>
				<div className='models_wrapper'>
					<div className='model_wrapper'>
						<p className='model_name'>Этилен - C2H4</p>
						<div>
							<Canvas className='main_canvas'>
								<Suspense fallback={null}>
									<Etilen />
									<OrbitControls />
								</Suspense>
							</Canvas>
						</div>
					</div>
					<div className='model_wrapper'>
						<p className='model_name'>Этан - C2H6</p>
						<div>
							<Canvas className='main_canvas'>
								<Suspense fallback={null}>
									<Etan />
									<OrbitControls />
								</Suspense>
							</Canvas>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
