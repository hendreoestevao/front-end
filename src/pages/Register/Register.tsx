import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Register: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registered, setRegistered] = useState<boolean>(false)

  const api = axios

  const register = async (): Promise<void> => {
    try {
      const response = await api.post('http://localhost:3000/register', {
        username,
        password,
        name
      })

      // Verifica se a resposta contém um token
      const token = response.data.token
      if (!token) {
        throw new Error('Token não encontrado na resposta do servidor.')
      }

      // Armazena o token no localStorage
      localStorage.setItem('JWT_TOKEN', token)
      localStorage.setItem('JWT_NOME', name)

      // Atualiza o estado para indicar que o registro foi bem-sucedido
      setRegistered(true)
    } catch (error) {
      console.error('Erro ao fazer registro:', error)
      setRegisterError('Erro ao fazer registro. Tente novamente.')
    }
  }

  useEffect(() => {
    if (registered) {
      // Redireciona para o dashboard após o registro bem-sucedido
      window.location.href = '/dashboard'
    }
  }, [registered])

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="w-full px-5 sm:w-[64%]">
        <div className="flex flex-col items-center w-full sm:w-[65%] h-[68%] mt-[3%] text-black">
          <div className="sm:hidden mb-[32px]"></div>
          <div className="text-[#3C979F] text-4xl font-bold mb-[72px]">
            REGISTER
          </div>
          <div className="w-full">
            <div className="register-container mb-4">
              <div className="register-text-title">Name</div>
              <div className="register-border-input">
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-none outline-none"
                />
              </div>
            </div>
            <div className="register-container mb-4">
              <div className="register-text-title">Username</div>
              <div className="register-border-input">
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-none outline-none"
                />
              </div>
            </div>
            <div className="register-container mb-4">
              <div className="register-text-title">Senha</div>
              <div className="register-border-input">
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-none outline-none"
                />
              </div>
            </div>
          </div>
          <div className="sm:hidden mb-6"></div>
          <div className="bg-[#3C979F] flex justify-center items-center w-full h-[50px] rounded-full text-lg sm:text-xl mb-[40px] text-[#FEFEFE]">
            <button className="w-full h-[50px]" onClick={register}>
              Cadastrar
            </button>
          </div>
          {Boolean(registerError) && (
            <div className="text-red-500 text-sm mb-4">{registerError}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
