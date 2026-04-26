import './App.css'
import CataloguePage from './pages/CataloguePage'
import { Route, Routes } from 'react-router-dom'
import WatchlistPage from './pages/WatchlistPage'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/Watchlist" element={<WatchlistPage />} />
        
      </Routes>
    </>
  )
}

export default App
