const supabase = require('../config/supabaseConfig')

const ReferralService = {
	async processReferral(referralId, referrerId) {
		console.log(
			`User with ID ${referralId} joined via referral from user ${referrerId}`
		)

		try {
			const { data: referrerDoc, error: referrerError } = await supabase
				.from('users')
				.select('*')
				.eq('tg_id', referrerId)
				.single()

			if (!referrerDoc) {
				console.log(`Referrer with ID ${referrerId} does not exist.`)
				return
			}

			const { data: referralDoc, error: referralError } = await supabase
				.from('users')
				.select('*')
				.eq('tg_id', referralId)
				.single()

			if (!referralDoc) {
				console.log(`Creating a new referral for user ID ${referralId}`)
				const { data: newReferral, error: newReferralError } = await supabase
					.from('users')
					.insert([
						{
							tg_id: referralId,
							referrer_id: referrerId,
							score: 1000,
							isSub: false,
							referrallArray: [],
						},
					])
					.single()

				if (newReferralError) {
					console.error('Error creating new referral:', newReferralError)
					return
				}

				console.log(`New referral created:`, newReferral)

				const newReferrerScore = referrerDoc.score + 1000
				const updatedReferrals = [
					...(referrerDoc.referrallArray || []),
					+referralId,
				]

				const { error: updateReferrerError } = await supabase
					.from('users')
					.update({
						referrallArray: updatedReferrals,
						score: newReferrerScore,
					})
					.eq('tg_id', referrerId)

				if (updateReferrerError) {
					console.error('Error updating referrer data:', updateReferrerError)
				} else {
					console.log(
						`Updated referrer ${referrerId} with new referral ID ${referralId}`
					)
				}
			} else {
				console.log(`Referral with ID ${referralId} already exists.`)
			}
		} catch (error) {
			console.error('Error processing referral data:', error)
		}
	},
}

module.exports = ReferralService
