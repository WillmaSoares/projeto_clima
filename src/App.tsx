import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import Inicio from './page/Inicio'
import Clima from './page/home'
import Favoritos from './page/Favoritos'
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/clima" element={<Clima />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  )
}

export default App
