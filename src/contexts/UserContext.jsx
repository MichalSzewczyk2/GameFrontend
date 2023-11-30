import {createContext, useContext, useState} from "react";


const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (id, role) => {
        setUser({id, role});
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}