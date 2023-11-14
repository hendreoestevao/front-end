import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { postRegister } from '@/values/urls/Login'

const Register: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registered, setRegistered] = useState<boolean>(false)

  const api = axios

  const register = async (): Promise<void> => {
    try {
      const response = await api.post(postRegister(), {
        username,
        password,
        name
      })
      const token = response.data.token
      if (token == null) {
        throw new Error('Token não encontrado na resposta do servidor.')
      }

      localStorage.setItem('JWT_NOME', name)

      setRegistered(true)
    } catch (error) {
      console.error('Erro ao fazer registro:', error)
      setRegisterError('Erro ao fazer registro. Tente novamente.')
    }
  }

  useEffect(() => {
    if (registered) {
      window.location.href = '/'
    }
  }, [registered])

  return (
<div className="bg-white flex justify-center items-center h-screen">
      <div className="w-full px-5 sm:w-[64%]">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center w-full sm:w-[65%] text-black">
            <div className="sm:hidden mb-8"></div>
            <div className="text-[#308a7b] text-4xl  font-bold mb-8">REGISTER</div>
            <div className="w-full">
              <div className="register-container mb-4">
                <div className="register-text-title mb-2">Nome</div>
                <div className="register-border-input border-b-2 border-[#308a7b]">
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-none outline-none p-2"
                  />
                </div>
              </div>
              <div className="register-container mb-4">
                <div className="register-text-title mb-2">Seu nome de Usuario</div>
                <div className="register-border-input border-b-2 border-[#308a7b]">
                  <input
                    type="email"
                    placeholder="Nome de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border-none outline-none p-2"
                  />
                </div>
              </div>
              <div className="register-container mb-4">
                <div className="register-text-title mb-2">Senha</div>
                <div className="register-border-input border-b-2 border-[#308a7b]">
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-none outline-none p-2"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#308a7b]  flex justify-center items-center w-full h-[50px] rounded-full text-lg sm:text-xl mb-6 text-[#FEFEFE]">
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
    </div>
  )
}

export default Register
