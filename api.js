import axios from 'axios';

export async function login(email, password) {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response;
  } catch (error) {
    return error.response;
  }
}