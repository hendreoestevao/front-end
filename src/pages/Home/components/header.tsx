import React, { useEffect, useState } from 'react'

interface HeaderProps {
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const storageName = localStorage.getItem('JWT_NOME')
    setName(storageName)
  }, [])

  const handleLogout = (): void => {
    localStorage.removeItem('JWT_TOKEN')
    onLogout()
  }

  return (
    <div className="flex justify-end mb-4">
      <h1 className="mr-10"> Nome de Usuário: <strong>{name}</strong></h1>
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
