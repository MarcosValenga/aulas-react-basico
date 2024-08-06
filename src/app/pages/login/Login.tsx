//import { useNavigate } from "react-router-dom";

import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { UsuarioLogadoContext } from "../../core/contexts";

export const Login = () => {
    // const history = useNavigate();

    // const handleClick = () => {
    //     history('/')
    // }
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     if (window.confirm('Você é homem ou mulher?')) {
    //         console.log('Homem');
    //     } else {
    //         console.log('Mulher');
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(email);
    //     console.log(password);
    // }, [email, password]);

    const emailLength = useMemo(() => {
        return email.length * 1000;
    }, [email.length]);

    const handleEntrar = useCallback(() => {
        console.log(email);
        console.log(password);

        if (inputPasswordRef.current !== null) {
            inputPasswordRef.current.focus();
        } else {
            
        }
    }, [email, password]);

    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    return (
        <div>
            <form action="">
                <p>Quantidade de caracteres no email: {emailLength}</p>
                <p>{nomeDoUsuario}</p>
                
                <InputLogin typeInput="email" label={"Email"} value={email} onChange={newValue => setEmail(newValue)} onPressEnter={() => inputPasswordRef.current?.focus()}/>

                <InputLogin typeInput="password" label={"Senha"} value={password} onChange={newValue => setPassword(newValue)} ref={inputPasswordRef}/>

                <ButtonLogin onClick={handleEntrar} type="button">Login</ButtonLogin>
            </form>
        </div>
    );
}