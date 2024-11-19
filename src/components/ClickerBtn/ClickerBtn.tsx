import { FC, useEffect, useState } from 'react'
import './ClickerBtn.scss'
import { hapticFeedback } from '@telegram-apps/sdk'

interface ClickerBtnProps {
	increaseScore: () => void
	// decreaseEnergy: () => void;
	handleSetMessages: (
		setMessages: React.Dispatch<
			React.SetStateAction<{ id: number; x: number; y: number }[]>
		>,
		counter: number,
		event: React.MouseEvent<HTMLButtonElement>
	) => void
	isActive: boolean
}

const ClickerBtn: FC<ClickerBtnProps> = ({
	increaseScore,
	// decreaseEnergy,
	handleSetMessages,
	isActive,
}) => {
	const [transform, setTransform] = useState(
		'perspective(282px) rotateX(0deg) rotateY(0deg)'
	)
	const [messages, setMessages] = useState<
		{ id: number; x: number; y: number }[]
	>([])

	const [sleepMessages, setSleepMessages] = useState<
		{ id: number; message: string; x: number; y: number }[]
	>([])

	const [counter, setCounter] = useState(0)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		hapticFeedback.impactOccurred('soft')
		const rect = event.currentTarget.getBoundingClientRect()
		const offsetX = event.clientX - rect.left - rect.width / 2
		const offsetY = event.clientY - rect.top - rect.height / 2

		const DEG = 10
		const tiltX = (offsetY / (rect.height / 2)) * -DEG
		const tiltY = (offsetX / (rect.width / 2)) * DEG

		setTransform(`perspective(282px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`)

		increaseScore()
		// decreaseEnergy();

		setCounter(counter + 1)
		handleSetMessages(setMessages, counter, event)

		setTimeout(() => {
			setTransform('perspective(282px) rotateX(0deg) rotateY(0deg)')
		}, 50)
	}

	const handleAnimationEnd = (id: number) => {
		setMessages(prevClicks => prevClicks.filter(click => click.id !== id))
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		if (!isActive) {
			interval = setInterval(() => {
				const newZ = {
					id: Date.now(),
					message: 'Z',
          y: '40%',
          x: '65%'
				}
				setSleepMessages(prev => [...prev, newZ])
			}, 1000)
		}
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isActive])

	return (
		<div className='clicker-btn'>
			<button
				className='circle-outer'
				style={{ transform }}
				onClick={handleClick}
			>
				<div className='circle-inner'>
					<img src='/batman4.svg' alt='batman' draggable={false} />
				</div>
			</button>

			{sleepMessages.map(({ id, message, x, y }) => (
				<div
					key={id}
					className='text-animation'
					style={{ left: x, top: y }}
					onAnimationEnd={() => {
						setSleepMessages(prev => prev.filter(msg => msg.id !== id))
					}}
				>
					{message}
				</div>
			))}

			{messages.map(({ id, x, y }) => (
				<div
					key={id}
					className='text-animation'
					style={{ left: x, top: y }}
					onAnimationEnd={() => handleAnimationEnd(id)}
				>
					+1
				</div>
			))}
		</div>
	)
}

export default ClickerBtn
