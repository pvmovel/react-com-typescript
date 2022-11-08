import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
  // useRef pega a referência de um objeto
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  /* useCallback
  é um gancho de reação que retorna um retorno de chamada memoized 
  quando passado uma função e uma lista de dependências como parâmetros. 
  É muito útil quando um componente está passando um retorno de chamada 
  para seu componente filho para evitar a renderização do componente filho. 
  Ele apenas altera o retorno de chamada quando uma de suas dependências é alterada.
  */
  // !!! O useCallback não é executado no render !!!
  const handleClick = useCallback(() => {
    navigateTo('/pagina-inicial')
  }, [navigateTo])

  const handleEntrar = useCallback(() => {
    if (email === 'jose@demaria.com' && password === 'Jesus') {
      console.log('Acesso Autorizado');
    } else {
      console.log('Usuário Desconhecido');
    }
    if (inputPasswordRef.current !== null) {
      inputPasswordRef.current.focus();
    }
  }, [email, password])

  /* useMemo
  é semelhante ao gancho useCallback, pois aceita uma função e uma lista de dependências, 
  mas retorna o valor memorizado retornado pela função passada. 
  Ele recalculou o valor apenas quando uma de suas dependências mudou. 
  É útil evitar cálculos caros em cada renderização quando o valor retornado não vai mudar.
  */
  // useMemo() so atualiza quando a propriedade for atualizada
  const emailLength = useMemo(() => {
    return email.length * 1000;
  }, [email.length]);

  /* useEffect
  Um gancho que nos ajuda a realizar mutações, assinaturas, temporizadores, 
  registro e outros efeitos colaterais depois que todos os componentes foram renderizados. 
  O useEffect aceita uma função de natureza imperativa e uma lista de dependências. 
  Quando suas dependências mudam, ele executa a função passada.
  */
  // Se usar desta forma, fora do useEffect fica repetindo direto a mensagem.
  /* 
    if (window.confirm("Você é homem?")) {
      console.log("Homem");
    } else {
      console.log("Mulher");
    }
  */

  useEffect(() => {
    if (window.confirm("Você é homem?")) {
      console.log("Homem");
    } else {
      console.log("Mulher");
    }
  }, []);

  useEffect(() => {
    console.log("E-Mail:", email)
  }, [email]);

  useEffect(() => {
    console.log("Senha:", password)
  }, [password]);


  return (
    <div>
      <h1>Login</h1>
      <p>Quantidade de caracteres no e-mail: {emailLength}</p>
      <form>
        
        <InputLogin 
          label="E-Mail: "
          value={email}
          onChange={(newValue) => setEmail(newValue)}
          onPressEnter={() => inputPasswordRef.current?.focus()}
        />

        <p />

        <InputLogin 
          label="Senha: "
          type="password"
          value={password}
          ref={inputPasswordRef}
          onChange={(newValue) => setPassword(newValue)}
        />

        <p />

        <ButtonLogin type="button" onClick={handleEntrar}>Entrar</ButtonLogin>
      </form>
      <p />
      <button onClick={handleClick}>Pagina Inicial</button>
    </div>
  )
}