import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';
import './App.css'
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
import Appbar from './pages/components/AppBar';

function App() {
  return (
    <div>
              <Router>
                <Routes>
                  <Route path='/' element={<Suspense fallback={<div>Loading</div>}><Signup /></Suspense>} />
                  <Route path='/signup' element={<Suspense fallback={<div>Loading</div>}><Signup /></Suspense>} />
                  <Route path='/login' element={<Suspense fallback="Loading"><Login /></Suspense>} />
                  <Route path='/dashboard/:id' element={<Appbar/>} />
                </Routes>
              </Router>
    </div>
  )
}

export default App
