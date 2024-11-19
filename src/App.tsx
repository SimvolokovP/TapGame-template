
import { useEffect } from 'react'
import MobileBar from './components/MobileBar/MobileBar'
import AppRoutes from './router/AppRoutes'
import './styles/App.css'
import { themeParams } from '@telegram-apps/sdk-react'
function App() {

	useEffect(() => {
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
