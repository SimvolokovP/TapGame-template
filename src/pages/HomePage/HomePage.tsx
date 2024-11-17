import './HomePage.scss'
import { useState } from 'react'
import ClickerBtn from '../../components/ClickerBtn/ClickerBtn'
import Greeting from '../../components/Greeting/Greeting'
import ScoreBlock from '../../components/ScoreBlock/ScoreBlock'
import EnergyBlock from '../../components/EnergyBlock/EnergyBlock'
import { MAX_ENERGY } from '../../utils/MAX_ENERGY'

const HomePage = () => {
	const [testScore, setTestScore] = useState<number>(0)
	const [energy, setEnergy] = useState<number>(500)

	const increaseScore = () => {
		setTestScore(score => score + 1)
	}

	const decreaseEnergy = () => {
		setEnergy(energy => energy - 1)
	}

	const increaseEnergy = () => {
		if (energy < MAX_ENERGY) {
			setEnergy(energy => energy + 1)
		}
	}

	return (
		<div className='container home-page'>
			<Greeting />
			<EnergyBlock energy={energy} increaseEnergy={increaseEnergy} />
			<ClickerBtn
				increaseScore={increaseScore}
				decreaseEnergy={decreaseEnergy}
			/>
			<ScoreBlock score={testScore} />
		</div>
	)
}

export default HomePage
