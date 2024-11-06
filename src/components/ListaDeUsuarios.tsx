import React, { useState } from "react";
import { Ellipsis, Pencil, Search, Trash2 } from "lucide-react";
import  ScrollArea from "@/components/Scroll";
import { User } from "src/user";
import {useUser} from "src/app/forms/context";
import {useAuth} from "src/app/forms/contextAuth";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function ListaUsurios() {
    const _backUrl = process.env.URL;
    const { authToken } = useAuth()
    const { users, setUsers } = useUser();
    const [showUserOptions, setShowUserOptions] = useState(Array(users.length).fill(false));
    const [searchUser, setSearchUser] = useState('');

    const handleIconClick = (index: number) => {
       const newShow = Array(users.length).fill(false);
       newShow[index] = !showUserOptions[index];
       setShowUserOptions(newShow);
    };

    const filteredUsers = searchUser
        ? users.filter(user =>
            user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(searchUser.toLowerCase())
        )
        : users;

    const handleDeleteUser = async (userId: number) => {
      try {
          const response = await axios.delete(`${_backUrl}/users/${userId}`, {
              headers: {
                  'Authorization': `Bearer ${authToken}`,
                  "Content-Type": "application/json",
              }
          });
          if (response.status === 200) {
              const updateList = users.filter(user => user.id !== userId);
              setUsers(updateList);
          }
      } catch (error) {
          console.log(error);
      }
    };

    const route = useRouter();


    return (
        <div className="w-full bg-white rounded-lg shadow p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mr-4">Usuarios</h2>
                <div className="relative flex-grow max-w-60">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400"></Search>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-300"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex pb-4 font-bold">
                    <p className="w-2/6">Nombre</p>
                    <p className="w-3/6">Correo</p>
                    <p className="w-1/6 text-right pr-4"></p>
                </div>
                <ScrollArea className="w-full text-left flex-1 overflow-y-auto max-h-96">
                    <div className="flex flex-col">
                        {filteredUsers.map((user:User, index) => (
                            <div key={index}
                                 className="bg-white py-4 w-full truncate border-t text-gray-500 flex items-center">
                                <div className="w-2/6 pr-12 truncate">
                                    <span>{user.name.trim()}</span>
                                </div>
                                <div className="w-3/6 pr-4 truncate">
                                    <span>{user.email}</span>
                                </div>
                                <div className="w-1/6 text-right">
                                    <div
                                        className="inline-block text-gray-800 rounded-full bg-gray-100 cursor-pointer -ml-5"
                                        onClick={() => handleIconClick(index)}
                                    >
                                        {showUserOptions[index] ? (
                                            <div className="flex items-center space-x-4 px-2">
                                                <Trash2 className="inline-block text-pink-600"
                                                onClick={() => handleDeleteUser(user.id)} />
                                                <Pencil className="inline-block" onClick={() => route.push(`/forms/${user.id}`)}/>
                                            </div>
                                        ) : (
                                            <Ellipsis/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}