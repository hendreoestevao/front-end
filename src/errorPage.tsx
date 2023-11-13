import { useRouteError } from 'react-router-dom'

interface RouterError {
  statusText: string
  status: number
  error: {
    message: string
  }
}

export default function ErrorPage (): JSX.Element {
  const { error, statusText } = useRouteError() as RouterError

  return (
    <div id="error-page" className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText}</i>
        <i>{error.message}</i>
      </p>
    </div>
  )
}
