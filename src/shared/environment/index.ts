import process from 'process';

const development: boolean = process.env.NODE_ENV !== 'production';

export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  ROWS_LIMIT: 10,
  /**
   * Placeholder dos inputs.
   */
  SEARCH_INPUT: 'João da Silva...',
  /**
   * Texto exibido caso não exista registros na listagem.
   */
  EMPTY_LISTING: 'No data found.',
  /**
   * Url base de consulta dos dados da aplicação
   */
  BASE_URL: development
    ? 'http://localhost:3333'
    : 'https://test-seven-flax.vercel.app/database.json',
};
