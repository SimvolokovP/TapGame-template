import { FC, useEffect, useState } from 'react'
import './ClickerBtn.scss'

interface ClickerBtnProps {
	increaseScore: () => void
	decreaseEnergy: () => void
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
	decreaseEnergy,
	handleSetMessages,
	isActive,
}) => {
	const [transform, setTransform] = useState(
		'perspective(282px) rotateX(0deg) rotateY(0deg)'
	)
	const [messages, setMessages] = useState<
		{ id: number; x: number; y: number }[]
	>([])

	const [sleepMessages, setSleepMessages] = useState([])

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isActive) {
				setSleepMessages(prev => [...prev, 'Z'])
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [isActive])

	const [counter, setCounter] = useState(0)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const offsetX = event.clientX - rect.left - rect.width / 2
		const offsetY = event.clientY - rect.top - rect.height / 2

		const DEG = 10
		const tiltX = (offsetY / (rect.height / 2)) * -DEG
		const tiltY = (offsetX / (rect.width / 2)) * DEG

		setTransform(`perspective(282px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`)

		increaseScore()
		decreaseEnergy()

		setCounter(counter + 1)
		handleSetMessages(setMessages, counter, event)

		setTimeout(() => {
			setTransform('perspective(282px) rotateX(0deg) rotateY(0deg)')
		}, 50)
	}

	return (
		<div className='clicker-btn'>
			<button
				className='circle-outer'
				style={{ transform }}
				onClick={handleClick}
			>
				<div className='circle-inner'>
					<img src='/batman2.svg' alt='batman' />
				</div>
			</button>

			{/* {!isActive && (
				<div className='text-animation' style={{ left: '50%', top: '50%' }}>
					Z
				</div>
			)} */}

      {!isActive && sleepMessages.map((message, index) => (
        <div key={index} className='text-animation' style={{ left: '50%', top: '50%' }}>
          {message}
        </div>
      ))}

			{/* {isActive &&
				sleepMessages.map((message, index) => (
					<div
						key={index}
						className='text-animation'
						style={{ left: '50%', top: `50%` }}
					>
						{message}
					</div>
				))} */}

			{messages.map(({ id, x, y }) => (
				<div key={id} className='text-animation' style={{ left: x, top: y }}>
					+1
				</div>
			))}
		</div>
	)
}

export default ClickerBtn
