export default {
  API_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://2c98186cfbb6.ngrok.io'
      : 'https://2c98186cfbb6.ngrok.io',
};
