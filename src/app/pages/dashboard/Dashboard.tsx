import { KeyboardEventHandler, useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useUsuarioLogado } from "../../shared/hooks";

export const Dashboard = () => {
  const counterRef = useRef(0);

  const { nomeDoUsuario, logout } = useUsuarioLogado();

  const [lista, setLista] = useState<string[]>(['Test 1', 'Test 2', 'Test 3']);

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === "Enter") {
      // não precisa porque a de baixo ja comporta
      // if(e.currentTarget.value.length === 0) return;
      if(e.currentTarget.value.trim().length === 0) return;
      
      const value = e.currentTarget.value;
      e.currentTarget.value = '';
      setLista((oldLista) => { 
        // Verifica se o valor digitado já existe na lista
        if (oldLista.includes(value)) return oldLista;
        
        // caso não exista adiciona
        return [...oldLista, value]
      })
    }
  }, []);

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

      <p />
      <input 
        onKeyDown={handleInputKeyDown}
      />
      <p>Lista</p>
      <ul>
        {lista.map((value, index) => {
          return (
            <li key={index}>{value}</li>
          )
        })}
      </ul>

    </div>
  )
}