import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/normalize.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { init, themeParams } from '@telegram-apps/sdk-react'

init()
if (!themeParams.isMounted) {
	themeParams.mount()
  themeParams.bindCssVars()
}


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)
