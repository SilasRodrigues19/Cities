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

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const PeopleService = {
  getAll,
  getById,
  updateById,
  deleteById,
};
