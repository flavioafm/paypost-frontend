import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";
const authContext = createContext();

function useAuth() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [authed, setAuthed] = useState(!!user);

    return {
        authed,
        async login(email, password) {
            try {
                const response = await AuthService.login(email, password)
                setAuthed(true);
                return response
            } catch (error) {
                return error
            }
            
        },
        async logout() {
            AuthService.logout()
            setAuthed(false);
        },
        async register(name, email, password) {
            try {
                const response = AuthService.register(name, email, password);
                setAuthed(true);
                return response;
            } catch (error) {
                return error
            }
        },
        getCurrentUser(){
            return AuthService.getCurrentUser();
        },
    };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
