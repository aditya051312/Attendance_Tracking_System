import axios from 'axios';

export async function login(email, password) {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
