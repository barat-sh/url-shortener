import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import './App.css'
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
import Dashboard from './pages/components/Dashboard';
import History from './pages/components/History';
import Appbar from './pages/components/AppBar';
import Redirect from './pages/Redirect';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path=':id' element={<Redirect/>}/>
          <Route path='/signup' element={<Suspense fallback={<div>Loading</div>}><Signup /></Suspense>} />
          <Route path='/login' element={<Suspense fallback="Loading"><Login /></Suspense>} />
          <Route path='/dashboard/:id' element={<Dashboard/>} />
          <Route
              path='/dashboard/:id/history'
              element={
                [
                  <Appbar key="appBar" />,
                  <History key="history" />
                ]
              }
            />
        </Routes>
      </Router>
    </div>
  )
}

export default App
