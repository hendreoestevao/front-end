import Render from './renderPages'
import { useLocation } from 'react-router-dom'

const App = (): JSX.Element => {
  const { pathname } = useLocation()
  const token = localStorage.getItem('JWT_TOKEN')

  return (
    <div className="home flex justify-center items-center mx-auto overflow-hidden bg-orange-600 w-screen h-screen">
      {(token === null || !pathname.includes('dashboard'))
        ? null
        : <>
        </>
      }
      <div className="flex flex-col justify-center h-full w-full space-y-14 overflow-x-hidden overflow-y-auto bg-backgroundDefault">
        <Render />
      </div>
    </div>
  )
}

export default App
