//import { useNavigate } from "react-router-dom";

import { useState } from "react";

export const Login = () => {
    // const history = useNavigate();

    // const handleClick = () => {
    //     history('/')
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEntrar = () => {
        console.log(email);
    }

    return (
        <div>
            <form action="">

                <label htmlFor="email">
                    <span>Email</span>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label htmlFor="password">
                    <span>Senha</span>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>

                <button type="button" onClick={handleEntrar}>
                    Entrar
                </button>
            </form>
        </div>
    );
}