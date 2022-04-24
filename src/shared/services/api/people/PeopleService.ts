import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IDetailPeople {
  id: number;
  cityId: number;
  email: string;
  fullName: string;
}

export interface IListingPeople {
  id: number;
  email: string;
  cityId: number;
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
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.ROWS_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROWS_LIMIT),
      };
    }
    return new Error('Data listing failed');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Data listing failed'
    );
  }
};

const getById = async (id: number): Promise<IDetailPeople | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if (data) {
      return data;
    }
    return new Error('Data query failed');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Data query failed'
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
    return new Error('Record creation failed');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Record creation failed'
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
      (error as { message: string }).message || 'Registry update failed'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Failed to delete record'
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
