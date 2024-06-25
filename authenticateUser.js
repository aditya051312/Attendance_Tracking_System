import axios from 'axios';

const authenticateUser = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export default authenticateUser;
