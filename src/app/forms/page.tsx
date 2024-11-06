'use client'

import { AuthProvider } from "src/app/forms/contextAuth";
import UserList from "@/components/ListaDeUsuarios";
import AddUserForm from "@/components/UserNuevo";
import {UserProvider} from "@/app/forms/context";

export default function DashboardPage() {
    return (
        <AuthProvider>
            <UserProvider>
                <div className="bg-gray-100 min-h-screen w-full">
                    <div className="w-full max-w-[1400px] mx-auto">
                        <h1 className="text-3xl font-semibold mb-8">Usuarios</h1>
                        <div className="flex gap-6 w-full">
                            <div className="w-3/5 flex flex-col">
                                <UserList/>
                            </div>
                            <div className="w-2/5 flex flex-col">
                            <AddUserForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </UserProvider>
        </AuthProvider>
    );
}