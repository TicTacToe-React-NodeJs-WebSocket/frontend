export default {
  API_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://backend-db-tic-tac-toe.herokuapp.com'
      : 'http://localhost:8080',
};
