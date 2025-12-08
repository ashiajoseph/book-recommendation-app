import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import PageNotFound from './pages/page-not-found'
import WithAuth from './routes/with-authentication'
import BookList from './pages/books'
import BookDetails from './pages/books/book-details'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/books" element={<WithAuth><BookList /></WithAuth>} />
      <Route path="/books/:bookId" element={<WithAuth><BookDetails /></WithAuth>} />
      <Route path="/" element={<Navigate to="/login" replace />}  />
      <Route path="*" element={< PageNotFound/>} />
    </Routes>
  )
}

export default App
