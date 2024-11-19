import { TonConnectUIProvider } from '@tonconnect/ui-react'
import MobileBar from './components/MobileBar/MobileBar'
import AppRoutes from './router/AppRoutes'
import './styles/App.css'

function App() {
	return (
		<>
			<TonConnectUIProvider manifestUrl='https://0137-46-164-222-82.ngrok-free.app/manifest.json'>
				<AppRoutes />
				<MobileBar />
			</TonConnectUIProvider>
		</>
	)
}

export default App
