import axios from 'axios';

interface AuthResponse {
  token: string;
  email: string;
  // Otros campos que pueda devolver el endpoint
}

interface AuthError {
  message: string;
  // Otros campos de error que pueda devolver el endpoint
}

export async function authenticateUser(email: string, password: string): Promise<AuthResponse | AuthError> {
  try {
    const response = await axios.post<AuthResponse>('http://localhost:5000/UserControllers/users/login', {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      return { message: error.response.data.message || 'Error en la respuesta del servidor' };
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
      return { message: 'No se recibió respuesta del servidor' };
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
      return { message: error.message };
    }
  }
}