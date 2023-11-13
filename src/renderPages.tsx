/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const HomePage = lazy(async () => await import('./pages/Home/Home'))
const LoginPage = lazy(async () => await import('./pages/Login/Login'))
const RegisterPage = lazy(async () => await import('./pages/Register/Register'))

export const Render = (): JSX.Element => {
  const { pathname } = useLocation()
  const token = localStorage.getItem('JWT_TOKEN')

  function switchPage(): JSX.Element | any {
    if (token === null && pathname.includes('dashboard')) {
      return <LoginPage />
    }
    if (token === null && !pathname.includes('dashboard')) {
      switch (pathname) {
        case '/':
          return <LoginPage />
        case '/health':
          return <div>OK</div>
        case '/register':
          return <RegisterPage />
        default:
          return <></>
      }
    }
    if (token !== null) {
      switch (pathname) {
        case '/':
          return <LoginPage />
        case '/health':
          return <div>OK</div>
        case '/register':
          return <RegisterPage />
        case '/dashboard':
          return <HomePage />
        default:
          return <></>
      }
    }
  }

  return (
    <>
      <Suspense fallback={<Loading />}>{switchPage()}</Suspense>
    </>
  )
}

export const Loading = (): JSX.Element => {
  return (
    <div className="h-full w-full text-center flex justify-center items-center">
      ...Carregando
    </div>
  )
}

export default Render
