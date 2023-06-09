import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useFBX } from '@react-three/drei'
import { Suspense, useEffect } from 'react'

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

	return (
		<section>
			<div className='container'>
				<p className='mainTitle'>Модели атомов</p>
				<div className='mainModelsWrapper'>
					<Canvas className='mainCanvas'>
						<Suspense fallback={null}>
							<Etilen />
							<OrbitControls />
						</Suspense>
					</Canvas>
					<Canvas className='mainCanvas'>
						<Suspense fallback={null}>
							<Metano />
							<OrbitControls />
						</Suspense>
					</Canvas>
					<Canvas className='mainCanvas'>
						<Suspense fallback={null}>
							<Etan />
							<OrbitControls />
						</Suspense>
					</Canvas>
				</div>
			</div>
		</section>
	)
}
