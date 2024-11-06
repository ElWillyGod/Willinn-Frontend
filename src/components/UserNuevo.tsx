import React, {useState} from "react";
import  Input from "@/components/salida";
import Button  from "@/components/submit-button";
import axios from "axios";
import {useAuth} from "src/app/forms/contextAuth";
import {useUser} from "src/app/forms/context";


const _backUrl = process.env.URL;

export default function AddUserForm() {
    const { authToken } = useAuth();
    const { fetchUserList } = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(true);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${_backUrl}/users`,
                {
                    name: name,
                    email: email,
                    password: password,
                    isActive: active
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                setName('');
                setEmail('');
                setPassword('');
                setActive(true);
                fetchUserList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" bg-white rounded-lg shadow p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-6">Agregar usuario</h2>
            <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-6">
                    <div>
                        <Input
                            id="name"
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Introduce el nombre"/>
                    </div>
                    <div>
                         <Input
                             id="register-email"
                             label="Email"
                             type="email"
                             value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             placeholder="Introduce tu email"/>
                        <Input
                            id="register-password"
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Introduce tu contraseña"/>
                    </div>
                </div>
                <div className="mb-4 flex">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)} className="sr-only peer"/>
                        <span className="me-3 text-sm font-extrabold text-gray-700">Activar</span>
                        <div className={`relative w-11 h-6 rounded-full peer transition-colors duration-200 ${active ? 'bg-green-400' : 'bg-gray-200'}`}>
                            <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ${active ? 'translate-x-full' : ''}`}
                            ></div>
                        </div>
                    </label>
                </div>
                <div className="">
                    <Button>Guardar</Button>
                </div>
            </form>
        </div>
    );
}