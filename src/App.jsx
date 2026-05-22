import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import './App.css'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,

            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid #1e293b',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
            },

            success: {
              iconTheme: {
                primary: '#4aed88',
                secondary: '#0f172a',
              },
            },

            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0f172a',
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/editor/:roomId' element = {<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
