import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import ErrorPage from '@/errorPage'
import App from '@/App'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Login />} />
      <Route path="/health" />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<App />} />
    </Route>
  )
)
