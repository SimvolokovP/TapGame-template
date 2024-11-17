import './HomePage.scss'
import { useState } from 'react'
import ClickerBtn from '../../components/ClickerBtn/ClickerBtn'
import Greeting from '../../components/Greeting/Greeting'
import ScoreBlock from '../../components/ScoreBlock/ScoreBlock'
import EnergyBlock from '../../components/EnergyBlock/EnergyBlock'
import { MAX_ENERGY } from '../../utils/MAX_ENERGY'

const HomePage = () => {
	const [testScore, setTestScore] = useState<number>(0)
	const [energy, setEnergy] = useState<number>(25)

	const increaseScore = () => {
		if (energy > 0) {
			setTestScore(testScore => testScore + 1)
		}
	}

	const decreaseEnergy = () => {
		if (energy > 0) {
			setEnergy(energy => energy - 1)
		}
	}

	const handleSetMessages = (
		setMessages: React.Dispatch<
			React.SetStateAction<{ id: number; x: number; y: number }[]>
		>,
		counter: number,
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		if(energy > 0) {
      setMessages(prev => [...prev, { id: counter, x: event.clientX, y: event.clientY }])
    }
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
        handleSetMessages={handleSetMessages}
			/>
			<ScoreBlock score={testScore} />
		</div>
	)
}

export default HomePage
