import './EnergyBlock.scss'
import { useEffect } from 'react'
import { MAX_ENERGY } from '../../utils/MAX_ENERGY'

const EnergyBlock = ({ energy, increaseEnergy }) => {
	useEffect(() => {
		const interval = setInterval(() => {
			increaseEnergy()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [energy, increaseEnergy])

	return (
		<div className='energy'>
			<div className='energy__count'>
				{energy} / {MAX_ENERGY}
			</div>
		</div>
	)
}

export default EnergyBlock
