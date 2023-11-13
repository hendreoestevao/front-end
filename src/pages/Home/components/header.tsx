import React, { useEffect, useState } from 'react'

interface HeaderProps {
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    // Carrega o token do localStorage ao montar o componente
    const storageName = localStorage.getItem('JWT_NOME')
    setName(storageName)
  }, [])

  const handleLogout = (): void => {
    // Remova o token do localStorage ou de onde você estiver armazenando
    localStorage.removeItem('JWT_TOKEN')

    // Redirecione para a tela de login
    onLogout()
  }

  return (
    <div className="flex justify-end mb-4">
      <h1 className="mr-10"> Nome de Usuário: {name}</h1>
      <button
        className="bg-[#308a7b] text-white px-4 py-2 rounded-md "
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  )
}

export default Header
