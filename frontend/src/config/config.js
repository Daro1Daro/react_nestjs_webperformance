const prod = {
  API_URL: '/api',
};
const dev = {
  API_URL: 'http://localhost:3000/api',
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
