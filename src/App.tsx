import { useEffect } from 'react'
import MobileBar from './components/MobileBar/MobileBar'
import AppRoutes from './router/AppRoutes'
import './styles/App.css'
import { init, themeParams } from '@telegram-apps/sdk'
function App() {
	useEffect(() => {
		init()
		if (!themeParams.isMounted()) {
			themeParams.mount()
			themeParams.bindCssVars()
		}
	}, [])

	return (
		<>
			<AppRoutes />
			<MobileBar />
		</>
	)
}

export default App
