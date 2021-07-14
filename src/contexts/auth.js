import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

const initialState = { signed: null, user: { name: '', room: '' }, signIn: null, signOut: null }

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);    
    const history = useHistory()

    useEffect(() => {
        async function loadStorageData() {
            const localUser = localStorage.getItem('@user')
            if (localUser) {
                setUser(JSON.parse(localUser))
                history.push('/')
            }
        }
        loadStorageData();
    }, [history]);

    async function signIn({ name, room }) {
        setUser({ name, room })
        localStorage.setItem('@user', JSON.stringify({ name, room }))
        history.push('/')
    }

    function signOut() {
        setUser(null)       
        localStorage.removeItem('@user')
    }

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user: user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}