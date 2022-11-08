import { createContext, ReactNode, useCallback } from "react";

interface IUsuarioLogadoContextData {
  nomeDoUsuario: string;
  logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProvider {
  children: ReactNode;
}

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({ children }) => {
  const hadleLogout = useCallback(() => { console.log('Executou logout') }, [])

  return (
    <UsuarioLogadoContext.Provider value={{nomeDoUsuario: 'Lucas', logout: hadleLogout }}>
      { children }
    </UsuarioLogadoContext.Provider>
  )
}