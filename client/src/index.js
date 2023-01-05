import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter, Route, Routes, Link, BrowserRouter } from 'react-router-dom'

import List from './pages/List'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="list" element={<List />} />
            </Routes>
        </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
