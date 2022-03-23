import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IDetailPeople {
  id: number;
  cityId: number;
  email: string;
  fullName: string;
}

interface IListingPeople {
  id: number;
  cityId: number;
  email: string;
  fullName: string;
}

type TPeopleTotalCount = {
  data: IListingPeople[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TPeopleTotalCount | Error> => {
  try {
    const relativeUrl = `/people?_page={$page}&limit=${Environment.ROWS_LIMIT}&fullName_like${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROWS_LIMIT),
      };
    }
    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros'
    );
  }
};

const getById = async (id: number): Promise<IDetailPeople | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar os registros');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar os registros'
    );
  }
};

const create = async (
  dados: Omit<IDetailPeople, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPeople>('/people', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registros');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro'
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetailPeople
): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao deletar o registro'
    );
  }
};

export const PeopleService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
