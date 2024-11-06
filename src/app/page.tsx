'use client'

import {Eye, EyeOff, X} from 'lucide-react';
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Input from '@/components/salida';
import Button from '@/components/submit-button';


const _backUrl = process.env.URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${_backUrl}/users/login`, {
        email,
        password,
      });
      if (response.data.token) {
        // Guardar el token en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem('authEmail', email);
        localStorage.setItem('authToken', response.data.token);
        // Redirigir al usuario a la página deseada después de una autenticación exitosa
        // console.log('Autenticación exitosa:', localStorage.getItem('authEmail'));
        // console.log('Email:', localStorage.getItem('authToken'));
        router.push('/forms');
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-gray-800 font-semibold text-center mb-6">Inicia sesión</h2>
          <form onSubmit={handleSubmit}>
            <Input
                id="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={(i) => setEmail(i.target.value)}
                placeholder="Introduce tu email" />

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                     onClick={toggleShowPassword}>
                  {showPassword ? <EyeOff className="text-gray-400"/> : <Eye className="text-gray-400"/>}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Button>Ingresar</Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}