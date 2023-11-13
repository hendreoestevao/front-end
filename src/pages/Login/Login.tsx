import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Login: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginError, setLoginError] = useState<string | null>(null)

  useEffect(() => {
    // Verifique se já há um token no localStorage e redirecione para o dashboard se existir.
    const storedToken = localStorage.getItem('JWT_TOKEN')
    if (storedToken) {
      window.location.href = '/dashboard'
    }
  }, [])

  const login = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      })

      // Verifica se a resposta contém um token
      const token = response.data.token
      if (!token) {
        throw new Error('Token não encontrado na resposta do servidor.')
      }
      console.log('logado')
      // Armazena o token no localStorage
      localStorage.setItem('JWT_TOKEN', token)

      // Redireciona para o dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setLoginError('E-mail ou senha incorretos')
    }
  }

  return (
    <div className="bg-white flex flex-row justify-center items-center w-screen h-screen">
      <div className="flex flex-col items-center w-full sm:w-[65%] h-[68%] mt-[3%] text-black">
        <div className="sm:hidden mb-8"></div>
        <div className="text-[#3C979F] text-4xl font-bold mb-8">LOGIN</div>
        <div className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b-2 border-[#3C979F] py-2 focus:outline-none focus:border-[#3C979F]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-[#3C979F] py-2 focus:outline-none focus:border-[#3C979F]"
            />
          </div>
        </div>
        <div className="sm:hidden mb-6"></div>
        <div className="bg-[#3C979F] flex justify-center items-center w-full h-[50px] rounded-full text-lg sm:text-xl mb-8 text-white">
          <button className="w-full h-[50px]" onClick={login}>
            Acessar
          </button>
        </div>
        {Boolean(loginError) && (
          <div className="text-red-500 text-sm mb-4">{loginError}</div>
        )}
        <div className="inline text-sm sm:text-xl font-normal">
          <p className="mr-1">
            Ainda não possui cadastro?
            <a
              href="/register"
              className="text-[#3C979F] hover:opacity-80 underline"
            >
              {' '}
              Clique aqui{' '}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
