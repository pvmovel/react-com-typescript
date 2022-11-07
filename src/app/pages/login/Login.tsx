import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo('/pagina-inicial')
  }

  const handleEntrar = () => {
    if (email === 'jose@demaria.com' && password === 'Jesus') {
      console.log('Acesso Autorizado');
    } else {
      console.log('Usuário Desconhecido');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        
        <label>
          <span>E-Mail: </span>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <p />
        <label>
          <span>Senha: </span>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <p />
        <button type="button" onClick={handleEntrar}>
          Entrar
        </button>

      </form>
      <p />
      <button onClick={handleClick}>Pagina Inicial</button>
    </div>
  )
}