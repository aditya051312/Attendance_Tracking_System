import axios from 'axios';

export async function loginUser(email, password) {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}