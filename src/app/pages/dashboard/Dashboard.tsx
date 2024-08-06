import { Link } from "react-router-dom";
import { ITarefa, TarefasService } from "../../core/services/api/tarefas/TarefasService";
import { ApiException } from "../../core/services/api/ErrorException";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUsuarioLogado } from "../../core/hooks";


/* -------------------------------------------------------------------------- */
/*                              MÓDULO DASHBOARD                              */
/* -------------------------------------------------------------------------- */
export const Dashboard = () => {

    /* -------------------------------------------------------------------------- */
    /*                                 CONTROLLER                                 */
    /* -------------------------------------------------------------------------- */

    // UseRef basicamente se mantém durante todo o ciclo de vida do sistema,
    // quando recarregada pagina o valor volta para o seu valor inicial
    const counterRef = useRef({ counter: 0 });
    // Recebe as propriedades mandada pelo hook (bind) de useUsuarioLogado()
    const { nomeDoUsuario, logout } = useUsuarioLogado();
    // Propriedades de estado da lista de tarefas
    const [lista, setLista] = useState<ITarefa[]>([]);



    // useEffect só é ativado no primeiro render,
    // ou caso o [deps] sofrer alguma alteração em seu estado
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

    /**
     * Arrow function que cria nova tarefa,
     * Faz a captura do evento chave 'Enter'
     */
    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';
            if (lista.some((listItem) => listItem.title === value)) return;


            TarefasService.create({
                title: value,
                isCompleted: false,
            }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => [...oldLista, result]);
                }
            });
        }
    }, [lista]);


    /**
     * Deleta um item da lista de tarefas
     */
    const handleDelete = useCallback((id: number) => {
        TarefasService.deleteById(id).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista(oldList => { return oldList.filter((oldListItem) => oldListItem.id !== id) })
            }
        })
    }, []);

    /**
     * Marca se a tarefa esta completa
     */
    const handleToggleComplete = useCallback((id: number) => {
        const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);
        if (!tarefaToUpdate) return;

        TarefasService.updateById(id, {
            ...tarefaToUpdate,
            isCompleted: !tarefaToUpdate.isCompleted
        }).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista(oldLista => {
                    return oldLista.map(oldListaItem => {
                        if (oldListaItem.id === id) return result;
                        return oldListaItem
                    })
                });
            }
        });
    }, [lista]);


    /* -------------------------------------------------------------------------- */
    /*                                    VIEW                                    */
    /* -------------------------------------------------------------------------- */
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
                    console.log(ListItem.id);
                    return (
                        <li key={ListItem.id}>
                            <form action="">
                                <input
                                    type="checkbox"
                                    checked={ListItem.isCompleted}
                                    onChange={
                                        () => handleToggleComplete(ListItem.id)
                                    }
                                />
                                {ListItem.title}
                                <button type="button" onClick={() => handleDelete(ListItem.id)}>Deleta</button>
                            </form>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}