import { createContext, ReactNode } from "react";

interface IUsuarioLogadoContextData {
  nomeDoUsuario: string;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProvider {
  children: ReactNode;
}

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({ children }) => {

  return (
    <UsuarioLogadoContext.Provider value={{nomeDoUsuario: 'Lucas'}}>
      { children }
    </UsuarioLogadoContext.Provider>
  )
}