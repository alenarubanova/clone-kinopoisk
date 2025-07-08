import { createRoot } from 'react-dom/client'
import { App } from './App'
import { store } from './redux/store'
import { setFavorites } from './redux/films-slice'

const FAVORITES_KEY = 'favorites'
const favoritesFromStorage = localStorage.getItem(FAVORITES_KEY)
if (favoritesFromStorage) {
  try {
    store.dispatch(setFavorites(JSON.parse(favoritesFromStorage)))
  } catch (e) {
    // ignore parse errors
  }
}

const rootElement: HTMLElement | null = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const app: React.ReactElement = <App />
root.render(app)