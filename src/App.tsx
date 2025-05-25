import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import Inicio from './page/Inicio'
import Favoritos from './page/Favoritos'
import './app.css'
import ClimaPage from './page/ClimaPage'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/clima" element={<ClimaPage />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  )
}

export default App
