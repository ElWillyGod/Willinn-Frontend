import React, {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "src/app/forms/contextAuth";
import {User} from "src/user";
import axios from "axios";

interface UserContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    fetchUserList: () => void;
}

const UserContext = createContext<UserContextType>({
    users: [],
    setUsers: () => {},
    fetchUserList: () => {},
});

export const useUser = () => useContext(UserContext);

const _backUrl = process.env.URL;

export const UserProvider = ({ children}: { children: React.ReactNode }) => {
    const { authEmail, authToken } = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    const fetchUserList = async () => {
        if (!authEmail) return;

        try {
            const response = await axios.get(`${_backUrl}/usersLista`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                }
            });

            const mappedUsers = response.data.map((user: User) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                isActive: user.isActive
            }));
            //console.log(mappedUsers);
            const filteredUsers = mappedUsers.filter((user: User) => user.isActive);
            setUsers(filteredUsers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (authEmail && authToken) {
            fetchUserList()
        }
    }, [authEmail, authToken]);

    return (
        <UserContext.Provider value={{ users, setUsers, fetchUserList}}>
            {children}
        </UserContext.Provider>
    );
};