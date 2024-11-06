'use client'

import { AuthProvider } from "src/app/forms/contextAuth";
import ListaUsurios from "@/components/ListaDeUsuarios";
import {UserProvider} from "@/app/forms/context";
import UpdateUserForm from "@/components/ActuUser";
import {UserList} from "src/user";

export default function DashboardPage({ params }: {params: {user: UserList}}) {
    const { user } = params;
    
    return (
        <AuthProvider>
            <UserProvider>
                <h1 className="text-3xl font-semibold mb-8">Usuarios</h1>
                    <div className="flex gap-6 w-full">
                        <div className="w-3/5 flex flex-col">
                            <ListaUsurios/>
                        </div>
                        <div className="w-2/5 flex flex-col">
                            <UpdateUserForm userId={user}/>
                        </div>
                    </div>
            </UserProvider>
        </AuthProvider>
    );
}