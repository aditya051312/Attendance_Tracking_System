import axios from 'axios';

// Function to send a POST request to the /api/login endpoint
export async function login(email, password) {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}
