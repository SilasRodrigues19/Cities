import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IDetailCities {
  id: number;
  name: string;
}

export interface IListingCities {
  id: number;
  name: string;
}

type TCitiesTotalCount = {
  data: IListingCities[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TCitiesTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.ROWS_LIMIT}&name_like=${filter}`;
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

const getById = async (id: number): Promise<IDetailCities | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

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
  dados: Omit<IDetailCities, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailCities>('/cities', dados);

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
  dados: IDetailCities
): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Registry update failed'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Failed to delete record'
    );
  }
};

export const CitiesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
