import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useUsuarioLogado } from "../../shared/hooks";
import { ApiException, ITarefa, TarefasService } from "../../shared/services";

export const Dashboard = () => {
  const counterRef = useRef(0);

  const { nomeDoUsuario, logout } = useUsuarioLogado();

  interface IListaComCheckBox {
    title: string;
    isSelected: boolean
  }

  const [lista, setLista] = useState<string[]>([]);
  
  const [listaComCheckbox, setListaComCheckbox] = useState<IListaComCheckBox[]>([]);

  const [listaDb, setListaDb] = useState<ITarefa[]>([]);

  useEffect(() => {
    TarefasService.getAll()
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setListaDb(result)
      }
    });
  }, [])
  
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

  const handleInputKeyDownComCheckbox: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === "Enter") {
      if(e.currentTarget.value.trim().length === 0) return;
      
      const valueComCheckbox = e.currentTarget.value;
      e.currentTarget.value = '';
      setListaComCheckbox((oldListaComCheckbox) => { 
        // Verifica se o valor digitado já existe na lista
        if (oldListaComCheckbox.some((listItem) => listItem.title === valueComCheckbox)) return oldListaComCheckbox;
        
        // caso não exista adiciona
        return [
          ...oldListaComCheckbox, 
        {
          title: valueComCheckbox,
          isSelected: false,
        }]
      })
    }
  }, []);

  const handleInputKeyDownDb: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === "Enter") {
      if(e.currentTarget.value.trim().length === 0) return;
      
      const valueDb = e.currentTarget.value;
      e.currentTarget.value = '';
      setListaDb((oldListaDb) => { 
        // Verifica se o valor digitado já existe na lista
        if (oldListaDb.some((listDbItem) => listDbItem.title === valueDb)) return oldListaDb;
        
        // caso não exista adiciona
        return [
          ...oldListaDb, 
        {
          id: oldListaDb.length,
          title: valueDb,
          isCompleted: false,
        }]
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
      <h3>Lista</h3>
      <input 
        onKeyDown={handleInputKeyDown}
      />
      <ul>
        {lista.map((value, index) => {
          return (
            <li key={index}>{value}</li>
          )
        })}
      </ul>

      <p />

      <h3>Lista com Checkbox</h3>
      <input 
        onKeyDown={handleInputKeyDownComCheckbox}
      />
      <p>Itens Marcados: 
        { listaComCheckbox.filter((listItemComCheckbox) => 
            listItemComCheckbox.isSelected
          ).length 
        }
      </p>
      <ul>
      { listaComCheckbox.map((listaComCheckboxItem, index) => {
        return <li key={index}>
            <input 
              type="checkbox" 
              checked={listaComCheckboxItem.isSelected}
              onChange={() => {
                setListaComCheckbox(oldListaComCheckbox => {
                  return oldListaComCheckbox.map(oldListaComCheckboxItem => {
                    const newIsSelected = oldListaComCheckboxItem.title === listaComCheckboxItem.title
                    ? !oldListaComCheckboxItem.isSelected
                    : oldListaComCheckboxItem.isSelected;
                    
                    return {
                      ...oldListaComCheckboxItem,
                      isSelected: newIsSelected,
                    };
                });
              });
              }}
            />
            {listaComCheckboxItem.title}
          </li>
        })}
      </ul>

      <p />

      <h3>Lista com Banco de Dados Mock</h3>
      <input 
        onKeyDown={handleInputKeyDownDb}
      />
      <p>Itens Marcados: 
        { listaDb.filter((listaDbItem) => 
            listaDbItem.isCompleted
          ).length 
        }
      </p>
      <ul>
      { listaDb.map((listaDbItem, index) => {
        return <li key={index}>
            <input 
              type="checkbox" 
              checked={listaDbItem.isCompleted}
              onChange={() => {
                setListaDb(oldListaDb => {
                  return oldListaDb.map(oldListaDbItem => {
                    const newIsCompleted = oldListaDbItem.title === listaDbItem.title
                    ? !oldListaDbItem.isCompleted
                    : oldListaDbItem.isCompleted;
                    
                    return {
                      ...oldListaDbItem,
                      isCompleted: newIsCompleted,
                    };
                });
              });
              }}
            />
            {listaDbItem.title}
          </li>
        })}
      </ul>      
    </div>
  )
}