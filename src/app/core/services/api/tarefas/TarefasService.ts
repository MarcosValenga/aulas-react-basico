import { Api } from "../ApiConfig";
import { ApiException } from "../ErrorException";


export interface ITarefa {
    id: number;
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException>  => {
    try {
        const { data } = await Api().get('/tarefas');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar os registro.');
    }
};

const getById = async (id: number): Promise<ITarefa | ApiException>  => {
    try {
        const { data } = await Api().get(`/tarefas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar o registro.');
    }
};

const create = async (dataToCreate: Omit<ITarefa, 'id'>): Promise<ITarefa | ApiException>  => {
    try {
        const { data } = await Api().post('/tarefas', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dataToCreate: ITarefa): Promise<ITarefa | ApiException>  => {
    try {
        const { data } = await Api().put(`/tarefas/${id}`, dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException>  => {
    try {
        const { data } = await Api().delete(`/tarefas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao deletar o registro.');
    }
};

export const TarefasService = { 
    getAll,
    create,
    getById,
    updateById,
    deleteById
};