import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form } from 'src/app/fromLogin';
import { customSignIn } from 'src/app/auth';
import { SubmitButton } from 'src/app/submit-button';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Iniciar Sesion</h3>
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';
            const result = await customSignIn(formData.get('email') as string, formData.get('password') as string);
            if ('token' in result) {
              console.log('Usuario autenticado:', result);
              // Redirigir al usuario a la página de inicio
              useRouter().push('/components/Users');
            } else {
              console.log(result);
            }
          
          }}
        >
          <SubmitButton>ingresar</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}