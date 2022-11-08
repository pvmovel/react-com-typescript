import { useRef } from "react"
import { Link } from "react-router-dom"
import { useUsuarioLogado } from "../../shared/hooks";

export const Dashboard = () => {
  const counterRef = useRef(0);

  const { nomeDoUsuario, logout } = useUsuarioLogado();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Usuário Logado: { nomeDoUsuario }</h2>
      <p>Contador: {counterRef.current}</p>
      <button onClick={() => counterRef.current++}>Somar</button>
      <button onClick={() => console.log(counterRef.current)}>Console.log</button>

      <p />

      <button onClick={ logout }>Logout</button>

      <p />

      <Link to='/entrar'>Login</Link>
    </div>
  )
}