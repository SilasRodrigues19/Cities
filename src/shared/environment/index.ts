//import process from 'process';

const development: boolean = process.env.NODE_ENV !== 'production';

export const Environment = {
  /**
   * Default rows limit
   */
  ROWS_LIMIT: 5,
  /**
   * Inputs Placeholder .
   */
  SEARCH_INPUT: 'João...',
  /**
   * Text displayed if there are no records in the listing.
   */
  EMPTY_LISTING: 'No data found.',
  /**
   * Url base de consulta dos dados da aplicação
   */
  BASE_URL: development
    ? 'http://localhost:3333'
    : 'https://citiesnewapi.herokuapp.com',
};


