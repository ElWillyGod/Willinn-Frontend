import React, {useEffect, useState} from "react";

import  Input  from "@components/salida";
import Boton from "@/components/submit-button";
import axios from "axios";
import {useAuth} from "src/app/forms/contextAuth";
import { User } from "src/user";
import {X} from "lucide-react";

import { useRouter } from 'next/navigation';
import {UserList} from "src/user";

const _backUrl = process.env.URL;

export default function UpdateUserForm({ userId } : { userId: UserList }) {
    const { authToken } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId || !authToken) return;

            try {
                const response = await axios.get(
                    `${_backUrl}/users/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                        }
                    }
                );
                if (response.status === 200) {
                    const oldUser = response.data as User;
                    const firstName = oldUser.name
                    setName(firstName || '');
                    setEmail(oldUser.email);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, authToken]);


    const handleUpdater = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${_backUrl}/users/${userId}`,
                {
                    id: userId,
                    name: name ,
                    email: email,
                    password: password,
                    isActive: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 204) {
                router.push("/forms");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative bg-white rounded-lg shadow p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-6">Modificar usuario</h2>
          <X type="button"
               onClick={() => router.push("/forms")}
               className="text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded-full absolute top-2 right-2 cursor-pointer"/>
          <form onSubmit={handleUpdater}>
            <div className="flex flex-col gap-6">
              <div>
              <Input
              id="name"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nuevo nombre"
              className="text-gray-700 font-extrabold"
            />
          </div>
          <div>
            <Input
              id="register-email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nuevo email"
              className="text-gray-700 font-extrabold"
            />
            <Input
              id="register-password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="text-gray-700 font-extrabold"
            />
              </div>
            </div>
            <div className="">
              <Boton>Guardar</Boton>
            </div>
          </form>
        </div>
      );
    }