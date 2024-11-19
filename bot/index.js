const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://shsmhklkxtoxnohogjsl.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc21oa2xreHRveG5vaG9nanNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzQ1ODEsImV4cCI6MjA0NzQxMDU4MX0.uRsV_sxaokszB-shq-xVK4Ww7T31QVZsgUUc8sVCAPk'

const supabase = createClient(supabaseUrl, supabaseKey)

const token = '7596807523:AAFPCtta4XIrygPw1jwukL2Aj4Fk6DMmMw0'
const webAppUrl = 'https://e9a5-5-187-87-111.ngrok-free.app'
const channelUsername = '@splitTapMan'

const bot = new TelegramBot(token, { polling: true })
const app = express()
app.use(express.json())

bot.onText(/\/start(.*)/, async (msg, match) => {
	const referralId = msg.chat.id
	const referrerId = match[1].trim()

	const welcomeMessage = `Добро пожаловать в TapMan! ${channelUsername}`

	await bot.sendMessage(referralId, welcomeMessage)
	await bot.sendMessage(referralId, 'Нажмите кнопку ниже, чтобы начать:', {
		reply_markup: {
			inline_keyboard: [[{ text: 'Start', web_app: { url: webAppUrl } }]],
		},
	})

	if (referrerId) {
		console.log(
			`User with ID ${referralId} joined via referral from user ${referrerId}`
		)

		try {
			const { data: referrerDoc, error: referrerError } = await supabase
				.from('users')
				.select('*')
				.eq('tg_id', referrerId)
				.single()

			if (referrerDoc) {
				console.log(referrerDoc)

				const { data: referralDoc, error: referralError } = await supabase
					.from('users')
					.select('*')
					.eq('tg_id', referralId)
					.single()

				if (!referralDoc) {
					console.log(`Creating new referral for user ID ${referralId}`)

					const { data: newReferral, error: newReferralError } = await supabase
						.from('users')
						.insert([
							{
								tg_id: referralId,
								referrer_id: referrerId,
								score: 0,
								energy: 0,
								isSub: false,
								referrallArray: [],
							},
						])
						.single()

					if (newReferralError) {
						console.error('Error creating new referral:', newReferralError)
					} else {
						console.log(`New referral created:`, newReferral)

						const updatedReferrals = [
							...(referrerDoc.referrallArray || []),
							+referralId,
						]

						const { error: updateReferrerError } = await supabase
							.from('users')
							.update({ referrallArray: updatedReferrals })
							.eq('tg_id', referrerId)

						if (updateReferrerError) {
							console.error(
								'Error updating referrer with new referral:',
								updateReferrerError
							)
						} else {
							console.log(
								`Updated referrer ${referrerId} with new referral ID ${referralId}`
							)
						}
					}
				} else {
					console.log(`Referral with ID ${referralId} already exists.`)
				}
			} else {
				console.log(`Referrer with ID ${referrerId} does not exist.`)
			}
		} catch (error) {
			console.error('Error processing referral data:', error)
		}
	}
})

const PORT = 8000

app.listen(PORT, () => console.log('Server started on PORT ' + PORT))
