import { createContext, ReactNode, useCallback, useEffect, useState } from "react";


interface IUsuarioLogadoContextData {
  nomeDoUsuario: string;
  logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProvider {
  children: ReactNode;
}


export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({ children }) => {
  const [nome, setNome] = useState('');
  const hadleLogout = useCallback(() => { console.log('Executou logout') }, [])
  
  useEffect(() => {
    setTimeout(() => {
      setNome('Pablo');
    }, 3000);
  })

  return (
    <UsuarioLogadoContext.Provider value={{nomeDoUsuario: nome, logout: hadleLogout }}>
      { children }
    </UsuarioLogadoContext.Provider>
  )
}