import { FC, useState } from 'react'
import './ClickerBtn.scss'

interface ClickerBtnProps {
	increaseScore: () => void
}

const ClickerBtn: FC<ClickerBtnProps> = ({ increaseScore }) => {
	const [transform, setTransform] = useState(
		'perspective(282px) rotateX(0deg) rotateY(0deg)'
	)
	const [messages, setMessages] = useState<
		{ id: number; x: number; y: number }[]
	>([])

  const [counter, setCounter] = useState(0); // To keep a unique id for messages  

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const offsetX = event.clientX - rect.left - rect.width / 2
		const offsetY = event.clientY - rect.top - rect.height / 2

		const DEG = 10
		const tiltX = (offsetY / (rect.height / 2)) * -DEG
		const tiltY = (offsetX / (rect.width / 2)) * DEG

		setTransform(`perspective(282px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`)
		increaseScore()

    setMessages(prev => [...prev, { id: counter, x: event.clientX, y: event.clientY }]);  

		setTimeout(() => {
			setTransform('perspective(282px) rotateX(0deg) rotateY(0deg)')
		}, 50)
	}

	return (
		<div className='clicker-btn'>
			<button
				className='clicker-btn__button'
				onClick={handleClick}
				style={{ transform }}
			>
				<img className='clicker-btn__image' src='/batman.svg' alt='batman' />
			</button>

      {messages.map(({ id, x, y }) => (  
        <div   
          key={id}   
          className="text-animation"   
          style={{ left: x, top: y }}   
        >  
          +1  
        </div>  
      ))}  
		</div>
	)
}

export default ClickerBtn
