import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser } from 'src/app/db';


// Exportar una función de autenticación
export async function customSignIn(email: string, password: string) {
  const result = await authenticateUser(email, password);
  if ('token' in result) {
    console.log('Usuario autenticado:', result);
    return { email, token: result.token };
  } else {
    throw console.log(result.message);
  }
}