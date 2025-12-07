import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import PageNotFound from './pages/page-not-found'
import WithAuth from './routes/with-authentication'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/books" element={<WithAuth><h2>Books</h2></WithAuth>} />
      <Route path="/" element={<WithAuth><h2>Books</h2></WithAuth>}  />
      <Route path="*" element={< PageNotFound/>} />
    </Routes>
  )
}

export default App
