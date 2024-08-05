import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../core/hooks";
import { ITarefa, TarefasService } from "../../core/services/api/tarefas/TarefasService";
import { ApiException } from "../../core/services/api/ErrorException";



export const Dashboard = () => {
    const counterRef = useRef({ counter: 0 });
    const { nomeDoUsuario, logout } = useUsuarioLogado();
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefasService.getAll()
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista(result);

            }
        });
    }, [])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            setLista((oldLista) => {
                if (oldLista.some((listItem) => listItem.title === value)) return oldLista;

                return [...oldLista, {
                    id: oldLista.length,
                    title: value,
                    isCompleted: false,
                }];
            });
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{nomeDoUsuario}</p>
            <p>Contador: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <button onClick={logout}>Logout</button>
            <p><Link to="/login">link</Link></p>
            <hr />
            <input type="text" onKeyDown={handleInputKeyDown} />
            <br />

            <p>Lista</p>
            <p>{lista.filter((ListItem) => ListItem.isCompleted).length}</p>
            <br />
            <ul>
                {lista.map((ListItem) => {
                    return (
                        <li key={ListItem.id}>
                            <input
                                type="checkbox"
                                checked={ListItem.isCompleted}
                                onChange={
                                    () => setLista(oldLista => {
                                        return oldLista.map(oldListItem => {
                                            const newIsCompleted = oldListItem.title === ListItem.title ? !oldListItem.isCompleted : oldListItem.isCompleted
                                            return { ...oldListItem, isCompleted: newIsCompleted }
                                        })
                                    })
                                }
                            />
                            {ListItem.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}