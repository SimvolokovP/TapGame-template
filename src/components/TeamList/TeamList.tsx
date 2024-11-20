import { FC, useEffect, useState } from 'react'
import { ITgUser } from '../../models/ITgUser'
import { getUsername } from '../../utils/utils'
import { ClipLoader } from 'react-spinners'

interface TeamListProps {
	referrals: number[]
}

const TeamList: FC<TeamListProps> = ({ referrals }) => {
	const [friendsInfo, setFriendsInfo] = useState<ITgUser[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		console.log(referrals)
		console.log(friendsInfo)
		const fetchUserInfos = async () => {
			setLoading(true)
			if (!referrals || referrals.length === 0) {
				setLoading(false)
				return
			}

			try {
				const userRequests = referrals.map(async friendId => {
					const response = await fetch(
						`https://api.telegram.org/bot${
							import.meta.env.VITE_TG_TOKEN
						}/getChat?chat_id=${friendId}`
					)
					const data = await response.json()
					return data.ok ? data.result : null
				})

				const userInfos = await Promise.all(userRequests)
				setFriendsInfo(userInfos.filter(info => info !== null))
			} catch (error) {
				console.error('Ошибка сети:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserInfos()
	}, [referrals])

	return (
		<div className='team-page__list-container'>
			{loading ? (
				<div className='loader'>
					<ClipLoader color='fff' size={32} />
				</div>
			) : (
				<ul className='team-page__list list-reset'>
					{referrals.length ? (
						<>
							{friendsInfo.map((friend, index) => (
								<li className='team-page__item' key={friend.id}>
									<div className='team-page__item-block'>
										<span>{index + 1}.</span>
										{getUsername(friend)}
									</div>

									<div className='team-page__item-coin'>
										<span>+ 1000</span>
                    <div className='team-page__item-received'>Received</div>
									</div>
								</li>
							))}
						</>
					) : (
						'No referral friends found!'
					)}
				</ul>
			)}
		</div>
	)
}

export default TeamList
